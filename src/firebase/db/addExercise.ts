import { collection, addDoc } from 'firebase/firestore'
import { db } from "../config"

export interface IExercise {
  uid: string,
  name:  string,
  repetitions: number,
  weight: number
}

export const AddExercise = async (exercise: IExercise) => {
  console.log('exercicio a ser adicionado: ', exercise)
  const exerciseRef = collection(db, "Exercicios")
  return await addDoc(exerciseRef, exercise)  
}
