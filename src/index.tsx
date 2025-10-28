import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './../public/style/normalize.css';
import './../public/style/initialize.scss';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './../redux/index.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
