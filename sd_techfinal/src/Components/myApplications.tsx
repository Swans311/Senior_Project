import React from "react";
import MyAccountModal from "./myAccountModal";
import SDNav from "./NavBar";
import User from "./User";
import vars from "./vars";
import DataGrid from 'react-data-grid';

class MyApplications extends React.Component<any, any, {param:any}> {
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
        if(myInfo.userType === 'student'){
            modalAction='Delete'
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
                        
                        model.winner = 'No Status'
                        model.withdrawBtn = <button className={'btn btn-outline-danger'} value={e.appID} onClick={modalOpen}>Withdraw</button>
                    }else if(e.winner.data[0] === 0){
                        model.winner = 'Not Selected'
                    }else{
                        model.winner = 'WINNER';
                    }
                    return model;
                })
            }
        } 
        
        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
                <div className={'directory'} style={{width:'100%'}}>
                    <h2>{accountName}'s Applications</h2>
                    <div className={'directory2'}>
                        {data ? (<DataGrid columns={headers} rows={data}></DataGrid>):''}
                        {this.state.isOpen? (<MyAccountModal open={this.state.isOpen} title={this.state.modalTitle} action={modalAction} data={this.state.modalValue} ></MyAccountModal>) : ''}
                    </div>
                </div>
            </div>
                
        );
    }


}

export default MyApplications