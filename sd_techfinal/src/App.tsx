import React from 'react';
import './App.css';
import Search from './Components/Search';
import Login from './Components/Login';
import SignUpStudent from './Components/SignUpStudent';
import OrganizationSignUp from './Components/SignUpOrganization';
import SDNav from './Components/NavBar';
import Application from './Components/application';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import Scholarship from './Components/scholarship';
import SearchResults from './Components/searchResults';
import ScholarshipDiv from './Components/scholarshipDiv';

function App() {
    return (
        <div className={'bodyApp'} style={{width:'100%',height:'150%'}}>
            <div className="container" id='directory'>
                <Search/>
                {/* <Application scholarshipID={1}/> */}
            </div>
        </div>
        
    );
}

export default App;
