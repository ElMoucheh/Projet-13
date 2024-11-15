import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { login } from '../auth/auth'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      isValid = false;
    }

    if (isValid) {
      try {
        const resultAction = await dispatch(login({ email, password }));

        if (login.fulfilled.match(resultAction)) {
          navigate('/user'); // Rediriger vers la page utilisateur après connexion
        }
      } catch (err) {
        console.error('Erreur lors de la connexion:', err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <FormInput
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            {status === 'loading' && <p>Connexion en cours...</p>}
            {error && <p className="error-message">{error}</p>}
            <Button type="submit" className="sign-in-button">
              Sign In
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;