

// import React, { useEffect, useState } from 'react';
// import { BsFillArchiveFill, BsPeopleFill, BsFillBellFill, BsCurrencyDollar, BsPencilSquare } from 'react-icons/bs';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
// import { db } from '../../BackEnd/Firebase/firebase-config'; // Import Firebase
// import { doc, getDoc, setDoc } from 'firebase/firestore';

// function Home() {
//     const [selectedPeriod, setSelectedPeriod] = useState('Daily');
//     const [vehicleData, setVehicleData] = useState([]);
//     const [totalVehicles, setTotalVehicles] = useState(0);
//     const [revenuePerVehicle, setRevenuePerVehicle] = useState(10);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const userEmail = 'khushal.kapse@gmail.com';

//     useEffect(() => {
//         const fetchRevenue = async () => {
//             const revenueDoc = await getDoc(doc(db, 'settings', 'revenue'));
//             if (revenueDoc.exists()) {
//                 setRevenuePerVehicle(revenueDoc.data().value);
//             }
//         };
//         fetchRevenue();
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(`http://localhost:3000/vehicle-count/${selectedPeriod.toLowerCase()}?email=${userEmail}`);
//                 let rawData = Array.isArray(response.data) ? response.data : [];
                
//                 const formattedData = rawData.map((count, index) => ({
//                     name: `${selectedPeriod} ${index + 1}`,
//                     count: Number(count) || 0
//                 })).filter(item => item.count >= 0);

//                 setVehicleData(formattedData);
//                 setTotalVehicles(formattedData.reduce((sum, item) => sum + item.count, 0));
//             } catch (err) {
//                 setError('Failed to fetch data. Please check server connection.');
//                 setVehicleData([]);
//                 setTotalVehicles(0);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [selectedPeriod]);

//     const handleRevenueChange = async () => {
//         await setDoc(doc(db, 'settings', 'revenue'), { value: revenuePerVehicle });
//         setIsEditing(false);
//     };

//     return (
//         <main className='main-container'>
//             <div className='main-title'>
//                 <h3>DASHBOARD</h3>
//                 <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
//                     <option value="Daily">Daily</option>
//                     <option value="Monthly">Monthly</option>
//                     <option value="Yearly">Yearly</option>
//                 </select>
//             </div>

//             {loading ? <div>Loading...</div> : error ? <div className='error'>{error}</div> : (
//                 <>
//                     <div className='main-cards'>
//                         <div className='card'>
//                             <h3>Total Vehicles</h3>
//                             <BsFillArchiveFill className='card_icon' />
//                             <h1>{totalVehicles}</h1>
//                         </div>
//                         <div className='card'>
//                             <div className='card-header'>
//                                 <h3>Total Revenue</h3>
//                                 <BsPencilSquare className='edit-icon' onClick={() => setIsEditing(true)} />
//                             </div>
//                             <BsCurrencyDollar className='card_icon' />
//                             <h1>{totalVehicles * revenuePerVehicle} Rs</h1>
//                             {isEditing ? (
//                                 <div>
//                                     <input 
//                                         type='number' 
//                                         value={revenuePerVehicle} 
//                                         onChange={(e) => setRevenuePerVehicle(Number(e.target.value) || 0)}
//                                     />
//                                     <button onClick={handleRevenueChange}>Save</button>
//                                 </div>
//                             ) : null}
//                         </div>
//                         <div className='card'>
//                             <h3>Prediction</h3>
//                             <BsPeopleFill className='card_icon' />
//                             <h1>--</h1>
//                         </div>
//                         <div className='card'>
//                             <h3>Recommendation</h3>
//                             <BsFillBellFill className='card_icon' />
//                             <h1>150</h1>
//                         </div>
//                     </div>

