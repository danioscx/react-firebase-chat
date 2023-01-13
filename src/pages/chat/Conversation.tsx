import { IUser } from "hooks"
import React from "react"
import { useSpring, animated } from "@react-spring/web"
import { UserInput } from "./UserInput"

interface ConversationProps {
    user?: IUser
}

const Conversation: React.FC<ConversationProps> = (props) => {
    const { user } = props

    const [header, api] = useSpring(() => ({
        from: {
            transform: 'translateY(-300px)',
        },
        to: {
            transform: 'translateY(0%)',
        },
        duration: 500,
        reset: user ? true : false
    }), [user?.uid])

    return (
        <div
            className={'flex flex-col gap-2 min-h-screen'}>
            <animated.header
                style={header}
                className={'flex flex-col gap-4 p-3'}>
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
            </animated.header>
            {/* Chat List */}
            <div
                className={'flex flex-1 flex-col gap-2 overflow-auto'}>
            </div>
            {/* Chat input */}
            <div>
                <UserInput
                    key={user?.uid}/>
            </div>
        </div>
    )
}

export { Conversation }