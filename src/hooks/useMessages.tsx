import { UserInputType } from "utils"
import { IUser } from "./useAuth"

interface MessageProps {
    currentUser: IUser
}

const useMessages = (props: MessageProps) => {

    const {
        currentUser
    } = props

    /**
     * 
     * @param user IUser this is the user that is receiving the message
     * @param message the message that is being sent
     */
    const sendMessage = (user: IUser, message: string, type: keyof typeof UserInputType = "TEXT") => {
        if (message.trim().length === 0) {
            return
        } else {
            
        }
    }

    return {
        sendMessage
    }
}


export { useMessages }