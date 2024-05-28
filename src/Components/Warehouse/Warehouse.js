import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Warehouse.css';
import CalculateWizard from '../CalculateWizard/CalculateWizard';
import UserDetail from '../UserDetail/UserDetail';

const Warehouse = () => {
    const [editUserIndex, setEditUserIndex] = useState(null);
    const [step, setStep] = useState(0);
    const [charges, setCharges] = useState(0);
    const [credits, setCredits] = useState(0);
    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
        setUserData(storedUserData);
    }, []);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    const roundToFourDecimalPlaces = (value) => {
        return Math.round(value * 10000) / 10000;
    };

    const handleNextStep = (estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration) => {
        if (estimatedStorage > 0) {
            const newWarehouse = {
                charges: roundToFourDecimalPlaces(calculatedCharges),
                credits: roundToFourDecimalPlaces(calculatedCredits),
                category,
                platform,
                geography,
                storageType,
                warehouseSize,
                sessionsPerDay,
                daysOfWeek,
                estimatedStorage,
                duration
            };

            if (editUserIndex !== null) {
                const previousCharges = userData[editUserIndex].charges;
                const previousCredits = userData[editUserIndex].credits;

                const updatedUserData = userData.map((user, i) =>
                    i === editUserIndex ? newWarehouse : user
                );
                setUserData(updatedUserData);

                setCharges(prevCharges => roundToFourDecimalPlaces(prevCharges - previousCharges + calculatedCharges));
                setCredits(prevCredits => roundToFourDecimalPlaces(prevCredits - previousCredits + calculatedCredits));
                
                setEditUserIndex(null);
            } else {
                setUserData([...userData, newWarehouse]);

                setCharges(prevCharges => roundToFourDecimalPlaces(prevCharges + calculatedCharges));
                setCredits(prevCredits => roundToFourDecimalPlaces(prevCredits + calculatedCredits));
            }

            if (!username) {
                setStep(1);
            } else {
                setStep(2);
            }
        }
    };

    const handleEditUser = (index) => {
        setEditUserIndex(index);
        setStep(3); // Move to the step where user can edit the warehouse
    };

    const handleDeleteUser = (index) => {
        const deletedWarehouse = userData[index];
        setCharges(prevCharges => roundToFourDecimalPlaces(prevCharges - deletedWarehouse.charges));
        setCredits(prevCredits => roundToFourDecimalPlaces(prevCredits - deletedWarehouse.credits));

        const updatedUserData = userData.filter((_, i) => i !== index);
        setUserData(updatedUserData);
        if (updatedUserData.length === 0) {
            setStep(0); // Reset to step 0 if no warehouses are left
        }
    };

    const handleViewCost = () => {
        const name = document.getElementById('name').value || username;
        const emailValue = document.getElementById('email').value || email;
        const checkbox = document.getElementById('check').checked;

        if (checkbox) {
            setUsername(name);
            setEmail(emailValue);
            setStep(2);
        } else {
            console.log('Please fill in all required fields.');
        }
    };

    const addNewWarehouse = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const continueAddingWarehouses = () => {
        setStep(3);
    };

    return (
        <React.Fragment>
            <Header username={username} />
            <main className='main relative w-full h-full bg-[#05279E]'>
                <section className='banner w-full relative'>
                    {step < 2 && (
                        <div className='banner_content max-w-[800px] m-auto text-white pt-[160px] relative z-10'>
                            <h2>Wondering how much a Snowflake Data Cloud could cost?</h2>
                            <h4>
                                Migrating your data from an on-prem to a Cloud Datawarehouse (or from one CDW to another) could be a daunting task. Even more when you can't estimate how much your new CDW could cost you. You are not alone. Most of our customers have shared this experience with us.
                            </h4>
                            <h4>
                                This is why we put our 1000's of hours of Snowflake expertise to develop this free Snowflake Cost Calculator to help you.
                            </h4>
                            <div className='dist'>
                                <p>*This calculator aims to provide you a ball park estimate for what to expect as a monthly cost of Snowflake. Actual costs may vary.</p>
                            </div>
                        </div>
                    )}
                    {step >= 2 && (
                        <div className='banner_content m-auto text-white pt-[160px] relative z-10'>
                            <div className='cost-grid flex justify-center items-center gap-20 mb-[50px]'>
                                <div className='estiCost'>
                                    <h3>Estimated Cost</h3>
                                    <h1 className='costTotal'><span>$</span>{charges.toFixed(4)}</h1>
                                    <div className='dist'>
                                        <p>per month</p>
                                    </div>
                                </div>
                                <div className='totalCrediCost'>
                                    <h3>Total Credits Consumed</h3>
                                    <h1 className='costTotal'>{credits.toFixed(4)}</h1>
                                    <div className='dist'>
                                        <p>per month</p>
                                    </div>
                                </div>
                            </div>
                            <div className='dist flex justify-center'>
                                <p>*This calculator aims to provide you a ball park estimate for what to expect as a monthly cost of Snowflake. Actual costs may vary.</p>
                            </div>
                        </div>
                    )}
                </section>
                <section className='warehouse_form bottom-0 left-0 w-full h-auto bg-white relative z-10'>
                    <div className='warehouse_form_step max-w-[800px] m-auto py-[40px] text-black'>
                        <form action=''>
                            {step === 0 && (
                                <>
                                    <div className='step_1'>
                                        <h3>Get your answers with our Snowflake Cost Calculator and take an informed decision!</h3>
                                        <h4>Enter your warehouse usage details to calculate the cost</h4>
                                        <CalculateWizard onNextStep={handleNextStep} />
                                    </div>
                                </>
                            )}
                            {step === 1 && (
                                <React.Fragment>
                                    <div className='step_2'>
                                        <h3>You are just a step away from seeing the cost.</h3>
                                        <h4>Enter your name and email address to continue.</h4>
                                        <UserDetail />
                                        <button className='btn-blue m-auto' onClick={handleViewCost}>View Cost
                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928931C10.9526 0.538407 10.3195 0.538407 9.92893 0.928931C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9L17 9L17 7L1 7L1 9Z" fill="#5C409C" />
                                            </svg>
                                        </button>
                                    </div>
                                </React.Fragment>
                            )}
                            {step === 2 && (
                                <>
                                    <div className='warehouse_data relative w-full'>
                                        <div className='flex flex-col items-start justify-between gap-5 w-full'>
                                            <h3>Added Warehouses</h3>
                                            <div className='changes_data flex gap-5 w-full all_new_warehouse justify-start items-start'>
                                                {userData.map((user, index) => (
                                                    <>
                                                        <h4 className='warehouse_text'>Warehouse {index + 1}</h4>
                                                        <li className='list-none w-full' key={index}>
                                                            <div className='user-data-item w-full'>
                                                                {editUserIndex === index ? (
                                                                    <div className='step_1'>
                                                                        <div className='user_data_list'>
                                                                            <CalculateWizard
                                                                                onNextStep={(estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration) => {
                                                                                    handleNextStep(estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration);
                                                                                }}
                                                                                initialValues={{
                                                                                    category: user.category,
                                                                                    platform: user.platform,
                                                                                    geography: user.geography,
                                                                                    storageType: user.storageType,
                                                                                    warehouseSize: user.warehouseSize,
                                                                                    sessionsPerDay: user.sessionsPerDay,
                                                                                    daysOfWeek: user.daysOfWeek,
                                                                                    estimatedStorage: user.estimatedStorage,
                                                                                    duration: user.duration
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Category</p>
                                                                            </div>
                                                                            <h4>{user.category}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Platform</p>
                                                                            </div>
                                                                            <h4>{user.platform}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Geography</p>
                                                                            </div>
                                                                            <h4>{user.geography}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Storage Type</p>
                                                                            </div>
                                                                            <h4>{user.storageType}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Warehouse Size</p>
                                                                            </div>
                                                                            <h4>{user.warehouseSize}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Sessions Per Day</p>
                                                                            </div>
                                                                            <h4>{user.sessionsPerDay}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Days of Week</p>
                                                                            </div>
                                                                            <h4>{user.daysOfWeek}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Estimated Storage</p>
                                                                            </div>
                                                                            <h4>{user.estimatedStorage}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>Duration</p>
                                                                            </div>
                                                                            <h4>{user.duration}</h4>
                                                                        </div>
                                                                        <button className='absolute right-0 top-0 mr-16' onClick={() => handleEditUser(index)}>Edit</button>
                                                                        <button className='absolute right-0 top-0' onClick={() => handleDeleteUser(index)}>Delete</button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='btn-add'>
                                            <button className='btn-blue m-auto' onClick={addNewWarehouse}>Add another warehouse</button>
                                        </div>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div className='warehouse_data relative w-full'>
                                        <div className='flex flex-col items-start justify-between gap-5 w-full'>
                                            <h4>New Warehouse</h4>
                                            <div className='user-data-item w-full'>
                                                <div className='step_1'>
                                                    <div className='user_data_list'>
                                                        <CalculateWizard onNextStep={handleNextStep} initialValues={editUserIndex !== null ? userData[editUserIndex] : {}} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center justify-center gap-5 w-full mt-10'>
                                            <button className='btn-blue' onClick={continueAddingWarehouses}>Add Another Warehouse</button>
                                            <button className='btn-blue' onClick={() => setStep(2)}>View All Warehouses</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </section>
            </main>
        </React.Fragment>
    );
};

export default Warehouse;
