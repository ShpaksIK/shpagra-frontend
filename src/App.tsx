import { Route, Routes } from 'react-router';

import MainPage from './pages/MainPage/MainPage';
import InformationPage from './pages/InformationPage/InformationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfileSettingsPage from './pages/ProfileSettingsPage/ProfileSettingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Alert from './components/Alert/Alert';
import { useAppDispatch, useAppSelector } from './hooks/useStore';
import { getProfile } from './redux/slices/profileSlice/api';
import { useEffect } from 'react';
import ProfileArticlesPage from './pages/ProfileArticle/ProfileArticlesPage';
import ProfileReactionsPage from './pages/ProfileReactions/ProfileReactionsPage';
import ProfileCommentsPage from './pages/ProfileCommentsPage/ProfileCommentsPage';

const App = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.app.alert);

  useEffect(() => {
    dispatch(getProfile('test'));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/info" element={<InformationPage />} />
        <Route path="/profile/:profileId?" element={<ProfilePage />} />
        <Route path="/profile/:profileId/articles" element={<ProfileArticlesPage />} />
        <Route path="/profile/:profileId/comments" element={<ProfileCommentsPage />} />
        <Route path="/profile/:profileId/reactions" element={<ProfileReactionsPage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/info/privacy" element={<>Privacy</>} />
        <Route path="/info/terms" element={<>Terms</>} />
        <Route path="/info/site" element={<>Site</>} />
      </Routes>

      <Alert alert={alert} />
    </>
  );
};

export default App;
