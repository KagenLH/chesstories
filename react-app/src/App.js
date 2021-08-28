import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProtectedRoute from './components/Auth/ProtectedRoute';
import SplashNav from './components/Splash/SplashNav';
import NavBar from './components/NavBar';
import SplashPage from './components/Splash/SplashPage';
import AuthModal from './components/Auth/AuthModal/AuthModal';
import CollectionsPage from './components/CollectionsPage';
import CreateCollection from './components/CreateCollection';
import Collection from './components/Collection';
import Loader from './components/Loader/Loader';

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
      <NavBar/>
      <Loader/>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage/>
        </Route>
        <ProtectedRoute path="/collections" exact={true}>
          <CollectionsPage/>
        </ProtectedRoute>
        <ProtectedRoute path="/collections/new">
          <CreateCollection/>
        </ProtectedRoute>
        <ProtectedRoute path="/collections/:id">
          <Collection/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
