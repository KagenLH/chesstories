import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SplashNav from './components/Splash/SplashNav';
import SplashPage from './components/Splash/SplashPage';
import AuthModal from './components/Auth/AuthModal/AuthModal';

import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <AuthModal/>
      <SplashNav/>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
