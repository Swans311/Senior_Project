import React from "react";
import Select from 'react-select';
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

        
        return (
            <div className={'directory2'}>
                <form>
                {User.getIsLoggedIn() ?(<h1>Hello Student</h1>) : (<h1>Search</h1>)}
                    <div className={'form-group'} >
                        <label style={{ color: 'black' }}>Major</label><br/>
                        <input type={'text'} placeholder={'Major'} />
                        <p>Placeholder for error</p>
                    </div>
                    <div className={'form-group'} >
                        <label style={{ color: 'black' }}>Value</label><br/>
                        <input type={'number'} placeholder={'Scholarship Value'} />
                        <p>Placeholder for error</p>
                    </div>
                    <div className={'form-group'} >
                        <label style={{ color: 'black' }}>Min GPA</label><br/>
                        <input type={'text'} placeholder={'Min GPA'} />
                        <p>Placeholder for error</p>
                    </div>
                    <div className={'form-group'} >
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
            
        );
    }


}

export default Search