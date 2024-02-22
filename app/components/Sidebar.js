import React from 'react'

function Sidebar() {
    return (
        <section className='border-r-2 h-full w-1/5 shadow-lg'>
            <div className='p-4 bg-indigo-950 text-white h-44 mb-2 flex flex-col justify-center gap-2'>
                <center>
                    {/* <div className='bg-gray-900 border-2 border-neutral-600 w-max p-2 rounded-full overflow-hidden mb-1 shadow-lg'>
                        <img className="w-16 h-w-16" src={logo} alt="logo" />
                    </div> */}
                    <p className='text-base'>นายคเชนทร์ชัย ใจกล้า</p>
                    <p className='text-base'>ทีม : 2</p>
                </center>
            </div>
            <div className="flex flex-col">
                <a href="/home">
                    <div className='hover:bg-neutral-900 text-white transition py-2 px-4'>
                        <h3 className='text-lg'>โปรเจคของฉัน</h3>
                    </div>
                </a>
                <a href="/my-team">
                    <div className='hover:bg-neutral-900 text-white transition py-2 px-4'>
                        <h3 className='text-lg'>ทีมของฉัน</h3>
                    </div>
                </a>
            </div>
        </section>
    )
}

export default Sidebar