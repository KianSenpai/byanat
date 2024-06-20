import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import Results from '../Results'
import WidgetContainer from '../Widgets/WidgetContainer'

export default function Footer() {
    const [visibleSidebar, setVisibleSidebar] = useState<
        'results' | 'widgets' | null
    >(null)

    const showSidebar = (type: 'results' | 'widgets') => {
        setVisibleSidebar(type)
    }

    const hideSidebar = () => {
        setVisibleSidebar(null)
    }

    return (
        <div className="fixed bottom-0 left-0 flex w-full border-t border-slate-200 bg-white md:hidden">
            <button
                className="flex h-full w-1/2 items-center justify-center px-4 py-5"
                onClick={() => showSidebar('results')}
            >
                Results
            </button>
            <Sidebar
                visible={visibleSidebar === 'results'}
                onHide={hideSidebar}
            >
                <Results />
            </Sidebar>
            <button
                className="flex h-full w-1/2 items-center justify-center px-4 py-5"
                onClick={() => showSidebar('widgets')}
            >
                Widgets
            </button>
            <Sidebar
                visible={visibleSidebar === 'widgets'}
                onHide={hideSidebar}
                position="right"
            >
                <WidgetContainer />
            </Sidebar>
        </div>
    )
}
