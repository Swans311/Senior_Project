import React from "react";
import SDNav from "./NavBar";
import User from "./User";

class myAccount extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            scholarships : '', //this should get populated via an api call after the user type is determined
            applications:'', //^^^ could even use the same var, but to make things easier, using different naming conventions would make things easier.
        }
    };

    render() {
        let myInfo = User.getAnyUser();
        let accountName = '';
        if(myInfo.userType === 'student'){
            accountName = myInfo.fname + ' '+myInfo.lname;
        } else {
            accountName = myInfo.companyName;
        }
        
        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
                <div className={'directory'} style={{width:'100%'}}>
                    <h3>{accountName}</h3>
                    {myInfo.userType === 'organization' ? (<label>Account Manager: {myInfo.accountManager}</label>) : ''}
                        <div id={'content'}>
                            <div style={{float:'right'}}>
                                <label><i className="bi bi-gear"></i> Settings</label>                            </div>
                            <div>
                                <h5>My Applications/Scholarships</h5>
                                <hr/>
                            </div>
                            <div>
                                <h5>Something?</h5>
                            </div>
                            <p>Here I want to install options to add in options to view specific scholarships here that have been posted by this specific company</p>
                            <p>I also want to add in a settings button to add in the option to view/change your account info</p>
                            <p>there should also be an option for organizations to post scholarships directly from this page, but maybe also from the nav bar?</p>
                        </div>
                    </div>
            </div>
                
        );
    }


}

export default myAccount