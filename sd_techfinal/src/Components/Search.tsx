import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Select from 'react-select';
import functions from "./functions";
import SDNav from "./NavBar";
import studentUser from "./StudentUser";
import User from "./User";

class Search extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            company:[],
            value:0,
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
        fetch('http://localhost:8080/api/getCompanies', {
            method:'GET',
        }).then(res => res.json())
        .then(res => {
            this.setState({company:res.response})
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

        const handleSubmit = (e:{preventDefault : () => void; }) => {
            e.preventDefault();
            functions.search(this.state.companyID,this.state.value, this.state.gpa, this.state.major )
        }


        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
            <div className={'directory2'}>
                <form>
                    {User.getIsLoggedIn() ?(<div><h2>Search</h2><h6>Hello {usersName}</h6></div>) : (<h1>Search</h1>)}
                    <div className={'form-group'} style={{float:'right', width:'40%'}}>
                        <label >Major</label><br/>
                        <input className={'form-control'} name={'major'} type={'text'} placeholder={'Major'} value={this.state.major} onChange={handleChange} />
                    </div>
                    <div className={'form-group'} style={{float:'left', width:'40%'}}>
                        <label >Min Value $</label><br/>
                        <input className={'form-control'} name={'value'} type={'number'} step={50} placeholder={'Scholarship Value $'} value={this.state.value} onChange={handleChange}/>
                    </div>
                    <div className={'form-group'} style={{float:'right', width:'40%'}} >
                        <label >Min GPA</label><br/>
                        <input className={'form-control'} name={'gpa'} type={'number'} step={0.01} min={0} max={4} placeholder={'Min GPA'} value={this.state.gpa} onChange={handleChange} />
                    </div>
                    <div className={'form-group'} style={{float:'left', width:'40%'}} >
                        <label>Company Name</label><br />
                        <select className={'form-control'} name={'company'} value={this.state.companyID} onChange={handleChange}>
                            <option value={0}></option>
                        {this.state.company.map((obj: { organizationID:any, companyName:any} ) => 
                        <option key={obj.organizationID} value={obj.organizationID} >
                            {obj.companyName}
                            </option>)}
                        </select>
                    </div>
                    <div style={{height:'60px', clear:'both', width:'100%'}}>
                        <br />
                    </div>
                    <button type={'submit'} onClick={handleSubmit}  className={'btn btn-outline-success'}>Submit Search</button>
                </form>
            </div>
            </div>
        );
    }


}

export default Search