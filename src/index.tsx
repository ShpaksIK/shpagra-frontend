import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'

import App from './App'

import store from './redux/index'
import './../public/styles/normalize.css'
import './../public/styles/initialize.scss'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)