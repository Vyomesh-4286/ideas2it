import React, { useState } from 'react';
import './CalculateWizard.css';
import pricingData from './getPriceByCategory.json';
import storageCosts from './getStorageCost.json';
import sizeCredits from './getCreditHrs.json';

function CalculateWizard({ onNextStep }) {
    const [category, setCategory] = useState('Standard');
    const [platform, setPlatform] = useState('AWS');
    const [geography, setGeography] = useState('US East (Northern Virginia)');
    const [storageType, setStorageType] = useState('On_demand');
    const [warehouseSize, setWarehouseSize] = useState('XS');
    const [sessionsPerDay, setSessionsPerDay] = useState(1);
    const [daysOfWeek, setDaysOfWeek] = useState(1);
    const [estimatedStorage, setEstimatedStorage] = useState(0);
    const [duration, setDuration] = useState(0);
    const [errors, setErrors] = useState({});

    const getCreditHrs = (size) => {
        const entry = sizeCredits.find(item => item.Size === size);
        return entry ? entry.Credits : 0;
    };

    const getPriceByCategory = (platform, category, geography) => {
        const entry = pricingData.find(item =>
            item["Cloud Provider"] === platform &&
            item.GeoLocation === geography
        );
        return entry ? entry[category] : 0;
    };

    const getStorageCost = (platform, storageType, geography) => {
        const entry = storageCosts.find(item =>
            item["Cloud Provider"] === platform &&
            item.GeoLocation === geography
        );
        return entry ? entry[storageType] : 0;
    };

    const totalHrs = (duration * sessionsPerDay * (daysOfWeek * 4.5)) / 60;
    const credits = getCreditHrs(warehouseSize) * totalHrs;
    const charges = credits * getPriceByCategory(platform, category, geography) + (getStorageCost(platform, storageType, geography) * estimatedStorage);

    const validateFields = () => {
        let newErrors = {};

        if (!category) newErrors.category = "Category of Application is required";
        if (!platform) newErrors.platform = "Cloud Platform is required";
        if (!geography) newErrors.geography = "Geography of Application is required";
        if (!storageType) newErrors.storageType = "Type of Storage is required";
        if (!warehouseSize) newErrors.warehouseSize = "Size of Warehouse is required";
        if (sessionsPerDay <= 0) newErrors.sessionsPerDay = "Sessions per Day must be greater than 0";
        if (daysOfWeek <= 0) newErrors.daysOfWeek = "Days per Week must be greater than 0";
        if (estimatedStorage <= 0) newErrors.estimatedStorage = "Estimated Storage must be greater than 0";
        if (duration <= 0) newErrors.duration = "Duration must be greater than 0";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (validateFields()) {
            if (!isNaN(charges) && charges > 0) {
                onNextStep(estimatedStorage, charges, credits, category, platform, geography, storageType, warehouseSize, sessionsPerDay, daysOfWeek, duration); // Pass charges and credits to onNextStep
            } else {
                console.log("Charges must be a valid number greater than 0 to proceed.");
            }
        } else {
            console.log("Form is invalid. Please fill all required fields.");
        }
    };

    return (
        <div className='wizard_1'>
            <div className='wizard_grids grid lg:grid-cols-2 grid-cols-1 lg:gap-x-[40px] lg:gap-y-[30px] gap-y-5'>
                <div className='wizard_grid'>
                    <div className='form-label'>Category of Application</div>
                    <div className='radio-grid flex items-center lg:gap-[10px] gap-2'>
                        {['Standard', 'Enterprise', 'Business Critical'].map((cat) => (
                            <div className='radio-bx' key={cat}>
                                <input type='radio' value={cat} id={`coa_radio_${cat}`} name='coa_radio'
                                    onChange={(e) => setCategory(e.target.value)}
                                    checked={category === cat} />
                                <label htmlFor={`coa_radio_${cat}`}>{cat}</label>
                            </div>
                        ))}
                    </div>
                    {errors.category && <div className="error">{errors.category}</div>}
                </div>
                <div className='wizard_grid'>
                    <div className='form-label'>Cloud Platform</div>
                    <div className='radio-grid flex items-center lg:gap-[10px] gap-2'>
                        {['AWS', 'Microsoft Azure', 'Google Cloud'].map((plat) => (
                            <div className='radio-bx' key={plat}>
                                <input type='radio' value={plat} id={`cp_radio_${plat}`} name='cp_radio'
                                    onChange={(e) => setPlatform(e.target.value)}
                                    checked={platform === plat} />
                                <label htmlFor={`cp_radio_${plat}`}>{plat}</label>
                            </div>
                        ))}
                    </div>
                    {errors.platform && <div className="error">{errors.platform}</div>}
                </div>
                <div className='wizard_grid'>
                    <div className='form-label'>Geography of Application</div>
                    <div className='select-btn flex items-center gap-[10px]'>
                        <select name="goa" value={geography} onChange={(e) => setGeography(e.target.value)}>
                            {pricingData.map((item, index) => (
                                <option key={index} value={item.GeoLocation}>{item.GeoLocation}</option>
                            ))}
                        </select>
                    </div>
                    {errors.geography && <div className="error">{errors.geography}</div>}
                </div>
                <div className='wizard_grid'>
                    <div className='form-label'>Type of Storage</div>
                    <div className='radio-grid flex items-center lg:gap-[10px] gap-2'>
                        {['On_demand', 'Pre_purchase'].map((type) => (
                            <div className='radio-bx' key={type}>
                                <input type='radio' value={type} id={`tos_radio_${type}`} name='tos_radio'
                                    onChange={(e) => setStorageType(e.target.value)}
                                    checked={storageType === type} />
                                <label htmlFor={`tos_radio_${type}`}>{type.replace('_', ' ')}</label>
                            </div>
                        ))}
                    </div>
                    {errors.storageType && <div className="error">{errors.storageType}</div>}
                </div>
                <div className='wizard_grid lg:col-span-2'>
                    <div className='form-label'>Size of Warehouse</div>
                    <div className='radio-grid flex items-center lg:gap-[10px] gap-2 flex-wrap'>
                        {sizeCredits.map((item) => (
                            <div className='radio-bx' key={item.Size}>
                                <input type='radio' value={item.Size} id={`sow_radio_${item.Size}`} name='sow_radio'
                                    onChange={(e) => setWarehouseSize(e.target.value)}
                                    checked={warehouseSize === item.Size} />
                                <label htmlFor={`sow_radio_${item.Size}`}>{item.Size}</label>
                            </div>
                        ))}
                    </div>
                    {errors.warehouseSize && <div className="error">{errors.warehouseSize}</div>}
                </div>
                <div className='wizard_grid lg:col-span-2'>
                    <div className='wizard_grid_boxs lg:flex justify-between items-center lg:gap-5 gap-4 grid grid-cols-2'>
                        <div className='wizard_grid_box'>
                            <div className='form-label'>No. of Sessions per Day</div>
                            <div className='wizard_grid_box_counter'>
                                <button onClick={(e) => { e.preventDefault(); setSessionsPerDay(Math.max(sessionsPerDay - 1, 1)); }}>-</button>
                                <span className='count_num'>{sessionsPerDay}</span>
                                <button onClick={(e) => { e.preventDefault(); setSessionsPerDay(sessionsPerDay + 1); }}>+</button>
                            </div>
                            {errors.sessionsPerDay && <div className="error">{errors.sessionsPerDay}</div>}
                        </div>
                        <div className='wizard_grid_box'>
                            <div className='form-label'>No. of Days per Week</div>
                            <div className='wizard_grid_box_counter'>
                                <button onClick={(e) => { e.preventDefault(); setDaysOfWeek(Math.max(daysOfWeek - 1, 1)); }}>-</button>
                                <span className='count_num'>{daysOfWeek}</span>
                                <button onClick={(e) => { e.preventDefault(); setDaysOfWeek(daysOfWeek + 1); }}>+</button>
                            </div>
                            {errors.daysOfWeek && <div className="error">{errors.daysOfWeek}</div>}
                        </div>
                        <div className='wizard_grid_box'>
                            <div className='form-label'>Est. Storage per Month</div>
                            <div className='wizard_grid_box_counter'>
                                <input className='count_num' type='number' id='count2' value={estimatedStorage}
                                    onChange={(e) => setEstimatedStorage(Math.max(0, e.target.value))} />
                                <label>TB</label>
                            </div>
                            {errors.estimatedStorage && <div className="error">{errors.estimatedStorage}</div>}
                        </div>
                        <div className='wizard_grid_box'>
                            <div className='form-label'>Duration of Each Session</div>
                            <div className='wizard_grid_box_counter'>
                                <input className='count_num' type='number' id='count3' value={duration}
                                    onChange={(e) => setDuration(Math.max(0, e.target.value))} />
                                <label>Mins</label>
                            </div>
                            {errors.duration && <div className="error">{errors.duration}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <button className='btn-blue' onClick={handleNextStep}>Calculate
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928931C10.9526 0.538407 10.3195 0.538407 9.92893 0.928931C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9L17 9L17 7L1 7L1 9Z" fill="#5C409C" />
                </svg>
            </button>
            {Object.keys(errors).length > 0 && <div className="error-summary">Please fill all required fields.</div>}
        </div>
    );
}

export default CalculateWizard;
