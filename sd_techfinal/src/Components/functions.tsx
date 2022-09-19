import React from 'react';
import * as ReactDOM from 'react-dom/client';
import MyAccount from './myAccount';
import Search from './Search';
import OrganizationSignUp from './SignUpOrganization';
import SignUpStudent from './SignUpStudent';
import Scholarship from './scholarship';
import ViewApplications from './viewApplications';
import UserSettings from './userSettings';
import Application from './application';
import SearchResults from './searchResults';
import MyApplications from './myApplications';
import MyScholarships from './myScholarships';

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

    const scholarship = () => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<Scholarship/>)
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

    const search = (companyID:number, value:number, major:string, gpa:number) => {
        let params:any = {'company':companyID, 'value':value, 'major':major, 'gpa':gpa}
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<SearchResults param={params}></SearchResults>)
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const navSearch = (input:string) => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<SearchResults param={input}></SearchResults>)
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const myAccount = () =>{
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<MyAccount/>) 
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const myApps = () =>{
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<MyApplications/>) 
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const myScholarships = () =>{
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<MyScholarships/>) 
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

    const viewApplications = (id:number) => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<ViewApplications id={id}/>)
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const newApp = (id:number) => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<Application id={id}/>)
        const dir2 = document.getElementById('directory2') as HTMLElement;
        if(dir2){
            dir2.style.display='none'
        }
    }

    const userSettings = () => {
        const dir = document.getElementById('directory') as HTMLElement;
        const content = ReactDOM.createRoot(dir);
        content.render(<UserSettings/>)
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
        scholarship:scholarship,
        viewApplications:viewApplications,
        userSettings: userSettings,
        newApp:newApp,
        search:search,
        navSearch:navSearch,
        myApps:myApps,
        myScholarships:myScholarships,
    }


}) ();
export default functions