import React from 'react';

const Header = ({ username }) => {
    return (
        <React.Fragment>
            <header className='absolute top-0 left-0 w-full lg:py-[40px] py-[50px] lg:px-[80px] px-[20px] z-50'>
                <div className='lg:grid grid-cols-2 flex justify-between items-center'>
                    <div className='main_logo'>
                        <img src='./img/Ideas2IT.png' alt='Ideas2IT' className='lg:w-[80px] w-[48px] lg:h-[80px] h-[48px]' />
                    </div>
                    <div className='main_nav flex items-center lg:gap-[40px] gap-5'>
                        {username && <p className='lg:ml-4 text-white'>Hi, {username}</p>}
                        <button className='btn-white'>Contact Us</button>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
