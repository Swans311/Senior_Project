import React from "react";
import Select from 'react-select';
import SDNav from "./NavBar";
import studentUser from "./StudentUser";
import User from "./User";

class Search extends React.Component<any, any, {param:any}> {
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

    render() {
        const companies = [
            { value: 'Google', label: 'Google' },
            { value: 'Amazon', label: 'Amazon' },
            { value: 'McDonald\'s', label: 'McDonald\'s' },
            { value: 'Netflix', label: 'Netflix' },
        ]
        let usersName=''
        if(User.getAnyUser()){
            usersName = User.getAnyUser().fname +' '+ User.getAnyUser().lname;
        }
        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
            <div className={'directory2'}>
                <form>
                {User.getIsLoggedIn() ?(<div><h2>Search</h2><h6>Hello {usersName}</h6></div>) : (<h1>Search</h1>)}
                    <div className={'form-group'} style={{float:'right', width:'50%'}}>
                        <label style={{ color: 'black' }}>Major</label><br/>
                        <input type={'text'} placeholder={'Major'} />
                        <p>Placeholder for error</p>
                    </div>
                    <div className={'form-group'} style={{float:'left', width:'50%'}}>
                        <label style={{ color: 'black' }}>Value</label><br/>
                        <input type={'number'} placeholder={'Scholarship Value $'} />
                        <p>Placeholder for error</p>
                    </div>
                    <div className={'form-group'} style={{float:'right', width:'50%'}} >
                        <label style={{ color: 'black' }}>Min GPA</label><br/>
                        <input type={'text'} placeholder={'Min GPA'} />
                        <p>Placeholder for error</p>
                    </div>
                    <div className={'form-group'} style={{float:'left', width:'50%'}} >
                        <label>Company Name</label><br />
                        <select>
                        {companies.map(obj => 
                        <option key={obj.value} value={obj.value} >
                            {obj.label}
                            </option>)}
                        </select>
                        <p>Placeholder for error</p>
                    </div>
                    <div style={{height:'60px', clear:'both', width:'100%'}}>
                    <br />
                    </div>
                    <input type={'submit'} className={'btn btn-primary'} style={{margin:'auto'}} />
                </form>
            </div>
            </div>
        );
    }


}

export default Search