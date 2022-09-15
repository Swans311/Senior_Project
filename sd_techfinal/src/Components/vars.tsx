import React from 'react';
import * as ReactDOM from 'react-dom/client';
import MyAccount from './myAccount';
import Search from './Search';
import OrganizationSignUp from './SignUpOrganization';
import SignUpStudent from './SignUpStudent';

//this file will serve to localize the re-routing functions for pages so that they do not need 
//to be created several thousand times (hyperbole)
//functions that use state variables can be implemented later as they are just using data passed to them, but for ease of time, I will skip that for now.

const vars = (function () {

    let headerStudent = [
        {key: 'companyName', name: 'Company'},
        {key:'value', name:'Value $'},
        {key:'major',name:'Major'},
        {key:'description', name:'Description'},
        {key:'isOpen', name:'Still Open'},
        {key:'winner', name:'Winner?'},
        {key:'withdrawBtn', name:'Withdraw?'},
    ]

    const getHeaderStudent = () => {
        return headerStudent
    }

    const viewAppsHeader = [
        {key:'name', name:'Student Name'},
        {key:'major', name:'Major'},
        {key:'gpa', name:'GPA'},
        {key:'ethnicity', name:'Ethnicity'},
        {key:'expandBtn', name:'Expand'},
    ]
    const getViewAppHeader = () => {
        return viewAppsHeader;
    }

    let headerOrganization =  [
        {key: 'companyName', name: 'Company'},
        {key: 'description', name: 'Description'},
        {key: 'ethnicity', name: 'Ethnicity'},
        {key: 'major', name: 'Major'},
        {key: 'value', name: 'Value'},
        {key: 'isOpen', name: 'Open'},
        {key:'viewBtn', name:'View Applications'},
        {key:'closeBtn', name:''}

    ]

    const getHeaderOrganization = () => {
        return headerOrganization;
    }

    


    return {
        getHeaderStudent: getHeaderStudent,
        getHeaderOrganization:getHeaderOrganization,
        getViewAppHeader:getViewAppHeader,
        //something:something
    }


}) ();
export default vars