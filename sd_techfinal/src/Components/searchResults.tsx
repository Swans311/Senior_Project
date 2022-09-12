import React from "react";
import Select from 'react-select';
import SDNav from "./NavBar";
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
        
        
    }

    render() {

        let usersName=''
        if(User.getAnyUser()){
            usersName = User.getAnyUser().fname +' '+ User.getAnyUser().lname;
        }

        //this page still needs event handlers

        const handleChange = (event:any) => {
            const {name,value} = event.target;
            if(name === 'gpa'){
                this.setState({gpa:value})
            }
            if(name==='value'){
                this.setState({value:value})
            }
            if(name==='company'){
                this.setState({companyID:value})
            }
            if(name==='major'){
                this.setState({major:value});
            }
        }

        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
            <div className={'directory2'}>
                
            </div>
            </div>
        );
    }


}

export default SearchResults