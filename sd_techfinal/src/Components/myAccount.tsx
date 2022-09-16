import React from "react";
import functions from "./functions";
import SDNav from "./NavBar";
import User from "./User";
import DataGrid from 'react-data-grid';
import vars from "./vars";

class myAccount extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            myApps:[],
            myScholarships:[],
        }
    };

    componentDidMount = () => {
        let myInfo = User.getAnyUser();
        if(myInfo.userType === 'student'){
            fetch('http://localhost:8080/api/myApps/'+myInfo.studentID, {
                method:'GET',
            }).then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({myApps:res.response})
            })
        }else{
            fetch('http://localhost:8080/api/scholarshipsByID/'+myInfo.organizationID, {
                method:'GET',
            }).then(res => res.json())
            .then(res => {
                this.setState({myScholarships:res.response})
            })
        }
        
    }

    render() {
        let myInfo = User.getAnyUser();
        let accountName = '';
        let headers:any;
        let data:any;
        let action:any;
        if(myInfo.userType === 'student'){
            action='View My Applications';
            accountName = myInfo.fname + ' '+myInfo.lname;
            headers = vars.getHeaderStudent()
            if(this.state.myApps){
                data=this.state.myApps.map((e:any)=>{
                    let model:any={};
                    model.companyName = e.companyName;
                    model.title=e.title;
                    model.value=e.value;
                    model.major=e.major;
                    model.description = e.description;
                    if(e.isOpen.data[0] === false){
                        model.isOpen = 'Closed'
                    }else{
                        model.isOpen = 'Open'
                    }
                    if(!e.winner) {
                        if(e.winner === false){
                            model.winner = 'Not Selected'
                        }
                        model.winner = 'No Status'
                    }else{
                        model.winner = 'WINNER';
                    }
                    model.withdrawBtn = <button className={'btn btn-outline-danger'} onClick={() => console.log('pop up modal for deleting this application')}>Withdraw</button>
                    return model;
                })
            }
        } else {
            action = 'Manage Scholarships'
            accountName = myInfo.companyName;
            headers = vars.getHeaderOrganization();
            if(this.state.myScholarships){
                //I want to add two buttons to view scholarships and one to close scholarships from this page.
                data = this.state.myScholarships.map((e:any) => {
                let model:any={};
                model.id=e.id;
                model.title=e.title;
                model.companyName = e.companyName;
                model.description = e.description;
                model.ethnicity = e.ethnicity;
                model.major = e.major;
                model.value = e.value;
                //add an if isOpen so we don't just show 0 or 1
                model.isOpen = e.isOpen.data[0];
                if(model.isOpen){
                    model.closeBtn = <button className={'btn btn-danger'} onClick={()=>console.log("popup modal for delete this scholarship")}>Close</button>
                }
                else {
                    model.closeBtn = ''
                }
                model.viewBtn = <button className={'btn btn-outline-success'} onClick={() => functions.viewApplications(model.id)}>View</button>
                return model;
            })
            }
            
        }
        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
                <div className={'directory'} style={{width:'100%'}}>
                    <h3>{accountName}</h3>
                    <div style={{float:'right'}}>
                        <a href='#' className='btn btn-outline-dark' onClick={functions.userSettings}><i className="bi bi-gear"></i> Settings</a>                            </div>
                    <div>
                    {myInfo.userType === 'organization' ? (<label>Account Manager: {myInfo.accountManager}</label>) : ''}
                        
                        <div id={'content'}>
                            <div>
                                {/* This should be defined by what user type the user */}
                                <h5>{action}</h5>
                                <div>
                                    <p/>
                                    {data ? (<DataGrid columns={headers} rows={data}></DataGrid>):''}
                                </div>
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
                    {myInfo.userType === 'organization' ? (<div><button className='btn btn-success' onClick={functions.scholarship} ><i className="bi bi-plus-circle"></i> Create New Scholarship</button></div>) : ''}
            </div>
            </div>
                
        );
    }


}

export default myAccount