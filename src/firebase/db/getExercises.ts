import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from "../config"

export interface IExercise {
  name:  string,
  repetitions: number,
  weight: number
}

export const GetExercises: (userId: string) => Promise<IExercise[] | void>  = async (userId) => {
  
  const q = query(collection(db, "Exercicios"), orderBy("name", "desc"), where("uid", "==", userId));

  return await getDocs(q)
    .then(data => {
      return data.docs.map(exericio => exericio.data()) as IExercise[]
    })
    .catch((err) => console.log('error: ', err))
}