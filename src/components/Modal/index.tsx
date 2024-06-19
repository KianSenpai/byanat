import { Dialog } from 'primereact/dialog'
import { ReactNode } from 'react'

interface IModal {
    open: boolean
    onClose: () => void
    children: ReactNode
    title?: string
}

export default function Modal({ open, onClose, children, title }: IModal) {
    return (
        <Dialog
            header={title}
            visible={open}
            style={{ width: '50vw' }}
            onHide={onClose}
        >
            <div className="m-0">{children}</div>
        </Dialog>
    )
}
