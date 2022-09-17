import React from "react";
import * as ReactDOM from 'react-dom/client';
import functions from "./functions";
import SDNav from "./NavBar";
import User from "./User";
import DataGrid from 'react-data-grid';
import vars from "./vars";
import PopUpModal from './popUpModal';

class ViewApplications extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            applications:[],
            myScholarship:{},
            isOpen:false,
            modalValue:[],
            modalTitle:'',
        }
    };

    componentDidMount = () => {
        let myInfo = User.getAnyUser();
        
            fetch('http://localhost:8080/api/studentAppInfo/'+this.props.id, {
                method:'GET',
            }).then(res => res.json())
            .then(res => {
                this.setState({applications:res.response})
            })
        
            fetch('http://localhost:8080/api/getScholarship/'+this.props.id, {
                method:'GET',
            }).then(res => res.json())
            .then(res => {
                this.setState({myScholarship:res.response[0]})
            })
        
        
    }

   

    render() {
        let open = false;
        const setIsOpen = (e:any) => {
            if(e.target.value === 'reject'){
                this.setState({isOpen:!this.state.isOpen,modalValue:e.target.value, modalTitle:'Reject all Remaining Applications.'})
            }else if(e.target.value){
                let passable = e.target.value.split(',')
                this.setState({isOpen:!this.state.isOpen, modalValue:passable, modalTitle:'Reviewing Application'})
            }
        }

        const setModal = () => {
            open = !open;
            return open;
        }

        //let scholarshipID = this.props.id;
        let myInfo = User.getAnyUser();
        let accountName = '';
        let headers:any;
        let data:any;
        accountName = myInfo.companyName;
        headers = vars.getViewAppHeader();
        if(this.state.applications){
            //I want to add two buttons to view scholarships and one to close scholarships from this page.
            data = this.state.applications.map((e:any) => {
                
            let model:any=e;
            model.name = e.fname + ' '+ e.lname
            //CREATE POP UP MODAL HERE...
            //[model.name, model.gpa, model.ethnicity, model.major, model.email, model.essay]
            let passable=[
                model.name, model.major, model.gpa, model.gender, model.ethnicity, model.essay, model.id
            ]
            if(e.winner.data[0] === 0){ //to not return people already rejected
                model.expandBtn = 'Rejected'
            }else if(e.winner.data[0] === 1){
                model.expandBtn = 'Winner'
            }else{
                model.expandBtn = <button className={'btn btn-outline-success'} onClick={setIsOpen} name={'model'} value={passable}>More...</button>
            }

            return model;
        })
            
        }
        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
                <div className={'directory'} style={{width:'100%'}}>
                    <h3>VIEW APPLICATIONS</h3>
                    <div style={{float:'right'}}>
                        <a href='#' className='btn btn-outline-dark' onClick={functions.directory}><i className="bi bi-gear"></i> Settings</a>                            </div>
                    <div>
                        
                        <div id={'content'}>
                            <div>
                                {/* This should be defined by what user type the user */}
                                <h5>Applications for: <span style={{textDecoration:'underline'}}>{this.state.myScholarship.title}</span></h5>
                                <div>
                                    <p></p>
                                    {data ? (<DataGrid columns={headers} rows={data}></DataGrid>):''}
                                    {this.state.isOpen? (<PopUpModal open={this.state.isOpen} title={this.state.modalTitle} data={this.state.modalValue} ></PopUpModal>) : ''}
                                </div>
                                <hr/>
                            </div>
                            <button  className={'btn btn-danger'} onClick={setIsOpen} value={'reject'}><i className="bi bi-exclamation-triangle"></i> Reject Remaining Applications</button>
                        </div>
                </div>
                    
            </div>
            </div>
                
        );
    }


}

export default ViewApplications