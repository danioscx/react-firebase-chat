import { GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithPopup, updateProfile } from "firebase/auth"
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "utils"


interface IUser {
    displayName: string
    status: string | "online"
    uid: string
    createdAt: string,
    avatar?: string,
    email?: string
}


const useAuth = () => {

    const [userInfo, setUserInfo] = useState<IUser | null>(null)

    const signIn = async (displayName: string) => {
        return new Promise<IUser>((resolve, reject) => {
            signInAnonymously(auth).then((userCredential) => {
                const userRef = doc(db, "users", userCredential.user.uid)
                updateProfile(userCredential.user, {
                    displayName: displayName,
                }).then(() => {
                    setDoc(userRef, {
                        displayName: displayName,
                        uid: userCredential.user.uid,
                        createdAt: new Date().toISOString(),
                        status: "online",
                        avatar: userCredential.user.photoURL,
                        email: userCredential.user.email
                    }).then(() => {
                        getDoc(userRef).then((doc) => {
                            if (doc.exists()) {
                                setUserInfo(doc.data() as IUser)
                                resolve(doc.data() as IUser)
                            } else {
                                setUserInfo(null)
                            }
                        })
                    })
                })
            }).catch((error) => {
                reject(error)
            })
        })
    }

    const signOut = () => {
        auth.signOut().then(() => {
            setUserInfo(null)
        })
    }

    const signInWithGoogle = (): Promise<boolean> => {
        const provider = new GoogleAuthProvider()
        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider).then((result) => {
                const user = result.user
                const userRef = doc(db, "users", user.uid)
                setDoc(userRef, {
                    displayName: user.displayName,
                    uid: user.uid,
                    createdAt: new Date().toISOString(),
                    status: "online",
                    avatar: user.photoURL,
                    email: user.email
                }).then(() => {
                    getDoc(userRef).then((doc) => {
                        if (doc.exists()) {
                            setUserInfo(doc.data() as IUser)
                            resolve(true)
                        } else {
                            setUserInfo(null)
                            resolve(false)
                        }
                    })
                })
            }).catch((error) => {
                setUserInfo(null)
                reject(error)
            })
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid)
                onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        setUserInfo(doc.data() as IUser)
                    } else {
                        setUserInfo(null)
                    }
                })
            } else {
                setUserInfo(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return {
        userInfo,
        signIn,
        signOut,
        signInWithGoogle,
    }
}

export { useAuth }
export type { IUser }
