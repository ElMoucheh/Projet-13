import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { getUserProfile, updateUserProfile } from '../auth/auth';

const User = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token, user]);

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile({ firstName, lastName }));
    setIsEditing(false); 
  };

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleCancelClick = () => {
    setFirstName(user?.firstName || ''); 
    setLastName(user?.lastName || '');
    setIsEditing(false);
  };

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div>
      <Navbar isAuthenticated={!!token} userName={user?.firstName} />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back<br /> {user?.firstName} {user?.lastName} !
          </h1>
          {!isEditing && ( 
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          )}
        </div>

        {isEditing && (
          <section className="profile-content">
            <form className="form-update-user">
              <div className="div-form p1">
                <FormInput
                  label="First Name"
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Button type="button" className="button update-button" onClick={handleUpdateProfile}>
                  Update Profile
                </Button>
              </div>
              <div className="div-form p2">
                <FormInput
                  label="Last Name"
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Button type="button" className="button cancel-button" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </div>
            </form>
          </section>
        )}
        
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default User;
