import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from "../config"

import { User } from "firebase/auth"

// type User = {
//   displayName?:  string,
//   photoURL: string,
//   uid: string
// }

export const singUp: (user: User) => Promise<User | void> = async (user) => {
  const userRef = doc(db, "Usuario", user.uid)
  return await getDoc(userRef)
    .then(usuario => {
      if(!usuario.exists()) {
        console.log('usuario não existe, deve criar: ', user)
        const {
          displayName,
          photoURL,
          uid
        } = user

        setDoc(doc(db, "Usuario", user.uid), {
          displayName,
          photoURL,
          uid
        })
          .then(() => {
            return user as User
          })
          .catch(err => console.error('error ao criar usuario: ', err))
      }
      return usuario.data() as User
    })
    .catch(err => { throw err })
}