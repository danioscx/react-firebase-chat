import { useAuth, useChats } from "hooks"
import React from "react"


const Chat: React.FC = () => {

    const { userInfo } = useAuth()
    const { chats, loading } = useChats({
        uid: userInfo?.uid
    })

    const targetScroll = React.useRef<HTMLDivElement>(null)
    const [isBottom, setIsBottom] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (targetScroll.current) {
            targetScroll.current.scrollTop = targetScroll.current.scrollHeight
            targetScroll.current.scrollIntoView({ behavior: 'smooth' })
            targetScroll.current.addEventListener('scroll', () => {
                console.log('scroll')
                if (targetScroll.current) {
                    if (targetScroll.current.scrollTop === 0) {
                        setIsBottom(true)
                    } else {
                        setIsBottom(false)
                    }
                }
            })
        }
    }, [])

    return (
        <main
            className={'w-full 2xl:w-9/12 2xl:mx-auto'}>
            <div
                className={'grid grid-cols-3'}>
                <section
                    className={'col-span-1'}>
                    <div
                        className={'flex flex-col'}>
                        <div
                            className={'flex'}>
                            Hallo
                        </div>
                        <div
                            className={'flex-1 overflow-y-auto min-h-screen'}>

                        </div>

                    </div>
                </section>
                <section
                    className={'col-span-2'}>

                </section>
            </div>
        </main>
    )
}

export { Chat }
