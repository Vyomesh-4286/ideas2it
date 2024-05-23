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

    const [category, setCategory] = useState('Standard');
    const [platform, setPlatform] = useState('AWS');
    const [geography, setGeography] = useState('US East (Northern Virginia)');
    const [storageType, setStorageType] = useState('On_demand');
    const [warehouseSize, setWarehouseSize] = useState('XS');
    const [sessionsPerDay, setSessionsPerDay] = useState(1);
    const [daysOfWeek, setDaysOfWeek] = useState(1);
    const [estimatedStorage, setEstimatedStorage] = useState(0);
    const [duration, setDuration] = useState(0);

    const [category1, setCategory1] = useState('Standard');
    const [platform1, setPlatform1] = useState('AWS');
    const [geography1, setGeography1] = useState('US East (Northern Virginia)');
    const [storageType1, setStorageType1] = useState('On_demand');
    const [warehouseSize1, setWarehouseSize1] = useState('XS');
    const [sessionsPerDay1, setSessionsPerDay1] = useState(1);
    const [daysOfWeek1, setDaysOfWeek1] = useState(1);
    const [estimatedStorage1, setEstimatedStorage1] = useState(0);
    const [duration1, setDuration1] = useState(0);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
        setUserData(storedUserData);
    }, []);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    const handleNextStep = (estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration) => {
        if (estimatedStorage > 0) {
            setCharges(calculatedCharges);
            setCredits(calculatedCredits);
            setCategory(category);
            setPlatform(platform);
            setGeography(geography);
            setStorageType(storageType);
            setWarehouseSize(warehouseSize);
            setSessionsPerDay(sessionsPerDay);
            setDaysOfWeek(daysOfWeek);
            setEstimatedStorage(estimatedStorage);
            setDuration(duration);
            if (step === 0) {
                setStep(1);
            }
        }
    };

    const handleNextStep1 = (estimatedStorage, calculatedCharges1, calculatedCredits1, category1, platform1, geography1, storageType1, warehouseSize1, sessionsPerDay1, daysOfWeek1, duration1) => {
        if (estimatedStorage > 0) {
            setCharges(prevCharges => prevCharges + calculatedCharges1);
            setCredits(prevCredits => prevCredits + calculatedCredits1);
            setCategory1(category1);
            setPlatform1(platform1);
            setGeography1(geography1);
            setStorageType1(storageType1);
            setWarehouseSize1(warehouseSize1);
            setSessionsPerDay1(sessionsPerDay1);
            setDaysOfWeek1(daysOfWeek1);
            setEstimatedStorage1(estimatedStorage1);
            setDuration1(duration1);
            setStep(4);
        }
    }

    const handleEditUser = (index) => {
        setEditUserIndex(index);

        // Retrieve user data
        const user = userData[index];
        setCategory(user.category);
        setPlatform(user.platform);
        setGeography(user.geography);
        setStorageType(user.storageType);
        setWarehouseSize(user.warehouseSize);
        setSessionsPerDay(user.sessionsPerDay);
        setDaysOfWeek(user.daysOfWeek);
        setEstimatedStorage(user.estimatedStorage);
        setDuration(user.duration);
    };

    const handleDeleteUser = (index) => {
        const updatedUserData = userData.filter((_, i) => i !== index);
        setUserData(updatedUserData);
        if (updatedUserData.length === 0) {
            setStep(0); // Reset to step 0 if no warehouses are left
        }
    };

    const handleUpdateUser = (updatedUser) => {
        const updatedUserData = userData.map((user, i) =>
            i === editUserIndex ? updatedUser : user
        );
        setUserData(updatedUserData);
        setEditUserIndex(null);
    };

    const handleViewCost = () => {
        const name = document.getElementById('name').value || username; // Use current username if available
        const email = document.getElementById('email').value || ''; // Use current email if available, or an empty string
        const checkbox = document.getElementById('check').checked;

        if (checkbox) {
            setUsername(name); // Update username with the filled or existing value
            const updatedUser = {
                name,
                email,
                charges,
                credits,
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
                // If editUserIndex is not null, it means we are editing an existing user
                handleUpdateUser(updatedUser); // Call handleUpdateUser to update existing user data
            } else {
                // If editUserIndex is null, it means we are adding a new user
                setUserData([...userData, updatedUser]); // Add new user data
            }

            setStep(2);
        } else {
            console.log('Please fill in all required fields.');
        }
    };

    const addNewWarehouse = (e) => {
        e.preventDefault();
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
                        <div className='banner_content max-w-[800px] m-auto text-white pt-[160px] relative z-10'>
                            <div className='cost-grid grid grid-cols-2 mb-[50px]'>
                                <div className='estiCost'>
                                    <h3>Estimated Cost</h3>
                                    <h1 className='costTotal'><span>$</span>{charges}</h1>
                                    <div className='dist'>
                                        <p>per month</p>
                                    </div>
                                </div>
                                <div className='totalCrediCost'>
                                    <h3>Total Credits Consumed</h3>
                                    <h1 className='costTotal'>{credits}</h1>
                                    <div className='dist'>
                                        <p>per month</p>
                                    </div>
                                </div>
                            </div>
                            <div className='dist'>
                                <p>*This calculator aims to provide you a ball park estimate for what to expect as a monthly cost of Snowflake. Actual costs may vary.</p>
                            </div>
                        </div>
                    )}
                </section>
                {step < 4 && (
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
                                            <h3>You are just a step away from seeing the cost. </h3>
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
                                                <h4>Warehouse 1</h4>
                                                <div className='changes_data flex gap-5 w-full'>
                                                    {userData.map((user, index) => (
                                                        <li className='list-none w-full' key={index}>
                                                            <div className='user-data-item w-full'>
                                                                {editUserIndex === index ? (
                                                                    <div className='step_1'>
                                                                        <div className='user_data_list'>
                                                                            <CalculateWizard
                                                                                onNextStep={(estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration) => {
                                                                                    handleNextStep(estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration);
                                                                                    handleUpdateUser({
                                                                                        name: user.name,
                                                                                        email: user.email,
                                                                                        charges: calculatedCharges,
                                                                                        credits: calculatedCredits,
                                                                                        category,
                                                                                        platform,
                                                                                        geography,
                                                                                        storageType,
                                                                                        warehouseSize,
                                                                                        sessionsPerDay,
                                                                                        daysOfWeek,
                                                                                        estimatedStorage,
                                                                                        duration
                                                                                    });
                                                                                }}
                                                                                initialValues={{
                                                                                    category: category,
                                                                                    platform: platform,
                                                                                    geography: geography,
                                                                                    storageType: storageType,
                                                                                    warehouseSize: warehouseSize,
                                                                                    sessionsPerDay: sessionsPerDay,
                                                                                    daysOfWeek: daysOfWeek,
                                                                                    estimatedStorage: estimatedStorage,
                                                                                    duration: duration
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>category</p>
                                                                            </div>
                                                                            <h4>{user.category}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>platform</p>
                                                                            </div>
                                                                            <h4>{user.platform}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>geography</p>
                                                                            </div>
                                                                            <h4>{user.geography}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>storageType</p>
                                                                            </div>
                                                                            <h4>{user.storageType}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>warehouseSize</p>
                                                                            </div>
                                                                            <h4>{user.warehouseSize}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>sessionsPerDay</p>
                                                                            </div>
                                                                            <h4>{user.sessionsPerDay}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>daysOfWeek</p>
                                                                            </div>
                                                                            <h4>{user.daysOfWeek}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>estimatedStorage</p>
                                                                            </div>
                                                                            <h4>{user.estimatedStorage}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>duration</p>
                                                                            </div>
                                                                            <h4>{user.duration}</h4>
                                                                        </div>
                                                                        <button className='absolute right-0 top-0 mr-16' onClick={() => handleEditUser(index)}>Edit</button>
                                                                        <button className='absolute right-0 top-0' onClick={() => handleDeleteUser(index)}>Delete</button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </li>
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
                                                <h4>Warehouse 1</h4>
                                                <div className='changes_data flex gap-5 w-full'>
                                                    {userData.map((user, index) => (
                                                        <li className='list-none w-full' key={index}>
                                                            <div className='user-data-item w-full'>
                                                                {editUserIndex === index ? (
                                                                    <div className='step_1'>
                                                                        <div className='user_data_list'>
                                                                            <CalculateWizard
                                                                                onNextStep={(estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration) => {
                                                                                    handleNextStep(estimatedStorage, calculatedCharges, calculatedCredits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration);
                                                                                    handleUpdateUser({
                                                                                        name: user.name,
                                                                                        email: user.email,
                                                                                        charges: calculatedCharges,
                                                                                        credits: calculatedCredits,
                                                                                        category,
                                                                                        platform,
                                                                                        geography,
                                                                                        storageType,
                                                                                        warehouseSize,
                                                                                        sessionsPerDay,
                                                                                        daysOfWeek,
                                                                                        estimatedStorage,
                                                                                        duration
                                                                                    });
                                                                                }}
                                                                                initialValues={{
                                                                                    category: category,
                                                                                    platform: platform,
                                                                                    geography: geography,
                                                                                    storageType: storageType,
                                                                                    warehouseSize: warehouseSize,
                                                                                    sessionsPerDay: sessionsPerDay,
                                                                                    daysOfWeek: daysOfWeek,
                                                                                    estimatedStorage: estimatedStorage,
                                                                                    duration: duration
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>category</p>
                                                                            </div>
                                                                            <h4>{user.category}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>platform</p>
                                                                            </div>
                                                                            <h4>{user.platform}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>geography</p>
                                                                            </div>
                                                                            <h4>{user.geography}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>storageType</p>
                                                                            </div>
                                                                            <h4>{user.storageType}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>warehouseSize</p>
                                                                            </div>
                                                                            <h4>{user.warehouseSize}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>sessionsPerDay</p>
                                                                            </div>
                                                                            <h4>{user.sessionsPerDay}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>daysOfWeek</p>
                                                                            </div>
                                                                            <h4>{user.daysOfWeek}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>estimatedStorage</p>
                                                                            </div>
                                                                            <h4>{user.estimatedStorage}</h4>
                                                                        </div>
                                                                        <div className='userDataWarehouse'>
                                                                            <div className='dist'>
                                                                                <p>duration</p>
                                                                            </div>
                                                                            <h4>{user.duration}</h4>
                                                                        </div>
                                                                        <button className='absolute right-0 top-0 mr-16' onClick={() => handleEditUser(index)}>Edit</button>
                                                                        <button className='absolute right-0 top-0' onClick={() => handleDeleteUser(index)}>Delete</button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-start justify-between gap-5 w-full mt-10'>
                                                <h4>Warehouse 2</h4>
                                                <div className='user-data-item w-full'>
                                                    <div className='step_1'>
                                                        <div className='user_data_list'>
                                                            <CalculateWizard onNextStep={handleNextStep1} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {step === 4 && (
                                    <React.Fragment>
                                        Warehouse 2
                                    </React.Fragment>
                                )}
                            </form>
                        </div>
                    </section>
                )}
            </main>
        </React.Fragment>
    );
};

export default Warehouse;