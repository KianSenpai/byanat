import { ReactNode } from 'react'

interface IContainer {
    children: ReactNode
    className?: string
}

export default function Container({ children, className }: IContainer) {
    return (
        <div className={'flex w-full items-center justify-center ' + className}>
            <div className="w-full max-w-[1920px]">{children}</div>
        </div>
    )
}
