import React, { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

import { AddExercise, IExercise } from "../../firebase/db/addExercise"

import { Card } from '../card'

interface IModal {
  isOpen: boolean,
  handleClose: () => void,
  userId: string
}

export const NewTreinoModal: FC<IModal> = ({ isOpen, handleClose, userId }) => {

  const [viewType, setViewType] = useState('default')


  const handleSave = async (exericio: IExercise) => {
    //TODO --- Call api to save data
    const newExercicio = {
      ...exericio,
      uid: userId
    }
    await AddExercise(newExercicio)
      .then((exercicio) => {
        console.log("exercicio: ", exercicio)
        handleClose()
      })
      .catch(err => console.log("falha ao criar exercicio: ", err))
  }

  return (
    <Modal 
      isVisible={isOpen}
      onSwipeComplete={() => handleClose()}
      swipeDirection="down"
      onBackdropPress={() => handleClose()}
      useNativeDriver={false}
    >
      <View style={ModalStyles.modal} >
        <View style={ModalStyles.swipeIndicator} />
        <Card
          type="edit"
          defaultRepetitions={0}
          defaultWeight={0}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </View>
    </Modal>
  )
}

const ModalStyles = StyleSheet.create({
  modal: { 
    backgroundColor: "rgba(0, 0, 0, 1)", 
    height: "40%",
    marginTop: 'auto',
    alignItems: "center",
    borderRadius: 30,
    padding: 15
  },
  swipeIndicator: { 
    borderRadius: 100, 
    backgroundColor: "#fff", 
    width: 100, 
    height: 3
  }
})