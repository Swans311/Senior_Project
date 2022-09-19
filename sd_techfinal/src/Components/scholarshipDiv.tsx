import { appendFileSync } from "fs";
import React from "react";
import Select from 'react-select';
import functions from "./functions";
import SDNav from "./NavBar";
import studentUser from "./StudentUser";
import User from "./User";

class ScholarshipDiv extends React.Component<any, any, {id:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            title:'',
            value:0,
            companyName:'',
            postedBy:0,
            essayRequired:true,
            major:'',
            ethnicity:'',
            description:'',
            isOpen:true,
            id:this.props.id,
            minGPA:0,
        }
    };


    componentDidMount = () => {
        let id = this.props.id
        fetch('http://localhost:8080/api/getScholarship/'+id, {
            method:'GET',
        }).then(res => res.json())
        .then(res => {
            //had to do this the most annoying way because the state was not allowing for accessing the item inside of the object.
            this.setState({title:res.response[0].title,value:res.response[0].value, companyName:res.response[0].companyName,
            postedBy:res.response[0].postedBy, essayRequired:res.response[0].essayRequired.data[0], major:res.response[0].major,
            ethnicity:res.response[0].ethnicity, description:res.response[0].description, isOpen:res.response[0].isOpen.data[0], id:res.response[0].id,
        minGPA:res.response[0].minGPA })
        })
        
        
    }

    render() {
        const userInfo = User.getAnyUser();
        
        
        return (
            <div className={'directory shadow p-3 mb-5 bg-white rounded mx-auto'} style={{height:'fit-content'}}>
                <div style={{float:'right'}}>
                    {User.getIsLoggedIn() && userInfo.userType === 'student'? (this.state.isOpen ? (<button className={'btn btn-outline-success'} onClick={()=>functions.newApp(this.state.id) }>Apply</button>) : (
                        <button className={'btn btn-outline-danger'} disabled={true}>CLOSED</button>)) : ''}
                    
                </div>
                <div className={'row justify-content-md-center'}>
                    <div className={"col-md-auto"}>
                        <label>Title: {this.state.title}</label>
                        {/* <label>Title: {scholarship.title}</label> */}
                    </div>
                    <div className={"col-md-auto"}>
                        <label>Company: {this.state.companyName}</label>
                    </div>
                    <div className={"col-md-auto"}>
                        <label>Value: ${this.state.value}</label>
                        {/* <label>Value: ${scholarship.value}</label> */}
                    </div>
                    <div className={"col-md-auto"}>
                        <label>Min GPA Required: {this.state.minGPA}</label>
                    </div>
                    <div className={"col-md-auto"}>
                        <label>{this.state.essayRequired ? (<i className={'bi bi-check-square'} style={{color:'green'}}></i>) : (<i className={'bi bi-x-square'} style={{color:'red'}}></i>)} Essay Required</label>
                    </div>
                </div>
                <p/>
                <div className={"row justify-content-md-center"}>
                    <textarea style={{width:'85%'}}disabled={true} rows={4} value={this.state.description}></textarea>
                </div>
                <p/>
                
            </div>
        );
    }


}

export default ScholarshipDiv