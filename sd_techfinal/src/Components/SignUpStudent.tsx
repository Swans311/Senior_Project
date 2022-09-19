import React from "react";
import * as ReactDOM from "react-dom/client";
import Search from './Search'
import studentUser from './StudentUser'
import { StudentUser } from "../model/StudentUser";
import OrganizationSignUp from "./SignUpOrganization";
import User from "./User";
import functions from "./functions";
import SDNav from "./NavBar";

class SignUpStudent extends React.Component <any, any> {
    constructor(props:any){
        super(props);
        this.state = {
            email:'',
            fname:'',
            lname:'',
            password:'',
            repassword:'',
            isLoggedIn:'',
            userError:'',
            isSubmit:false,
            emailError:'Email Required',
            passError:'Password Required',
            repassError:'',
            fnameError:'First Name Required',
            lnameError:'Last Name Required',
        }
    };

    render(){

        const handleChange = (event:any) =>{
            const {name,value} = event.target;
            let values = {name,value}
            if(name==='email'){
                this.setState({'email':value})
                validateInstant(values)
            }
            if(name==='password'){
                this.setState({'password':value})
                validateInstant(values)
            }
            if(name==='fname'){
                this.setState({'fname':value})
                validateInstant(values)
            }
            if(name==='lname'){
                this.setState({'lname':value})
                validateInstant(values)
            }
            if(name==='repassword'){
                this.setState({'repassword':value})
                validateInstant(values)
            }
        }

        const validateInstant = (values:{name:string, value:string}) =>{
            let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(values.name === 'fname'){
                if(values.value !== ''){
                    this.setState({'fnameError':''})
                }
                else{
                    this.setState({'fnameError':'First Name Must be entered'})
                    return
                }
            }
            if(values.name === 'lname'){
                if(values.value !== ''){
                    this.setState({'lnameError':''})
                }
                else{
                    this.setState({'lnameError':'Last Name Must be entered'})
                    return
                }
            }
            
            if (values.name === 'email'){
                if(values.value.match(regexp)){
                    this.setState({'emailError':''})
                }
                else{
                    this.setState({'emailError':'Email Invalid'})
                    return
                }
            }
            if(values.name==='password'){
                if(values.value.length>=6){
                    this.setState({'passError':''})
                }
                else{
                    this.setState({'passError':'Password Length Requirement not met'})
                    return
                }
            }
            if(values.name === 'repassword'){
                if(values.value === this.state.password){
                    this.setState({'repassError':''})
                }
                else{
                    this.setState({'repassError':'Passwords must match'})
                    return
                }
            }
        }

        const handleSubmit = (e:{preventDefault : () => void; }) => {
            e.preventDefault();
            let state = {
                email:this.state.email,
                password:this.state.password,
                fname:this.state.fname,
                lname:this.state.lname,
                repass:this.state.repassword,
            }
            if(validateSubmit(state)) {
                this.setState({isSubmit:true})
                //this currently redirects to the search page.
                let newStudent : StudentUser = {
                    fname:this.state.fname,
                    lname: this.state.lname,
                    email: this.state.email,
                    password: this.state.password,
                    isLoggedIn : true
                }
                validateLogin(newStudent)
            }
        }

        const validateLogin = async (studentUser:any) => {
            let usefulData:any;
            let student ={
                'email':studentUser.email,
                'password':studentUser.password,
                'userType':'student',
            }
            //the below API call creates the general user.
            await fetch('http://localhost:8080/api/user', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(student)
            }).then(res => res.json())
            .then(res => {
                usefulData = {'id':res.response.insertId, 'response': res.response, 'error':res.error}
                if(!usefulData.error){
                    //set an error. email taken, choose another email or contact an admin for password assistance.
                    let myStudent = {
                        'id':usefulData.id,
                        'fname':studentUser.fname,
                        'lname':studentUser.lname,
                    }
                    fetch('http://localhost:8080/api/userS', {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(myStudent)
                    }).then(res => res.json())
                    .then(res => {
                            fetch('http://localhost:8080/api/userInfoS/'+usefulData.id+'', {
                            method:'GET',
                        }).then(res => res.json())
                        .then(res => {
                            let torf = true
                            User.setIsLoggedIn(torf)
                            User.setAnyUser(res.response[0])
                        })
                            functions.directory()
                    })
                }else{
                    this.setState({emailError:'Email used Contact an Admin to reset password or use a different email'})
                }
            })
            
        }





        const validateSubmit = (values:{email:string; password:string; fname:string, lname:string, repass:string}) =>{
            let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(values.email.length>0 && values.password.length>0){
                if(values.email.match(regexp)){
                    this.setState({'emailError':''})
                }
                else{
                    this.setState({'emailError':'Email Invalid'})
                }
                
                if(values.password.length>=6){
                    this.setState({'passError':''})
                }
                else{
                    this.setState({'passError':'Password Length Requirement not met'})
                }
                if(values.password !== values.repass){
                    this.setState({'passError':'Passwords do not match', 'repassError':'Passwords do not match'})
                }
                else{
                    this.setState({'passError':'', 'repassError':''})
                }
            }
            if(this.state.emailError==='' && this.state.passError===''&&this.state.fnameError==='' && this.state.lnameError==='' && this.state.repassError===''){
                return true;
            }
            //all other instances return false
             return false   

        }

        return(
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
            <div className={'directory'} style={{width:'100%'}}>
            <div className={'directory2'}>
                <h1>Student Sign Up</h1>
                <div id={'content'}></div>
                <form>
                    <div className={'form-group'}>
                        <label>First Name:</label>
                        <input type={'text'} className={'form-control'} placeholder={'First Name'} name={'fname'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.fnameError}</p>
                    <div className={'form-group'}>
                        <label>Last Name:</label>
                        <input type={'text'} className={'form-control'} placeholder={'Last Name'} name={'lname'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.lnameError}</p>
                    <div className={'form-group'}>
                        <label>Email:</label>
                        <input type={'email'} className={'form-control'} placeholder={'email@email.com'} name={'email'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.emailError}</p>
                    <div className={'form-group'}>
                        <label>Password:</label>
                        <input type={'password'} className={'form-control'} placeholder={'Password'} name={'password'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.passError}</p>
                    <div className={'form-group'}>
                        <label>Re-enter Password:</label>
                        <input type={'password'} className={'form-control'} placeholder={'Password'} name={'repassword'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.repassError}</p>
                    <button type={'submit'} className={'btn btn-primary'} id={'login'} onClick={handleSubmit}>Create Account</button>
                </form>
                <a href='#' onClick={functions.signUpO}>Not a student? Organization Sign Up Here</a>
            </div>
            </div>
            </div>
        )
    }
}

export default SignUpStudent