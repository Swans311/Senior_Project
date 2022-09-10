import { userInfo } from "os";
import React from "react";
import Select from 'react-select';
import SDNav from "./NavBar";
import studentUser from "./StudentUser";
import User from "./User";

class myApplications extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            company:'',
            value:'',
            isLoggedIn:'',
            userError:'',
            isSubmit:false,
            emailError:'',
            passError:'',
        }
    };

    render() {
        let myInfo = User.getAnyUser();
        let accountName = '';
        if(myInfo.userType === 'student'){
            accountName = myInfo.fname + ' '+myInfo.lname;
        } else {
            accountName = myInfo.organizationName;
        }
        
        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
                <div className={'directory2'}>
                    <h2>{accountName}</h2>
                </div>
            </div>
                
        );
    }


}

export default myApplications