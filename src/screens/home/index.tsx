import React, { useEffect, useState, useContext } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native'

import { WireFrame } from "../../components/wireframe"
import { NavBar } from "../../components/navBar"
import { Card } from "../../components/card"
import { NewTreinoModal } from "../../components/newTreinoModal"
import { NewButton } from '../../components/newButton'
import { GetExercises, IExercise } from "../../firebase/db/getExercises"

import { userContext } from "../../context/UserContext"

export const Home = () =>  {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [exericios, setExericios] = useState<IExercise[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useContext(userContext)

  const inputHandler = (text: string) => {
    setSearch(text)
    return
  }

  const data = [
    {
      exerciseName: "Cadeira Adutora",
      repetitions: "12",
      weight: "40"
    },
    {
      exerciseName: "Cadeira Abdutora",
      repetitions: "12",
      weight: "40"
    },
    {
      exerciseName: "Puxada alta frente",
      repetitions: "12",
      weight: "40"
    },
    {
      exerciseName: "Remada alta maquina",
      repetitions: "12",
      weight: "40"
    },
    {
      exerciseName: "Teste de bagulho",
      repetitions: "12",
      weight: "40"
    }
  ]

  useEffect(() => {
    if(user) {
      GetExercises(user.uid)
        .then(exercises => {
          if(exercises) {
            setExericios(exercises)
          }
        })
    }
  }, [])

  if(!user) {
    return
  }

  return (
    <WireFrame>
      <NavBar inputHandler={inputHandler} />
      <SafeAreaView style={{ flex: 1, width: "100%", alignItems: "center" }} >
        <FlatList
          data={exericios}
          keyExtractor={(item) => item.name}
          // onRefresh={() => setIsLoading(true)}
          // refreshing={isLoading}
          renderItem={({ item }) => {
            return (
              <View style={{ height: 300 }} >
                <Card handleClose={() => console.log('closing')} type='view' exerciseName={item.name} defaultRepetitions={item.repetitions} defaultWeight={item.weight} />
              </View>
            )
          }}
        />
      </SafeAreaView>
      <NewButton onPress={() => setIsModalOpen(true)} />
      <NewTreinoModal userId={user.uid}  handleClose={() => {
        setIsModalOpen(false)
        console.log('getting exercises')
        GetExercises(user.uid)
        .then(exercises => {
          if(exercises) {
            setExericios(exercises)
          }
        })
        .catch(err => {
          console.log('err: ', err)
        })
      }} isOpen={isModalOpen} />
    </WireFrame>
  );
}
