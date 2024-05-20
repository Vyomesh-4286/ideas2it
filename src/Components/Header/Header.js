import React from 'react'

const Header = () => {
    return (
        <React.Fragment>
            <header className='absolute top-0 left-0 w-full lg:py-[40px] py-[50px] lg:px-[80px] px-[20px] z-[9]'>
                <div className='grid grid-cols-2'>
                    <div className='main_logo'>
                        <img src='./img/Ideas2IT.png' alt='Ideas2IT' width={80} height={80} />
                    </div>
                    <div className='main_nav flex justify-end items-center'>
                        <button className='btn-white'>Contact Us</button>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header
