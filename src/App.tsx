import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router';

import Alert from '@mui/material/Alert';
import MainPage from './pages/MainPage/MainPage';

import { auth, getNotifications } from './redux/reducers/authReducer';
import { AppStateType } from './redux';
import { AlertType } from './redux/types/alertType';

interface StateProps {
  alert: AlertType;
}

interface DispatchProps {
  auth: () => void;
  getNotifications: () => void;
}

type AppProps = StateProps & DispatchProps;

const App: React.FC<AppProps> = ({ auth, getNotifications, alert }) => {
  useEffect(() => {
    auth();
    getNotifications();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<h1></h1>}></Route>
      </Routes>
      {alert.isExists && (
        <div className="alert">
          <Alert severity={alert.type}>
            {alert.content} {alert.status ? `(${alert.status})` : ''}
          </Alert>
        </div>
      )}
    </>
  );
};

const mapState = (state: AppStateType) => {
  return {
    alert: state.app.alert,
  };
};

export default connect(mapState, { auth, getNotifications })(App);
