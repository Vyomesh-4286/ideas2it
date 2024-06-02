import React from 'react';
import './UserDetail.css';

const UserDetail = () => { 

    return (
        <React.Fragment>
            <form action='' className='form-wapper lg:max-w-[300px] m-auto'>
                <div className='form-control'>
                    <input type='text' name='' id='name' />
                    <label htmlFor='name'>Name</label>
                </div>
                <div className='form-control'>
                    <input type='email' name='' id='email' />
                    <label htmlFor='email'>Email ID</label>
                </div>
                <div className='form-control'>
                    <input type='text' name='' id='number' />
                    <label htmlFor='number'>Phone (Optional)</label>
                </div>
                <div className='form-control btn-checkbox flex !flex-row justify-center items-center gap-[10px]'>
                    <input type='checkbox' name='' id='check' />
                    <label htmlFor='check'>I agree with the storage and handling of my data by this website</label>
                </div>
            </form>
        </React.Fragment>
    );
};

export default UserDetail;
