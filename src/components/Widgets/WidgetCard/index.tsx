import { ReactNode } from 'react'
import { HandleIcon } from '../../../assets/icons'

interface IWidgetCard {
    children: ReactNode
    title?: string
    subtitle?: string
}

export default function WidgetCard({ children, title, subtitle }: IWidgetCard) {
    return (
        <div className="h-full w-full rounded-2xl bg-white px-7 py-6 shadow-md">
            <div className="flex flex-col">
                <div className="mb-5">
                    <div className="flex items-center justify-between">
                        <span className="font-bold">{title || ''}</span>
                        <HandleIcon />
                    </div>
                    {subtitle && (
                        <span className="text-xs text-slate-400">
                            {subtitle}
                        </span>
                    )}
                </div>
                {children}
            </div>
        </div>
    )
}
