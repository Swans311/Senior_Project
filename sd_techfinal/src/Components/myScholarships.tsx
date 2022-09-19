import React from "react";
import functions from "./functions";
import MyAccountModal from "./myAccountModal";
import SDNav from "./NavBar";
import User from "./User";
import DataGrid from 'react-data-grid';
import vars from "./vars";

class MyScholarships extends React.Component<any, any, {param:any}> {
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

    componentDidMount = () => {
        let myInfo = User.getAnyUser();
        if(myInfo.userType === 'student'){
            fetch('http://localhost:8080/api/myApps/'+myInfo.studentID, {
                method:'GET',
            }).then(res => res.json())
            .then(res => {
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

        const modalOpen = (e:any) =>{
            if(modalAction === 'Delete'){
                this.setState({isOpen: !this.state.isOpen, modalValue:e.target.value, modalTitle:'Withdraw Application?'})
            }
            else{
                this.setState({isOpen: !this.state.isOpen, modalValue:e.target.value, modalTitle:'Close Scholarship'})
            }
        }

        let myInfo = User.getAnyUser();
        let accountName = '';
        let headers:any;
        let data:any;
        let action:any;
        let modalAction:any;
        if(myInfo.userType==='organization'){
            modalAction = 'Close'
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
                    model.closeBtn = <button className={'btn btn-danger'} value={model.id} onClick={modalOpen}>Close</button>
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
                <div className={'directory'}>
                    <h2>{accountName}'s Scholarships</h2>
                    <div className={'directory2'}>
                        {data ? (<DataGrid columns={headers} rows={data}></DataGrid>):''}
                        {this.state.isOpen? (<MyAccountModal open={this.state.isOpen} title={this.state.modalTitle} action={modalAction} data={this.state.modalValue} ></MyAccountModal>) : ''}
                    </div>
                </div>
            </div>
                
        );
    }


}

export default MyScholarships