import React from 'react';
import './App.css';
import Search from './Components/Search';
import Login from './Components/Login';
import SignUpStudent from './Components/SignUpStudent';
import OrganizationSignUp from './Components/SignUpOrganization';
import SDNav from './Components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div className={'bodyApp'} style={{width:'100%',height:'100%'}}>
            <div className="container">
                <div className='directory' id='directory'>
                    <Search/>
                </div>
            </div>
        </div>
        
    );
}

export default App;
