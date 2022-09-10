import React from 'react';
import * as ReactDOM from 'react-dom/client';
import MyAccount from './myAccount';
import Search from './Search';
import OrganizationSignUp from './SignUpOrganization';
import SignUpStudent from './SignUpStudent';

//this file will serve to localize the re-routing functions for pages so that they do not need 
//to be created several thousand times (hyperbole)
//functions that use state variables can be implemented later as they are just using data passed to them, but for ease of time, I will skip that for now.

const functions = (function () {

    const signUp = () => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<SignUpStudent/>)
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const directory = () => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<Search></Search>)
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const myAccount = () =>{
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<MyAccount/>) //should redirect to home, but that has not yet been built
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const signUpO = () => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<OrganizationSignUp/>)
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }


    return {
        signUp:signUp,
        directory:directory,
        myAccount:myAccount,
        signUpO:signUpO,
    }


}) ();
export default functions