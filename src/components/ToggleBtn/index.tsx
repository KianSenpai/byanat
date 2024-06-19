interface IToggle {
    isSelected?: boolean
    text?: string
    onClick?: () => void
}

export default function ToggleBtn({ isSelected, text, onClick }: IToggle) {
    return (
        <button
            onClick={onClick}
            className={`flex h-[30px] items-center justify-center rounded-3xl px-8 ${isSelected ? 'bg-indigo-200 font-extrabold' : 'border border-gray-400 font-light'}`}
        >
            {text}
        </button>
    )
}
