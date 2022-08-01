import React from 'react';
import './App.css';
import Search from './Components/Search';
import Login from './Components/Login';
import SignUpStudent from './Components/SignUpStudent';
import OrganizationSignUp from './Components/SignUpOrganization';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div className="container">
            <div className='directory' id='directory'>
                <OrganizationSignUp/>
            </div>
        </div>
    );
}

export default App;
