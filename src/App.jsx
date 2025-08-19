
import './assets/style/main.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToysIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { User } from './pages/User.jsx'
import './services/i18.js'



export default function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToysIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<User />} path="/user" />
                            <Route element={<UserDetails />} path="/user/:userId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>

    )
}


