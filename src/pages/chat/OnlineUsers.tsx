import { IUser } from "hooks"
import React from "react"


interface IUsersProp {
    users?: IUser[]
    onClick?: (user: IUser) => void
}
const OnlineUsers: React.FC<IUsersProp> = (props) => {
    const {
        users,
        onClick
    } = props
    return (
        <>
            {
                users && users?.map((user, index) => {
                    return (
                        <div
                            onClick={() => { onClick && onClick(user) }}
                            className={'flex flex-row gap-2 items-center py-2 rounded-md hover:bg-gray-200 cursor-pointer'}
                            key={index}>
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
                                className={'flex flex-col gap-2 justify-between'}>
                                <h4
                                    className={'text-base font-semibold'}>
                                    {
                                        user?.displayName
                                    }
                                </h4>
                            </div>

                        </div>
                    )
                })
            }
        </>
    )
}

export { OnlineUsers }