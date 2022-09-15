import { appendFileSync } from "fs";
import React from "react";
import Select from 'react-select';
import functions from "./functions";
import SDNav from "./NavBar";
import ScholarshipDiv from "./scholarshipDiv";
import studentUser from "./StudentUser";
import User from "./User";

class SearchResults extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            scholarships:[],
            value:'',
            gpa:0,
            companyID:0,
            major:'',
            isLoggedIn:'',
            userError:'',
            isSubmit:false,
            emailError:'',
            passError:'',
        }
    };

    componentDidMount = () => {
        fetch('http://localhost:8080/api/allScholarships', {
            method:'GET',
        }).then(res => res.json())
        .then(res => {
            this.setState({scholarships:res.response})
        })
        const params = this.props.param
        if(params.input){
            let searchedScholarship:any;
            // this.state.scholarships.major === params.input || this.state.scholarships.value >= params.input && params.input >=5 || 
            //this.state.scholarships.gpa >= params.input && params.input <=4 || this.state.scholarships.companyName === params.input
            if(params.input >= 0 && params.input<=4){
                searchedScholarship = this.state.scholarships.filter((scholarship:any) => scholarship.minGPA <= params.input)
            }
            //searchedScholarship = this.state.scholarships.filter()
            console.log(searchedScholarship)
            this.setState({searchedScholarship:searchedScholarship})
        }else{
            //check through all of the options, i.e. value, company name, major, or gpa
        }
        
        
    }

    render() {
        let usersName=''
        if(User.getAnyUser()){
            usersName = User.getAnyUser().fname +' '+ User.getAnyUser().lname;
        }

        let scholarships = this.state.scholarships.map((e:any)=>{
            let newModel:any=[];
            newModel.display = <div><div className={'btn btn-outline success'} onClick={()=>functions.newApp(e.scholarshipID)} >Apply</div><div>Title: {e.title}</div><div>Company: {e.companyName}</div><div>Value: ${e.value}</div></div>
            return newModel;
        })
        

        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
                <div className={'directory'}>
                    <h4>Search Results</h4>
                    <div className={'directory2'}>
                        {this.state.scholarships.map((e:any)=>{
                            return <ScholarshipDiv id={e.id} style={{width:'80%'}}></ScholarshipDiv>
                        })}
                    </div>
                </div>
            </div>
        );
    }


}

export default SearchResults