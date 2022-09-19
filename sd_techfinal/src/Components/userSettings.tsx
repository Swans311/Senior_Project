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
            major:'',
            ethnicity:'',
            gender:'',
            errName1:'',
            errName2:'',
            errNum1:'',
        }
    };

    componentDidMount = () => {
        let userInfo = User.getAnyUser();
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
            if(name==='name1'){
                this.setState({'name1':value, errName:''})
                validateInstant(values)
            }
            if(name==='gpa'){
                this.setState({'gpa':value})
            }
            if(name==='major'){
                this.setState({'major':value})
            }
            if(name==='gender'){
                this.setState({'gender':value})
            }
            if(name==='name2'){
                this.setState({'name2':value, errName2:''})
                validateInstant(values);
            }
            if(name === 'num1'){
                this.setState({'num1':value})
                validateInstant(values);
            }

        }

        const validateInstant = (values:any) => {
            if(values.name==='name1'){
                if(values.value !== ''){
                    this.setState({ errName1:''})
                } else{
                    this.setState({ errName1:name1+' Must Have Value'})
                }
            }
            if(values.name==='name2'){
                if(values.value !== ''){
                    this.setState({ errName2:''})
                } else{
                    this.setState({ errName2:name2+' Must Have Value'})
                }
            }
            if(values.name==='num1'){
                if(values.value !== ''){
                    this.setState({ errNum1:''})
                } else{
                    this.setState({ errNum1:num1+' Must Have Value'})
                }
            }
        }
        const validateSubmit = () =>{
            
            if(this.state.errName1==='' && this.state.errName2==='' && this.state.errNum1 === ''){
                return true;
            }
            //all other instances return false
             return false   

        }

        const pushToDBStudent = async () => {
            let newInfo = {
                'id':userInfo.studentID,
                'fname':this.state.name1,
                'lname':this.state.name2,
                'major':this.state.major,
                'gpa':this.state.num1,
                'ethnicity':this.state.ethnicity,
                'gender':this.state.gender,
            }
            fetch('http://localhost:8080/api/updateStudent', {
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                }, body:JSON.stringify(newInfo)
            }).then(res => res.json())
            .then(res => {
                functions.myAccount()
                //this.setState({myScholarships:res.response})
            })
        }
        const pushToDBOrg = async() => {
            let newInfo = {
                'id':userInfo.organizationID,
                'companyName':this.state.name1,
                'accountManager':this.state.name2,
                'taxID':this.state.num1,
            }
            fetch('http://localhost:8080/api/updateOrg', {
                method:'PUT',
                headers : {
                    'Content-type':'application/json'
                },
                body:JSON.stringify(newInfo)
            }).then(res => res.json())
            .then(res => {
                functions.myAccount();
            })
        }

        const handleSubmit = (e:{preventDefault : () => void; }) => {
            e.preventDefault();
            if(validateSubmit()) {
                this.setState({isSubmit:true})
                if(userInfo.userType === 'student'){
                    pushToDBStudent()

                }else{
                    pushToDBOrg()
                }
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
                            <p>{this.state.errName1}</p>
                        </div>
                        <div className={'col-md-auto'} >
                            <label>{name2}</label><br/>
                            <input className={'form-control'} type={'text'} name={'name2'} placeholder={name2} value={this.state.name2} onChange={handleChange}/>
                            <p>{this.state.errName2}</p>
                        </div>
                        {userInfo.userType === 'student' ? (<div className={'col-md-auto'} >
                            <label >{num1}</label><br/>
                            <input className={'form-control'} type={'number'} step={0.01} min={0} max={4} placeholder={num1} name={'num1'} value={this.state.num1} onChange={handleChange}/>
                            <p>{this.state.errNum1}</p>
                        </div>) : (<div className={'col-md-auto'} >
                            <label >{num1}</label><br/>
                            <input className={'form-control'} type={'number'} maxLength={9} placeholder={num1} name={'num1'} value={this.state.num1} onChange={handleChange}/>
                            <p>{this.state.errNum1}</p>
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
                            <input className={'form-control'} type={'text'} name={'gender'} placeholder={'Gender'} value={this.state.gender} onChange={handleChange}/>
                        </div>
                    </div>) : ''}
                    <input type={'submit'} className={'btn btn-success'} onClick = {handleSubmit} style={{margin:'auto'}} />
                    <p>Any changes will reflect on next login.</p>
                </form>
            </div>
            </div>
        );
    }


}

export default UserSettings