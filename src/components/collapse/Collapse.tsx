import { animated, useTrail, useTransition } from '@react-spring/web'
import React, { useEffect } from 'react'

interface CollapseProps {
    collapsed?: boolean
    label?: string
    onCollapse?: (collapsed: boolean) => void
    children?: React.ReactNode
    animation?: {
        direction?: 'up' | 'down' | 'left' | 'right'
    }
}


const Collapse: React.FC<CollapseProps> = (props) => {

    const {
        collapsed = false,
        children,
        label,
        onCollapse,
    } = props

    const [childrens, setChildrens] = React.useState(React.Children.toArray(children))

    const [collapse, setCollapse] = React.useState(collapsed)

    const trails = useTrail(childrens.length,{
        from: {
            opacity: 0,
            height: 0,
            y: 0
        },
        to: {
            opacity: !collapse ? 1 : 0,
            y: !collapse ? 0 : -200,
            height: !collapse ? 120 : 0,
        },
        duration: 1000,
        config: {
            mass: 1,
            tension: 200,
            friction: 20,
        },
        delay: 200,
    })

    const handleOnClick = () => {
        onCollapse && onCollapse(!collapsed)
        setCollapse(!collapse)
    }

    useEffect(() => {
        if (children) {
            setChildrens(React.Children.toArray(children))
        }
    }, [children])

    return (
        <div
            className={'flex flex-col gap-2'}>
            <div
                onClick={handleOnClick}
                className={'flex flex-row w-full justify-between items-center cursor-pointer relative z-10'}>
                <h2
                    className={'text-2xl font-bold text-black'}>
                    {label}
                </h2>
                <div>
                    {
                        collapse ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>

                        )
                    }
                </div>
            </div>
            {
                trails.map((style, index) => {
                    return (
                        <animated.div
                            key={index}
                            style={style}>
                            {childrens[index]}
                        </animated.div>
                    )
                })
            }
        </div>
    )
}

export { Collapse }