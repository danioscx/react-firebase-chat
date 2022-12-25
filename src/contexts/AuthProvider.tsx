import { IUser, useAuth } from "hooks"
import React, { createContext } from "react"


const authContext = createContext({
    userInfo: null as IUser | null,
    signIn: (_username: string): Promise<IUser> => {
        return new Promise((_resolve, reject) => {
            reject("Not implemented!")
        })
    },
    signInWithGoogle: (): Promise<boolean> => { 
        return new Promise((_resolve, reject) => {
            reject("Not implemented!")
        })
    },
    signOut: () => { },
})

const AuthProvider = (props: {
    children?: React.ReactNode
}) => {
    const value = useAuth()
    return (
        <authContext.Provider value={value}>
            {props?.children}
        </authContext.Provider>
    )
}


export { AuthProvider }