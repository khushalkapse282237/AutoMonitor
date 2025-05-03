import React from 'react';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsBoxArrowRight,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth functions

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();
  const auth = getAuth(); // Get Firebase auth instance

  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth); // Sign out from Firebase
  //     console.log('User signed out from Firebase');
  //     // Optionally clear any local state (if you store tokens manually)
  //     localStorage.removeItem('authToken'); // Remove if used
  //     // Redirect to login page and replace history
  //     navigate('/login', { replace: true });
  //   } catch (error) {
  //     console.error('Sign-out error:', error.message);
  //   }
  // };

  const handleSignOut = async () => {
    try {
        await signOut(auth); // Sign out from Firebase
        console.log('User signed out from Firebase');

        // Clear localStorage completely OR remove only specific keys
        // localStorage.clear();  // Clears all localStorage data (use with caution)
        // Alternatively, remove only specific keys:
        localStorage.removeItem('isAuthenticated');
        // localStorage.removeItem('authToken');
        // localStorage.removeItem('signupData');

        // Force immediate navigation to login page
        window.location.href = '/login'; // Ensures immediate redirection
    } catch (error) {
        console.error('Sign-out error:', error.message);
    }
};


  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>Auto Monitor</div>
        <span className='icon close_icon' onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => navigate('/')}>
          <BsGrid1X2Fill className='icon' /> Dashboard
        </li>
        <li className='sidebar-list-item' onClick={() => navigate('/table')}>
          <BsFillArchiveFill className='icon' /> Data
        </li>
        <li className='sidebar-list-item' onClick={() => navigate('/predict')}>
          <BsFillGrid3X3GapFill className='icon' /> Prediction
        </li>
        <li className='sidebar-list-item' onClick={() => navigate('/Recommendation')}>
          <BsPeopleFill className='icon' /> Recommendation
        </li>
        {/* <li className='sidebar-list-item'>
          <a href="">
            <BsListCheck className='icon' /> Repeated Customers
          </a>
        </li> */}
        {/* <li className='sidebar-list-item'>
          <a href="">
            <BsMenuButtonWideFill className='icon' /> Reports
          </a>
        </li> */}
        <li className='sidebar-list-item' onClick={handleSignOut}>
          <BsBoxArrowRight className='icon' /> Sign Out
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;