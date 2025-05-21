import React from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router'

import MainPage from './pages/MainPage/MainPage'

import { auth } from './redux/reducers/authReducer'


interface DispatchProps {
    auth: () => void
}

type AppProps = DispatchProps

const App: React.FC<AppProps> = (props) => {
    props.auth()
    
    return (
        <Routes>
            <Route path='/' element={<MainPage />}></Route>
        </Routes>
    )
}

export default connect(null, {auth})(App)