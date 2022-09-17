import React from "react";
import * as ReactDOM from "react-dom/client";
import Search from './Search'
import SignUpStudent from "./SignUpStudent";
import studentUser from "./StudentUser";
import apis from "../api";
import User from "./User";
import SDNav from "./NavBar";
import functions from "./functions";

class Login extends React.Component <any, any> {
    constructor(props:any){
        super(props);
        this.state = {
            email:'',
            password:'',
            isLoggedIn:'',
            userError:'',
            isSubmit:false,
            emailError:'',
            passError:'',
            apiResponse:'',
        }
    };

    render(){

        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }

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
        }

        const validateInstant = (values:{name:string, value:string}) =>{
            let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
        }

        const handleSubmit = (e:{preventDefault : () => void; }) => {
            e.preventDefault();
            let state = {
                email:this.state.email,
                password:this.state.password,
            }
            if(validateSubmit(state)) {
                this.setState({isSubmit:true})
                validateLogin()
            }
        }

        const validateLogin = async () => {
            let usefulData:any;
            let checkUser = {email:this.state.email, password:this.state.password}
            await fetch('http://localhost:8080/api/userValidate', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(checkUser)
            }).then(res => res.json())
            .then(res => {
                if(res.response.length > 0){
                    usefulData = {id:res.response[0].id, userType:res.response[0].userType}
                    this.setState({apiResponse:usefulData})
                }
                else{
                    this.setState({emailError:'Login Invalid'})
                    return false;
                }
            })
            if(usefulData.userType === 'student'){
                //run an api call to get all student Data
                await fetch('http://localhost:8080/api/userInfoS/'+usefulData.id+'', {
                method:'GET',
            }).then(res => res.json())
            .then(res => {
                let torf = true
                User.setIsLoggedIn(torf)
                User.setAnyUser(res.response[0])
            })
            if(User.getIsLoggedIn() === true){
                await delay(1000);
                functions.directory()
            }
            }
            else if(usefulData.userType === 'organization'){
                //run api call to get all organization data
                await fetch('http://localhost:8080/api/userInfoO/'+usefulData.id+'', {
                method:'GET',
            }).then(res => res.json())
            .then(res => {
                let torf = true
                User.setIsLoggedIn(torf)
                User.setAnyUser(res.response[0])
            })
            if(User.getIsLoggedIn() === true){
                functions.directory()
            }
            }
            else{
                this.setState({emailError:'Login Invalid'})
                return false;
            }
            
            //@ts-ignore
            //let response = apis.validateUser(checkUser)
            //console.log(response)
            //@ts-ignore
            // if(response){
                
            //     //directory()

            // };
            //do actual validation from backend here.
            return true
        }





        const validateSubmit = (values:{email:string; password:string;}) =>{
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
            }
            if(this.state.emailError==='' && this.state.passError===''){
                return true;
            }
            //all other instances return false
             return false   

        }


        return(
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
            <div className={'directory'} style={{width:'100%'}}>
                <h1>Login</h1>
                <div id={'content'}>
                <form>
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
                    <button type={'submit'} className={'btn btn-primary'} id={'login'} onClick={handleSubmit}>Login</button>
                </form>
                <a href='#' onClick={functions.signUp}>No Account? Sign up Here.</a>
                </div>
            </div>
            </div>
        )
    }
}

export default Login