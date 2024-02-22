import React from 'react'

function Navbar({name}) {
    return (
        <nav className="sticky top-0 flex flex-col justify-center bg-neutral-900 px-4 py-2 h-20 text-white border-b shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/overview" className="text-2xl">หน้าแรก</a>
                <div className="flex justify-between items-center gap-1">
                    <p className="text-lg">{name}</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar