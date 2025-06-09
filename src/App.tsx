import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router';

import MainPage from './pages/MainPage/MainPage';

import { auth, getNotifications } from './redux/reducers/authReducer';

interface DispatchProps {
  auth: () => void;
  getNotifications: () => void;
}

type AppProps = DispatchProps;

const App: React.FC<AppProps> = (props) => {
  props.auth();
  props.getNotifications();

  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/login" element={<h1></h1>}></Route>
    </Routes>
  );
};

export default connect(null, { auth, getNotifications })(App);
