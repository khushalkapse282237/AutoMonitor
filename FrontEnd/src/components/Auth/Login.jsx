
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../BackEnd/Firebase/firebase-config";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../../../BackEnd/db/firebase-curd";
import "./login.css"

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [resetEmail, setResetEmail] = useState("");
//   const [showResetModal, setShowResetModal] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!email || !password) {
//       setError("All fields are required");
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error(error);
//       return;
//     }
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       toast.success("Logged in successfully!");
//       navigate("/");
//     } catch (err) {
//       setError("Invalid credentials");
//       toast.error("Invalid credentials");
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!resetEmail) {
//       toast.error("Please enter your email address");
//       return;
//     }
//     const result = await resetPassword(resetEmail);
//     if (result.success) {
//       toast.success(result.message);
//       setShowResetModal(false);
//     } else {
//       toast.error(result.message);
//     }
//   };

//   return (
//     <div id="login-container">
//       <form onSubmit={handleLogin} id="login-form">
//         <h2>Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           id="email-input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           id="password-input"
//         />
//         {error && <p id="error-text">{error}</p>}
//         <button type="submit" id="login-button">Login</button>
//         <div id="form-footer">
//           <span
//             onClick={() => setShowResetModal(true)}
//             id="forgot-password"
//           >
//             Forgot Password?
//           </span>
//           <Link to="/signup" id="signup-link">Signup</Link>
//         </div>
//       </form>

//       {showResetModal && (
//         <div id="modal-overlay">
//           <div id="modal-content">
//             <h3>Reset Password</h3>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={resetEmail}
//               onChange={(e) => setResetEmail(e.target.value)}
//               id="reset-email-input"
//             />
//             <button onClick={handleResetPassword} id="modal-button">Send Reset Email</button>
//             <button onClick={() => setShowResetModal(false)} id="modal-button-cancel">Cancel</button>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;


const Login = ({ onLoginSuccess }) => { // Add onLoginSuccess prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(error);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      onLoginSuccess(); // Call onLoginSuccess instead of navigate("/")
    } catch (err) {
      setError("Invalid credentials");
      toast.error("Invalid credentials");
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email address");
      return;
    }
    const result = await resetPassword(resetEmail);
    if (result.success) {
      toast.success(result.message);
      setShowResetModal(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div id="login-container">
      <form onSubmit={handleLogin} id="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          id="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="password-input"
        />
        {error && <p id="error-text">{error}</p>}
        <button type="submit" id="login-button">Login</button>
        <div id="form-footer">
          <span
            onClick={() => setShowResetModal(true)}
            id="forgot-password"
          >
            Forgot Password?
          </span>
          <Link to="/signup" id="signup-link">Signup</Link>
        </div>
      </form>

      {showResetModal && (
        <div id="modal-overlay">
          <div id="modal-content">
            <h3>Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              id="reset-email-input"
            />
            <button onClick={handleResetPassword} id="modal-button">Send Reset Email</button>
            <button onClick={() => setShowResetModal(false)} id="modal-button-cancel">Cancel</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;