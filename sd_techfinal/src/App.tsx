import React from 'react';
import './App.css';
import Search from './Components/Search';
import Login from './Components/Login';
import SignUpStudent from './Components/SignUpStudent';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div className="container">
            <div className='directory' id='directory'>
                <SignUpStudent/>
            </div>
        </div>
    );
}

export default App;
