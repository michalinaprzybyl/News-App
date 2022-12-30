import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginPage from './components/LoginPage/LoginPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './helpers/firebaseConfig';
import UserPage from './components/UserPage/UserPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false); // false bo na pocz user nie jest zalogowany

    onAuthStateChanged(auth, (user) => {    // ta f. będzie pilnowała stanu zalogowania już w całej apce
        if (user) {
            // console.log(user);
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar loggedIn={loggedIn} />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/user' element={<UserPage loggedIn={loggedIn} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
