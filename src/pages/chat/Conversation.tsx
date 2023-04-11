import { IUser, useAuth } from "hooks"
import React from "react"
import { UserInput } from "./UserInput"
import styles from './styles/chat.module.css'
import { Message } from "utils"
import { useMessages } from "hooks"

interface ConversationProps {
    user?: IUser
}

const Conversation: React.FC<ConversationProps> = (props) => {
    const { user } = props
    const [text, setText] = React.useState<string>('')

    const { userInfo } = useAuth()

    const { sendMessage, messages } = useMessages({
        currentUser: userInfo!!,
        targetUser: user
    })

    const handleSubmitMessage = (message: Message) => {
        if (user) {
            sendMessage(user, message)
            setText('')
        }
    }

    console.log(messages)

    return (
        <div
            className={'flex flex-col gap-2 min-h-screen'}>
            <header
                className={`flex flex-col gap-4 p-3 ${styles.header}`}>
                <div
                    className={'flex flex-row bg-gray-100 gap-2 py-2 px-3 justify-between rounded-lg'}>
                    <div
                        className={'flex gap-2'}>
                        {/* Avatar */}
                        <div
                            className={'w-10 h-10 rounded-full bg-gray-300'}>
                            {
                                user?.avatar ? (
                                    <img
                                        referrerPolicy={'no-referrer'}
                                        src={user?.avatar}
                                        alt={user?.displayName}
                                        className={'w-full h-full rounded-full'} />
                                ) : (
                                    <div
                                        className={'w-full h-full rounded-full flex justify-center items-center'}>
                                        <span
                                            className={'text-2xl font-bold text-black'}>
                                            {user?.displayName?.charAt(0)}
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <div
                            className={'flex flex-col justify-between'}>
                            {/* Name */}
                            <h4
                                className={'text-base font-semibold text-ellipsis line-clamp-1'}>
                                {
                                    user?.displayName
                                }
                            </h4>
                            {/* Status */}
                            <span
                                className={'text-xs text-gray-500'}>
                                {
                                    user?.status
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            {/* Chat List */}
            <div
                className={'flex flex-1 flex-col gap-2 overflow-auto'}>
            </div>
            {/* Chat input */}
            <div>
                <UserInput
                    value={text}
                    onChange={(value) => {
                        setText(value)
                    }}
                    onSubmit={handleSubmitMessage}
                    key={user?.uid} />
            </div>
        </div>
    )
}

export { Conversation }
