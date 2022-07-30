import React from 'react';
import './App.css';
import Search from './Components/Search';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div className="container">
            <div className='directory' id='directory'>
                <Login></Login>
            </div>
        </div>
    );
}

export default App;
