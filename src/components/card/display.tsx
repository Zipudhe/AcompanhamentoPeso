import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { Button } from "../button"
import { InputNumber } from "../InputNumber"
import { InputText } from "../InputText"

import Icon from "react-native-vector-icons/Feather"
import { CardHistoryStyle, CardStyles } from './styles'
import { LineChart } from 'react-native-chart-kit'

import { IExercise } from "../../firebase/db/addExercise"

interface IChartView {
  exerciseName: string
}

interface ICard {
  exerciseName?: string,
  defaultWeight: number,
  defaultRepetitions: number,
  handleClose: () => void,
  handleSave?: (data: IExercise) => Promise<void>,
}


const icon = require("../../../assets/standing-10.png")


const ChartView: FC<IChartView> = ({ exerciseName }) => {

  const [cardDimesions, setCardDimesions] = useState({ width: 0, height: 0 })

  return (
    <View style={CardStyles.wrapper} >
      <View  style={CardHistoryStyle.charTitle}>
        <Text style={CardStyles.title} > { exerciseName } </Text>
        <TouchableOpacity onPress={() => { console.log('view') }} >
          <Icon name="x-circle" size={30} />
        </TouchableOpacity>
      </View>
      <View 
        style={CardHistoryStyle.viewCart} 
        onLayout={
          (e) => {
            const { height, width } = e.nativeEvent.layout
            setCardDimesions(() => ({ height, width }))
          }
        } 
      >
        <LineChart 
          data={{
            labels: ["25/12", "26/12", "27/12", "28/12", "29/12", "01/01", "03/01"],
            datasets: [
              {
                data: [
                  10,
                  20,
                  25,
                  23,
                  30,
                  35,
                  37,
                ]
              }
            ]
          }}
          width={cardDimesions.width}
          height={cardDimesions.height}
          yAxisSuffix={' Kg'}
          chartConfig={{
            backgroundColor: "#D2122E",
            backgroundGradientFrom: "#D2122E",
            backgroundGradientTo: "#D2122E",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#000"
            }
          }}
        />
      </View>
    </View>
  )
}


export const ViewCard: FC<ICard> = ({ exerciseName, defaultWeight, defaultRepetitions, handleClose, handleSave }) => {

  const [weight, setWeight] = useState(defaultWeight)
  const [repetition, setRepetition] = useState(defaultRepetitions)


  return (
    <View style={CardStyles.wrapper} >
      <View style={CardStyles.info} >
        <View style={CardStyles.imgView} >
          <Image style={CardStyles.image} resizeMode="contain"  source={icon} />
        </View>
        <View style={CardStyles.details} >
          <Text style={CardStyles.title} > { exerciseName } </Text>
          <View style={CardStyles.inputsView} >
            <InputNumber 
              label="Peso" 
              placeholder='Digite o peso'
              placeholderTextColor={"#000"}
              onChangeText={(weight) => {
                setWeight(Number(weight))
              }}
              value={weight.toString()}
              disabled
              />
            <InputNumber 
              label="Repeticoes" 
              placeholder='Digite as repeticoes' 
              onChangeText={(rep) => {
                setRepetition(Number(rep))
              }}
              value={repetition.toString()}
              disabled
              />
          </View>
        </View>
      </View>
      <View style={CardStyles.buttonsView} >
        <Button onPress={() => console.log('Histórico')} style={CardStyles.button} > 
          <Text style={ CardStyles.buttonText } > Histórico </Text>
        </Button>
        <Button onPress={() => console.log('Update')} style={CardStyles.button} > 
          <Text style={ CardStyles.buttonText } > Atualizar </Text>
        </Button>
      </View>
    </View>
  )
}


export const NewCard: FC<ICard> = ({ exerciseName =  "Novo Exercicio", defaultWeight, defaultRepetitions, handleClose, handleSave }) => {


  const [exericise, setExercise] = useState<IExercise>({
    weight: defaultWeight,
    repetitions: defaultRepetitions,
    name: '',
    uid: ''
  })

  return (
    <View style={CardStyles.wrapper} >
      <View style={CardStyles.info} >
        <View style={CardStyles.imgView} >
          <Image style={CardStyles.image} resizeMode="contain"  source={icon} />
        </View>
        <View style={CardStyles.details} >
          <InputText 
            label='Nome do exercicio' 
            value={exericise.name} 
            inputHandler={(input) => setExercise(currentExercise => {
              return {
                ...currentExercise,
                name: input
              }
            })} 
            placeholder={exerciseName} />
          <View style={CardStyles.inputsView} >
            <InputNumber 
              label="Peso" 
              placeholder='Digite o peso' 
              onChangeText={(weight) => {
                setExercise(currentExercise => {
                  return {
                    ...currentExercise,
                    weight: Number(weight)
                  }
                })
              }}
              value={exericise.weight.toString()}
              />
            <InputNumber 
              label="Repeticoes" 
              placeholder='Digite as repeticoes' 
              onChangeText={(rep) => {
                setExercise(currentExercise => {
                  return {
                    ...currentExercise,
                    repetitions: Number(rep)
                  }
                })              }}
              value={exericise.repetitions.toString()}
              />
          </View>
        </View>
      </View>
      <View style={CardStyles.buttonsView} >
        <Button onPress={handleClose} style={CardStyles.button} > 
          <Text style={ CardStyles.buttonText } > Voltar </Text>
        </Button>
        <Button onPress={() => {
          handleSave && handleSave(exericise)
        }} style={CardStyles.button} > 
          <Text style={ CardStyles.buttonText } > Salvar </Text>
        </Button>
      </View>
    </View>    
  )

}

export default { ChartView, ViewCard, NewCard }