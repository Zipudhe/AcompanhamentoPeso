import React, { useState, createContext, ReactNode, Dispatch, useEffect } from 'react'
import { User } from 'firebase/auth'

interface IUserContext {
  children: ReactNode
}

type ContextUser = {
  user: User | undefined,
  setUser: Dispatch<User>
}

export const userContext = createContext<ContextUser>({} as ContextUser)

export const CurrentUserProvider = ({ children }: IUserContext) => {


  const [user, setUser] = useState<User>()

  useEffect(() => {
    if(user ==  null) {
      console.log('user is null')
    }
  }, [user])

  return (
    <userContext.Provider
      value={{ user, setUser }}
    >
      { children }
    </userContext.Provider>
  )

}