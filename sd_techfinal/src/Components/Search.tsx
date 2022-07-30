import React from "react";
import Select from 'react-select';

class Search extends React.Component<any, any> {

    render() {
        const companies = [
            { value: 'Google', label: 'Google' },
            { value: 'Amazon', label: 'Amazon' },
            { value: 'McDonald\'s', label: 'McDonald\'s' },
            { value: 'Netflix', label: 'Netflix' },
        ]


        return (
            <form style={{ backgroundColor: 'white', padding: '20%' }}>
                <div>
                    <label style={{ color: 'black' }}>Enter Company Here</label>
                    <input type={'text'} placeholder={'text'} />
                </div>
                <div>
                    <label style={{ color: 'black' }}>Something Here</label>
                    <input type={'number'} placeholder={'Select a Number'} />
                </div>
                <div>
                    <label style={{ color: 'black' }}>Password</label>
                    <input type={'password'} placeholder={'Password'} />
                </div>
                <div>
                    <label>Company Name</label><p />
                    <Select value={companies} options={companies} />
                </div>
                <input type={'submit'} />
            </form>
        );
    }


}

export default Search