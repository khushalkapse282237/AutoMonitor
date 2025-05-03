import admin from 'firebase-admin';
import serviceAccount from '../context/serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auto-monitor-7ccaa-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

// Helper function to pad numbers with leading zeros
const padZero = (num) => num.toString().padStart(2, '0');

// 1. **Fetch Last 15 Days Count (Handles Month & Year Boundaries)**
export const fetchLast15DaysVehicleCount = async (userEmail) => {
  try {
    const result = [];
    let date = new Date(); // Start from today

    for (let i = 0; i < 15; i++) {
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());

      const { plate_count } = await fetchDailyVehicleCount(userEmail, year, month, day);
      result.push(plate_count);

      // Move back 1 day
      date.setDate(date.getDate() - 1);
    }

    console.log('Last 15 days count:', result);
    return result;
  } catch (error) {
    console.error('Error fetching last 15 days vehicle count:', error);
    throw error;
  }
};

// 2. **Fetch Last 15 Months Count (Handles Year Boundary)**
export const fetchLast15MonthsVehicleCount = async (userEmail) => {
  try {
    const result = [];
    let date = new Date(); // Start from the current month

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Convert to 1-based month

    for (let i = 0; i < 15; i++) {
      const { plate_count } = await fetchMonthlyVehicleCount(userEmail, year, month);
      result.push(plate_count);

      // Decrement month properly
      month--;
      if (month === 0) {
        month = 12;
        year--;
      }
    }

    console.log("Last 15 months count:", result);
    return result;
  } catch (error) {
    console.error("Error fetching last 15 months vehicle count:", error);
    throw error;
  }
};


// 3. **Fetch Last 15 Years Count**
export const fetchLast15YearsVehicleCount = async (userEmail) => {
  try {
    const result = [];
    let year = new Date().getFullYear(); // Start from current year

    for (let i = 0; i < 15; i++) {
      const { plate_count } = await fetchYearlyVehicleCount(userEmail, year);
      result.push(plate_count);

      // Move back 1 year
      year -= 1;
    }

    console.log('Last 15 years count:', result);
    return result;
  } catch (error) {
    console.error('Error fetching last 15 years vehicle count:', error);
    throw error;
  }
};

// 4. **Fetch Daily Vehicle Count**
export const fetchDailyVehicleCount = async (userEmail, year, month, day) => {
  try {
    const docRef = db.collection('users').doc(userEmail)
      .collection('data').doc(year.toString())
      .collection(month).doc(day);

    const doc = await docRef.get();
    return doc.exists ? { plate_count: doc.data().metadata?.plate_count || 0 } : { plate_count: 0 };
  } catch (error) {
    console.error('Error fetching daily vehicle count:', error);
    throw error;
  }
};

// 5. **Fetch Monthly Vehicle Count**
export const fetchMonthlyVehicleCount = async (userEmail, year, month) => {
  try {
    if (!userEmail || !year || !month) {
      throw new Error("Invalid parameters: userEmail, year, and month are required.");
    }

    const monthStr = String(month).padStart(2, "0"); // Ensure "03" instead of "3"

    const monthRef = db.collection('users').doc(userEmail)
      .collection('data').doc(year.toString())
      .collection(monthStr); // Ensure valid Firestore path

    let totalPlateCount = 0;
    for (let day = 1; day <= 31; day++) {
      const docRef = monthRef.doc(padZero(day));  // Ensure valid day format
      const doc = await docRef.get();
      if (doc.exists) {
        totalPlateCount += doc.data().metadata?.plate_count || 0;
      }
    }

    return { plate_count: totalPlateCount };
  } catch (error) {
    console.error("Error fetching monthly vehicle count:", error);
    throw error;
  }
};

// 6. **Fetch Yearly Vehicle Count**
export const fetchYearlyVehicleCount = async (userEmail, year) => {
  try {
    let totalPlateCount = 0;

    for (let month = 1; month <= 12; month++) {
      const { plate_count } = await fetchMonthlyVehicleCount(userEmail, year, padZero(month));
      totalPlateCount += plate_count;
    }

    return { plate_count: totalPlateCount };
  } catch (error) {
    console.error('Error fetching yearly vehicle count:', error);
    throw error;
  }
};
