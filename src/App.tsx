import { Route, Routes } from 'react-router';

import MainPage from './pages/MainPage/MainPage';
import InformationPage from './pages/InformationPage/InformationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfileSettingsPage from './pages/ProfileSettingsPage/ProfileSettingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Alert from './components/Alert/Alert';
import { useAppDispatch, useAppSelector } from './hooks/useStore';
import { useEffect } from 'react';
import ProfileArticlesPage from './pages/ProfileArticle/ProfileArticlesPage';
import ProfileReactionsPage from './pages/ProfileReactions/ProfileReactionsPage';
import ProfileCommentsPage from './pages/ProfileCommentsPage/ProfileCommentsPage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import { getMyProfile } from './redux/slices/authSlice/api';

const App = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.app.alert);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/profile/:profileLogin?" element={<ProfilePage />} />
        <Route path="/profile/:profileLogin/articles" element={<ProfileArticlesPage />} />
        <Route path="/profile/:profileLogin/comments" element={<ProfileCommentsPage />} />
        <Route path="/profile/:profileLogin/reactions" element={<ProfileReactionsPage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/info" element={<InformationPage />} />
        <Route path="/info/privacy" element={<>Privacy</>} />
        <Route path="/info/terms" element={<>Terms</>} />
        <Route path="/info/site" element={<>Site</>} />
      </Routes>

      <Alert alert={alert} />
    </>
  );
};

export default App;
