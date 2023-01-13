
import { Skeleton } from 'components'
import { EmojiOutlined, MapPinOutlined, SendOutlined } from 'icons'
import React from 'react'
import { UserInputType } from 'utils'

const EmojiPicker = React.lazy(() => import('emoji-picker-react'))
const LocationPicker = React.lazy(() => import('./LocationPicker').then(({ LocationPicker }) => ({ default: LocationPicker })))

interface UserInputProps {
    onSubmit?: (message: string) => void,
    onChange?: (message: string) => void,
    value?: string
    placeholder?: string
    extras?: React.ReactNode
    children?: never[]
}


const UserInput: React.FC<UserInputProps> = (props) => {

    const [type, setType] = React.useState(UserInputType.TEXT)
    const [isShow, setIsShow] = React.useState(false)


    const handleOnClick = (currentType: UserInputType) => {
        if (currentType === type) {
            setIsShow(false)
            setType(UserInputType.TEXT)
        } else {
            setIsShow(true)
            setType(currentType)
        }
    }


    return (
        <div
            className={'flex flex-col gap-2 p-3'}>
            <div
                className={'flex flex-col gap-2 p-2 bg-gray-100 rounded-xl'}>
                <div
                    className={'flex flex-row gap-2 bg-white items-center w-full rounded-xl'}>
                    <input
                        autoFocus={true}
                        placeholder={props.placeholder || 'Type a message...'}
                        onChange={(e) => { props.onChange && props.onChange(e.target.value) }}
                        value={props.value}
                        className={'flex-1 py-2 px-3 rounded-lg border-none focus:outline-none focus:border-none'} />
                    <button
                        className={`${type === UserInputType.EMOJI ? 'bg-spanishViolet-500' : ''} p-1 rounded-full`}
                        onClick={() => {
                            handleOnClick(UserInputType.EMOJI)
                        }}>
                        <EmojiOutlined
                            stroke={
                                type === UserInputType.EMOJI ? 'white' : 'currentColor'
                            } />
                    </button>
                    <button
                        className={`${type === UserInputType.LOCATION ? 'bg-spanishViolet-500' : ''} p-1 rounded-full`}
                        onClick={() => {
                            handleOnClick(UserInputType.LOCATION)
                        }}>
                        <MapPinOutlined
                            stroke={
                                type === UserInputType.LOCATION ? 'white' : 'currentColor'
                            } />
                    </button>
                    <button
                        className={'mr-2'}
                        onClick={() => { props.onSubmit && props.onSubmit(props.value || '') }}>
                        <SendOutlined />
                    </button>
                </div>
                {
                    isShow && type === UserInputType.EMOJI ? (
                        <div
                            className={'flex flex-row gap-2 flex-wrap'}>
                            <React.Suspense fallback={<Skeleton avatar={false} />}>
                                <EmojiPicker
                                    lazyLoadEmojis={true}
                                    width={'100%'} />
                            </React.Suspense>
                        </div>
                    ) : isShow && type === UserInputType.LOCATION ? (
                        <React.Suspense fallback={<Skeleton avatar={false} />}>
                            <LocationPicker />
                        </React.Suspense>
                    ) : null
                }
            </div>
        </div>
    )
}

export { UserInput }
