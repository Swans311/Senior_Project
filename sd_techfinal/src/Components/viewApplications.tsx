import React from "react";
import functions from "./functions";
import SDNav from "./NavBar";
import User from "./User";
import DataGrid from 'react-data-grid';
import vars from "./vars";

class ViewApplications extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            applications:[],
            myScholarship:{},
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
                console.log(res)
                this.setState({myScholarship:res.response[0]})
            })
        
        
    }

    render() {
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
                if(e.winner === false){
                    return null;
                }
            let model:any=e;
            model.name = e.fname + ' '+ e.lname
            model.expandBtn = <button className={'btn btn-outline-success'} onClick={()=> console.log('You did it')}>More...</button>
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
                                </div>
                                <hr/>
                            </div>
                            </div>
                    </div>
                    
            </div>
            </div>
                
        );
    }


}

export default ViewApplications