//                     <div className='chartsShow'>
//                         <div className='charts'>
//                             {vehicleData.length > 0 ? (
//                                 <ResponsiveContainer width='100%' height={400}>
//                                     <BarChart data={vehicleData}>
//                                         <CartesianGrid strokeDasharray='3 3' />
//                                         <XAxis dataKey='name' />
//                                         <YAxis />
//                                         <Tooltip />
//                                         <Legend />
//                                         <Bar dataKey='count' fill='#8884d8' barSize={30} />
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             ) : (
//                                 <div>No data available</div>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             )}
//         </main>
//     );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillBellFill, BsCurrencyDollar, BsPencilSquare } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { db } from '../../BackEnd/Firebase/firebase-config'; // Import Firebase
import { doc, getDoc, setDoc } from 'firebase/firestore';

function Home() {
    const [prediction, setPrediction] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('Daily');
    const [vehicleData, setVehicleData] = useState([]);
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [revenuePerVehicle, setRevenuePerVehicle] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const userEmail = 'khushal.kapse@gmail.com';

    useEffect(() => {
        const fetchRevenue = async () => {
            const revenueDoc = await getDoc(doc(db, 'settings', 'revenue'));
            if (revenueDoc.exists()) {
                setRevenuePerVehicle(revenueDoc.data().value);
            }
        };
        fetchRevenue();
    }, []);

    useEffect(() => {
        // Get current month and year
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        // Generate the same key used in Prediction.jsx
        const key = `prediction-${month}-${year}`;
        const storedPrediction = localStorage.getItem(key);

        if (storedPrediction) {
            setPrediction(storedPrediction);
        } else {
            setPrediction("No Prediction Available");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3000/vehicle-count/${selectedPeriod.toLowerCase()}?email=${userEmail}`);
                let rawData = Array.isArray(response.data) ? response.data : [];
                
                const formattedData = rawData.map((count, index) => ({
                    name: `${selectedPeriod} ${index + 1}`,
                    count: Number(count) || 0
                })).filter(item => item.count >= 0);

                setVehicleData(formattedData);
                setTotalVehicles(formattedData.reduce((sum, item) => sum + item.count, 0));
            } catch (err) {
                setError('Failed to fetch data. Please check server connection.');
                setVehicleData([]);
                setTotalVehicles(0);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedPeriod]);

    const handleRevenueChange = async () => {
        await setDoc(doc(db, 'settings', 'revenue'), { value: revenuePerVehicle });
        setIsEditing(false);
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
                <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
            </div>

            {loading ? <div>Loading...</div> : error ? <div className='error'>{error}</div> : (
                <>
                    <div className='main-cards'>
                        <div className='card'>
                            <h3>Total Vehicles</h3>
                            <BsFillArchiveFill className='card_icon' />
                            <h1>{totalVehicles}</h1>
                        </div>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Total Revenue</h3>
                                <BsPencilSquare className='edit-icon' onClick={() => setIsEditing(true)} />
                            </div>
                            <BsCurrencyDollar className='card_icon' />
                            <h1>{totalVehicles * revenuePerVehicle} Rs</h1>
                            {isEditing ? (
                                <div>
                                    <input 
                                        type='number' 
                                        value={revenuePerVehicle} 
                                        onChange={(e) => setRevenuePerVehicle(Number(e.target.value) || 0)}
                                    />
                                    <button onClick={handleRevenueChange}>Save</button>
                                </div>
                            ) : null}
                        </div>
                        
                        <div className='card'>
                            <h3>Prediction</h3>
                            <BsFillBellFill className='card_icon' />
                            <h1>{prediction}</h1>
                        </div>
                        <div className='card'>
                            <h3>Recommendation</h3>
                            <BsFillBellFill className='card_icon' />
                            <h1>150</h1>
                        </div>
                    </div>

                    <div className='chartsShow'>
                        <div className='charts'>
                            {vehicleData.length > 0 ? (
                                <ResponsiveContainer width='100%' height={400}>
                                    <BarChart data={vehicleData}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='name' />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey='count' fill='#8884d8' barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div>No data available</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}

export default Home;

