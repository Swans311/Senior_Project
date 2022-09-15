import { userInfo } from "os";
import React from "react";
import functions from "./functions";
import SDNav from "./NavBar";
import User from "./User";

class UserSettings extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            name1:'', //first name / company name
            name2:'', //last name / account owner name
            isLoggedIn:'',
            num1:0, //this will be used for the GPA or the tax ID
            isSubmit:false,
            gpa:0,
            major:'',
            ethnicity:'',
            gender:'',
        }
    };

    componentDidMount = () => {
        let userInfo = User.getAnyUser();
        console.log(userInfo)
        if(userInfo.userType === 'student'){
            this.setState({name1:userInfo.fname, name2:userInfo.lname, num1: userInfo.gpa, ethnicity:userInfo.ethnicity, gender:userInfo.gender, major:userInfo.major});
        } else{
            this.setState({name1:userInfo.companyName, name2:userInfo.accountManager, num1:userInfo.taxID});
        }
    }

    render() {
        //const scholarshipID = this.props.scholarshipID; //call to API? should also pass the actual scholarship through the search page onClick Event
        const userInfo = User.getAnyUser()
        let name1:any='';
        let name2:any='';
        let num1:any=''
        if(userInfo.userType === 'student'){
            name1 = 'First Name';
            name2 = 'Last Name';
            num1='GPA';
            //this.setState({'userName':userName});
        } else{
            name1='Company Name';
            name2='Account Manager';
            num1='Tax ID'
            //functions.directory();
        }

        const handleChange = (event:any) =>{
            const {name,value} = event.target;
            let values = {name,value}
            if(name==='name'){
                this.setState({'userName':value, errName:''})
                validateInstant(values)
            }
            if(name==='gpa'){
                this.setState({'gpa':value, errGPA:''})
                validateInstant(values)
            }
            if(name==='major'){
                this.setState({'major':value, errMajor:''})
                validateInstant(values)
            }
            if(name==='essay'){
                this.setState({'essay':value, errEssay:''})
                validateInstant(values)
            }

        }

        const validateInstant = (values:any) => {
            if(values.name==='name'){
                if(values.value !== ''){
                    this.setState({ errName:''})
                } else{
                    this.setState({ errName:'Name Must Have Value'})
                }
            }
            if(values.name==='gpa'){
                if(values.value !== ''){
                    this.setState({ errGPA:''})
                } else{
                    this.setState({ errGPA:'Enter Current GPA'})
                }
                //validateInstant(values)
            }
            if(values.name==='major'){
                this.setState({ errMajor:''})
                //validateInstant(values)
            }
            if(values.name==='essay'){
                this.setState({ errEssay:''})
                //validateInstant(values)
            }
        }
        const validateSubmit = () =>{
            
            if(this.state.errEssay==='' && this.state.errGPA===''&&this.state.errMajor==='' && this.state.errName==='' ){
                return true;
            }
            //all other instances return false
             return false   

        }

        const handleSubmit = (e:{preventDefault : () => void; }) => {
            e.preventDefault();
            if(validateSubmit()) {
                this.setState({isSubmit:true})
                //this currently redirects to the search page.
                //call API to submit application, await async function before moving back to search page.
            }
        }



        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
            <div className={'directory2'}>
                <form>
                    <div className={'row justify-content-md-center'}>
                        <div className={'col-md-auto'} >
                            <label >{name1}</label><br/>
                            <input className={'form-control'} type={'text'} placeholder={name1} name={'name1'} value={this.state.name1} onChange={handleChange}/>
                            <p>{this.state.errName}</p>
                        </div>
                        <div className={'col-md-auto'} >
                            <label>{name2}</label><br/>
                            <input className={'form-control'} type={'text'} name={'name2'} placeholder={name2} value={this.state.name2} onChange={handleChange}/>
                            <p>{this.state.errGPA}</p>
                        </div>
                        {userInfo.userType === 'student' ? (<div className={'col-md-auto'} >
                            <label >GPA</label><br/>
                            <input className={'form-control'} type={'number'} min={0} max={4} placeholder={num1} name={num1} value={this.state.num1} onChange={handleChange}/>
                            <p>{this.state.errName}</p>
                        </div>) : (<div className={'col-md-auto'} >
                            <label >Tax ID</label><br/>
                            <input className={'form-control'} type={'number'} maxLength={9} placeholder={num1} name={num1} value={this.state.num1} onChange={handleChange}/>
                            <p>{this.state.errName}</p>
                        </div>)}
                        
                    </div>

                    {userInfo.userType === 'student' ? (<div className={'row justify-content-md-center'}>
                        <div className={'col-md-auto'} >
                            <label >Major</label><br/>
                            <input className={'form-control'} type={'text'} placeholder={'Major'} name={'major'} value={this.state.major} onChange={handleChange}/>
                            <p>{this.state.errMajor}</p>
                        </div>
                        <div className={'col-md-auto'} >
                            <label>Gender</label><br/>
                            <input className={'form-control'} type={'text'} name={'name2'} placeholder={'Gender'} value={this.state.name2} onChange={handleChange}/>
                            <p>{this.state.errGPA}</p>
                        </div>
                    </div>) : ''}
                    <input type={'submit'} className={'btn btn-success'} onClick = {handleSubmit} style={{margin:'auto'}} />
                </form>
            </div>
            </div>
        );
    }


}

export default UserSettings