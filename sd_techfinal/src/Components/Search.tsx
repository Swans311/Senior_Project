import { userInfo } from "os";
import React from "react";
import Select from 'react-select';
import studentUser from "./StudentUser";

class Search extends React.Component<any, any> {
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
            <div>
                {studentUser.getIsLoggedIn() ?(<h1>Hello Student</h1>) : (<h1>Hi</h1>)}
                <form>
                    <div className={'form-group'}>
                        <label style={{ color: 'black' }}>Major</label><p/>
                        <input type={'text'} placeholder={'Major'} />
                    </div>
                    <p>Placeholder for error</p>
                    <div className={'form-group'}>
                        <label style={{ color: 'black' }}>Value</label><p/>
                        <input type={'number'} placeholder={'Scholarship Value'} />
                    </div>
                    <p>placeholder for error</p>
                    <div className={'form-group'}>
                        <label style={{ color: 'black' }}>Min GPA</label><p/>
                        <input type={'text'} placeholder={'Min GPA'} />
                    </div>
                    <p>Placeholder for error</p>
                    <div className={'form-group'}>
                        <label>Company Name</label><p />
                        <select>
                        {companies.map(obj => 
                        <option key={obj.value} value={obj.value} >
                            {obj.label}
                            </option>)}
                        </select>
                    </div>
                    <p>Placeholder for error</p>
                    <p/>
                    <input type={'submit'} className={'btn btn-primary'} />
                </form>
            </div>
            
        );
    }


}

export default Search