import React, { Dispatch, FC, useState, SetStateAction } from 'react'
import { View, Text } from 'react-native'

import Display from './display'
import { IExercise } from "../../firebase/db/addExercise"

interface ICard {
  type: "view" | "edit" | "history",
  exerciseName?: string,
  defaultWeight: number,
  defaultRepetitions: number,
  handleClose: () => void,
  handleSave?: (data: IExercise) => Promise<void>,
}

export const Card: FC<ICard> = ({ type, exerciseName, defaultRepetitions, defaultWeight, handleClose, handleSave }) => {
  

  if(type === "history" && exerciseName) {
    return (
      <Display.ChartView 
        exerciseName={exerciseName}  
      />
    )
  }

  if(type === "view") {
    return (
      <Display.ViewCard 
        defaultRepetitions={defaultRepetitions}
        defaultWeight={defaultWeight}
        exerciseName={exerciseName}
        handleClose={handleClose}
      />
    )
  }

  return (
    <Display.NewCard 
      defaultRepetitions={12}
      defaultWeight={0}
      handleClose={handleClose}
      handleSave={handleSave}
    />
  )
}

