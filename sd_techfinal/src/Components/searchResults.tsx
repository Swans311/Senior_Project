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
            error:'',
        }
    };

    componentDidMount = () => {
        let scholarshipsLocal:any = [];
        let params = this.props.param
        fetch('http://localhost:8080/api/allActiveScholarships', {
            method:'GET',
        }).then(res => res.json())
        .then(res => {
            scholarshipsLocal = res.response
            let searchedScholarship:any;
            if(params.company){
                params.company = parseInt(params.company)
                params.value = parseInt(params.value)
                params.gpa = parseFloat(params.gpa)
                params.major = params.major.toLowerCase()
            }
            let error:any='';
            if(params.company > 0){
                console.log(params)
                searchedScholarship = scholarshipsLocal.filter((scholarship: {minGPA:number, value:number, major:string, postedBy:number}) => scholarship.postedBy === params.company);
                if(searchedScholarship.length === 0){
                    error = 'Company Has no Scholarships.';
                    searchedScholarship=scholarshipsLocal
                }
                searchedScholarship = searchedScholarship.filter((scholarship:{minGPA:number, value:number, major:string}) => scholarship.value >= params.value);
                searchedScholarship = searchedScholarship.filter((scholarship:{minGPA:number, value:number, major:string}) => scholarship.minGPA >= params.gpa);
                console.log(searchedScholarship.length)
                
                //scholarship.minGPA >= params.gpa && scholarship.major.toLowerCase().includes(params.major.toLowerCase()) && scholarship.value >= params.value && 
            }
            else if(params.company === 0 ){
                //in this situation we don't need to search for the company...
                searchedScholarship = scholarshipsLocal.filter((scholarship: {minGPA:number, value:number, major:string}) => scholarship.minGPA >= params.gpa && scholarship.value >= params.value)
                this.setState({scholarships:searchedScholarship})
            }
            else{
                if(params >= 0 && params<=4){ //GPA CHECK
                    searchedScholarship = scholarshipsLocal.filter((scholarship: { minGPA: number; }) => scholarship.minGPA <= params)
                }
                else if (params >=50){//value
                    searchedScholarship = scholarshipsLocal.filter((scholarship:{value:number;}) => scholarship.value <= params);
                }
                else if (params != ''){
                    params = params.toLowerCase()
                    searchedScholarship = scholarshipsLocal.filter((scholarship:{companyName:string}) => scholarship.companyName.toLowerCase().includes(params))
                    if(searchedScholarship.length === 0){
                        searchedScholarship = scholarshipsLocal.filter((scholarship:{major:string}) =>  scholarship.major.toLowerCase().includes(params));
                    }
                }
                else{
                    if(!searchedScholarship){
                        searchedScholarship = scholarshipsLocal;
                    }
                }
                
            }
            this.setState({scholarships:searchedScholarship, error:error})
        })
        
        
        
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
                    <p>{this.state.error}</p>
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