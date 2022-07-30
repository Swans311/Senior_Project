import React from "react";

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
                if(validateLogin()){
                    //go to home page.
                }
            }
        }

        const validateLogin = () => {
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
                return true
            }
             return false   

        }

        return(
            <div>
                <h1>Login</h1>
                <p>{this.state.userError}</p>
                <div id={'content'}></div>
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
            </div>
        )
    }
}

export default Login