


// import { useState } from 'react';
// import './App.css';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import Home from './Home';
// import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import AddEmployee from "./components/Employee/AddEmployee";
// import Signup from './components/Auth/Signup';
// import Login from './components/Auth/Login';
// import EmployeeTable from './components/Employee/EmployeeTable';
// import EditEmployee from './components/Employee/EditEmployee';
// import Prediction from './components/Prediction/Prediction';
// import Recommendation from './components/Recommendation/Recommendation';
// import PageNotFound from './pages/PageNotFound';



// // Protected Route component
// const ProtectedRoute = ({ children }) => {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };

//   return (
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar} />
//       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
//       {children}
//     </div>
//   );
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const handleSignupSuccess = () => {
//     navigate('/login');
//   };

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     navigate('/'); // Redirects to Home after successful login
//   };

//   return (
//     <Routes>
//       {/* Public Routes - Full screen without sidebar */}
//       <Route 
//         path="/signup" 
//         element={
//           <div className="fullscreen-auth">
//             <Signup onSignupSuccess={handleSignupSuccess} />
//           </div>
//         } 
//       />
//       <Route 
//         path="/login" 
//         element={
//           <div className="fullscreen-auth">
//             <Login onLoginSuccess={handleLoginSuccess} />
//           </div>
//         } 
//       />

//       {/* Protected Routes - With sidebar and header */}
//       <Route
//         path="/"
//         element={
//           isAuthenticated ? (
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/signup" replace />
//           )
//         }
//       />
//       <Route
//         path="/table"
//         element={
//           isAuthenticated ? (
//             <ProtectedRoute>
//               <EmployeeTable />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/signup" replace />
//           )
//         }
//       />
//       <Route
//         path="/PageNotFound"
//         element={
//           isAuthenticated ? (
//             <ProtectedRoute>
//               <EmployeeTable />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/PageNotFound" replace />
//           )
//         }
//       />
//       <Route
//         path="/add"
//         element={
//           isAuthenticated ? (
//             <ProtectedRoute>
//               <AddEmployee />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/signup" replace />
//           )
//         }
//       />
//       <Route
//         path="/Recommendation"
//         element={
//           isAuthenticated ? (
//             <ProtectedRoute>
//               <Recommendation />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/Recommendation" replace />
//           )
//         }
//       />
//       <Route
//         path="/edit/:id"
//         element={
//           isAuthenticated ? (
//             <ProtectedRoute>
//               <EditEmployee />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/signup" replace />
//           )
//         }
//       />
//       <Route
//         path="/predict"
//         element={
//           isAuthenticated ? (
//             <ProtectedRoute>
//               <Prediction />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/signup" replace />
//           )
//         }
//       />


// {/* 404 Route */}
// <Route
//         path="/404"
//         element={<PageNotFound />}
//       />
      
//       {/* Catch-all route */}
//       <Route path="*" element={<Navigate to="/404" replace />} />
//     </Routes>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }


import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import AddEmployee from "./components/Employee/AddEmployee";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import EmployeeTable from "./components/Employee/EmployeeTable";
import EditEmployee from "./components/Employee/EditEmployee";
import Prediction from "./components/Prediction/Prediction";
import Recommendation from "./components/Recommendation/Recommendation";
import PageNotFound from "./pages/PageNotFound";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      {children}
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const navigate = useNavigate();
  const location = useLocation(); // Track current path

  useEffect(() => {
    // Check and update authentication state on mount
    const authState = localStorage.getItem("isAuthenticated");
    if (authState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignupSuccess = () => {
    navigate("/login");
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Persist login state
    // Redirect to the original requested page or home
    const intendedRoute = localStorage.getItem("intendedRoute") || "/";
    navigate(intendedRoute);
    localStorage.removeItem("intendedRoute"); // Clear stored route after navigation
  };

  // Function to protect routes
  const ProtectedRouteWrapper = ({ element }) => {
    if (!isAuthenticated) {
      localStorage.setItem("intendedRoute", location.pathname); // Store attempted route
      return <Navigate to="/login" replace />;
    }
    return <ProtectedRoute>{element}</ProtectedRoute>;
  };

  return (
    <Routes>
      {/* Public Routes - Full screen without sidebar */}
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <div className="fullscreen-auth"><Signup onSignupSuccess={handleSignupSuccess} /></div>
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <div className="fullscreen-auth"><Login onLoginSuccess={handleLoginSuccess} /></div>
        }
      />

      {/* Protected Routes - Now correctly redirecting to the intended path */}
      <Route path="/" element={<ProtectedRouteWrapper element={<Home />} />} />
      <Route path="/table" element={<ProtectedRouteWrapper element={<EmployeeTable />} />} />
      <Route path="/PageNotFound" element={<ProtectedRouteWrapper element={<EmployeeTable />} />} />
      <Route path="/add" element={<ProtectedRouteWrapper element={<AddEmployee />} />} />
      <Route path="/Recommendation" element={<ProtectedRouteWrapper element={<Recommendation />} />} />
      <Route path="/edit/:id" element={<ProtectedRouteWrapper element={<EditEmployee />} />} />
      <Route path="/predict" element={<ProtectedRouteWrapper element={<Prediction />} />} />

      {/* 404 Route */}
      <Route path="/404" element={<PageNotFound />} />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
