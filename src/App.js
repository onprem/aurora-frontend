import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ApolloProvider } from '@apollo/react-hooks';
import useApolloClient from './graphQl/client';
import { AuthContext } from './context/auth';

import styles from './App.module.css';
import './assets/styles/variables.css';

import Loader from './components/Loader/Loader';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Nav from './views/Nav/Nav';
import NotificationBar from './components/notificationBar/NotificationBar';

const Home = React.lazy(() => import('./views/Home/Home'));
const About = React.lazy(() => import('./views/about/About'));
const Event = React.lazy(() => import('./views/events/Event'));
const LoginRegister = React.lazy(() => import('./views/loginRegister/LoginRegister'));
const Verify = React.lazy(() => import('./views/Verify/Verify'));
const NotFound = React.lazy(() => import('./views/NotFound/NotFound'));
const EventDetails = React.lazy(() => import('./views/EventDetails/EventDetails'));
const Contact = React.lazy(() => import('./views/contactUs/ContactUs'));
const WasteManagement = React.lazy(() => import('./views/WasteManagement/WasteManagement'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const AdminDashboard = React.lazy(() => import('./views/AdminDashboard/AdminDashboard'));
const Faq = React.lazy(() => import('./views/FAQ/faq'));
const Schedule = React.lazy(() => import('./views/schedule/schedule'));
const LogOut = React.lazy(() => import('./components/LogOut/LogOut'));
const Accomodation = React.lazy(() => import('./views/accomodation/Accomodation'));
const PronitePasses = React.lazy(() => import('./views/pronitePasses/PronitePasses'));
const CA = React.lazy(() => import('./views/CA/CA'));
const SetCA = React.lazy(() => import('./views/SetCA/SetCA'));

const Sponsors = React.lazy(() => import('./views/sponsors/Sponsors'));
const Pronites = React.lazy(() => import('./views/pronite/Pronite'));

const Alpha = React.lazy(() => import('./views/alpha/alphaView/LoginRegister'));
const Scan = React.lazy(() => import('./views/Scan/Scan'));

function App() {
  const [authToken, setAuthToken] = useState();
  const client = useApolloClient(authToken);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token && authToken) setAuthToken(null);
    if (token && !authToken) setAuthToken(token);
  }, [authToken]);

  const logMeOut = () => {
    window.localStorage.removeItem('token');
    setAuthToken(null);
  };

  const setToken = data => {
    window.localStorage.setItem('token', data);
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken, logMeOut }}>
      <ApolloProvider client={client}>
        <div className={styles.App}>
          <Suspense fallback={<Loader fill="#000000" />}>
            <Nav />
            <NotificationBar />
            <Switch>
              <Route exact path="/">
                <ParallaxProvider>
                  <Home />
                </ParallaxProvider>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/events">
                <Event />
              </Route>
              <Route exact path="/schedule">
                <Schedule />
              </Route>

              <Route exact path={['/events/:eventId', '/events/:eventId/:subEventId']}>
                <EventDetails />
              </Route>
              <Route exact path={['/login', '/register', '/forgotPassword', '/reset/:token']}>
                <LoginRegister />
              </Route>
              <Route exact path="/verify/:token">
                <Verify />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path={['/accomodation', '/accommodation']}>
                <Accomodation />
              </Route>
              <Route exact path="/passes">
                <PronitePasses />
              </Route>
              <Route exact path="/wastemanagement">
                <WasteManagement />
              </Route>
              <Route exact path="/alpha">
                <Alpha />
              </Route>
              <ProtectedRoute exact path="/dashboard">
                <Dashboard />
              </ProtectedRoute>
              <ProtectedRoute exact path="/ca">
                <CA />
              </ProtectedRoute>
              <ProtectedRoute path="/admin">
                <AdminDashboard />
              </ProtectedRoute>
              <Route exact path="/logout">
                <LogOut />
              </Route>
              <Route exact path="/sponsors">
                <Sponsors />
              </Route>
              <Route exact path="/pronites">
                <Pronites />
              </Route>
              <Route exact path="/faq">
                <Faq />
              </Route>
              <Route exact path="/setca/:id">
                <SetCA />
              </Route>
              <Route exact path="/scan">
                <Scan />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
