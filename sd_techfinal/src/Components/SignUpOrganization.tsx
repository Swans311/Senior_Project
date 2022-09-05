import React from "react";
import * as ReactDOM from "react-dom/client";
import Search from './Search'
import organizationUser from "./OrganizationUser";
import { OrganizationUser } from "../model/OrganizationUser";
import SignUpStudent from "./SignUpStudent";
import User from "./User";
import { wait } from "@testing-library/user-event/dist/utils";


class OrganizationSignUp extends React.Component <any, any> {
    constructor(props:any){
        super(props);
        this.state = {
            email:'',
            acname:'',
            oname:'',
            taxID:'',
            password:'',
            repassword:'',
            isLoggedIn:'',
            userError:'',
            isSubmit:false,
            emailError:'',
            passError:'',
            repassError:'',
            acnameError:'Account Manager Name Req.',
            onameError:'Organization Name Req.',
            taxError:'Tax-ID must be 9 digits',
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
            if(name==='acname'){
                this.setState({'acname':value})
                validateInstant(values)
            }
            if(name==='oname'){
                this.setState({'oname':value})
                validateInstant(values)
            }
            if(name==='taxID'){
                this.setState({'taxID':value})
                validateInstant(values)
            }
            if(name==='repassword'){
                this.setState({'repassword':value})
                validateInstant(values)
            }
        }

        const validateInstant = (values:{name:string, value:string}) =>{
            let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(values.name === 'acname'){
                if(values.value.length > 5){
                    this.setState({'acnameError':''})
                }
                else{
                    this.setState({'acnameError':'Account Manager Name Req.'})
                    return
                }
            }
            if(values.name === 'oname'){
                if(values.value !== ''){
                    this.setState({'onameError':''})
                }
                else{
                    this.setState({'onameError':'Organization Name Req.'})
                    return
                }
            }
            if(values.name === 'taxID'){
                values.value = values.value.replace(/-/g, '')
                if(values.value.length !== 9){
                    this.setState({'taxError':'Tax ID format not correct'})
                }
                else if(parseInt(values.value).toString().length !== 9 ){ //checks for any letters in the string
                    this.setState({'taxError':values.value+' is not a valid number'})

                }
                else{
                    this.setState({'taxError':''})
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
            
            if(validateSubmit()) {
                this.setState({isSubmit:true})
                let state = {
                    email:this.state.email,
                    accountManager:this.state.acname,
                    organizationName:this.state.oname,
                    taxID:this.state.taxID,
                    password:this.state.password,
                }
                validateLogin(state)
            }
        }

        const validateLogin = async (orgUser:any) => {
            let usefulData:any;
            let organization = {
                'email':orgUser.email,
                'password':orgUser.password,
                'userType':'organization',
            }
            await fetch('http://localhost:8080/api/user', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(organization)
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                usefulData = {'id':res.response.insertId, 'response': res.response, 'error':res.error}
                if(!usefulData.error){
                    //set an error. email taken, choose another email or contact an admin for password assistance.
                    let myOrg = {
                        'id':usefulData.id,
                        'organizationName':orgUser.organizationName,
                        'accountManager':orgUser.accountManager,
                        'taxID':orgUser.taxID,
                    }
                    console.log(myOrg)
                    fetch('http://localhost:8080/api/userO', {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(myOrg)
                    }).then(res => res.json())
                    .then(async res => {
                        console.log(usefulData.id)
                            fetch('http://localhost:8080/api/userInfoO/'+usefulData.id+'', {
                            method:'GET',
                        }).then(res => res.json())
                        .then(res => {
                            let torf = true
                            User.setIsLoggedIn(torf)
                            User.setAnyUser(res.response[0])
                        })
                        await new Promise(f => setTimeout(f, 1000)).then(()=>directory());
                    })
                }else{
                    console.log(res.response)
                    this.setState({emailError:'Email used Contact an Admin to reset password or use a different email'})
                }
            })
            //do actual validation from backend here.
            //return true
        }

        const directory = () => {
            //probably just have this lead to the actual home page again?
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<Search></Search>)
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }

        const signUp = () => {
            //probably just have this lead to the actual home page again?
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<SignUpStudent/>)
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }

        const validateSubmit = () =>{
            
            if(this.state.emailError==='' && this.state.passError===''&&this.state.acnameError==='' && this.state.onameError==='' && this.state.taxError==='' && this.state.repassError==''){
                return true;
            }
            //all other instances return false
             return false   

        }

        return(
            <div className='directory'>
            <div className={'directory2'}>
                <h1>Create Organization Account</h1>
                <div id={'content'}></div>
                <form>
                    <div className={'form-group'}>
                        <label>Account Manager Name:</label>
                        <input type={'text'} className={'form-control'} placeholder={'Name'} name={'acname'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.acnameError}</p>
                    <div className={'form-group'}>
                        <label>Organization Name:</label>
                        <input type={'text'} className={'form-control'} placeholder={'Organization Name'} name={'oname'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.onameError}</p>
                    <div className={'form-group'}>
                        <label>Tax ID:</label>
                        <input type={'text'} maxLength={11} className={'form-control'} placeholder={'xxx-xx-xxxx'} name={'taxID'} onChange={handleChange}/>
                    </div>
                    <p>{this.state.taxError}</p>
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
                    <button type={'submit'} className={'btn btn-primary'} id={'login'} onClick={handleSubmit}>Login</button>
                </form>
                <a href='#' onClick={signUp}>Not an Organization? Student sign up here</a>
            </div>
            </div>
        )
    }
}

export default OrganizationSignUp