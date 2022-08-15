import React from "react";
import * as ReactDOM from "react-dom/client";
import Search from './Search'
import studentUser from "./StudentUser";
import Login from "./Login";
import User from './User';

class SDNav extends React.Component <any, any> {
    constructor(props:any){
        super(props);
        this.state = {
            input:'',
            //no state variables implemented for the nav bar yet. Will need input for search bar however.            
        }
    };

    render(){

        const handleChange = (event:any) =>{
            const {name,value} = event.target;
            let values = {name,value}
            this.setState({input:value})
        }

        const submitSearch = () => {
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<Search param={this.state.input} />)
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }

        const LoginOut = () =>{
            User.logout()
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<Login/>)
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }
        const directory = () =>{
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<Search/>) //should redirect to home, but that has not yet been built
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }


        return(
            <div >
                <nav className="navbar navbar-dark bg-dark justify-content-between" style={{width:'100%', borderTopRightRadius:'5px', borderTopLeftRadius:'5px'}}>
                    <a className="navbar-brand" onClick={directory} >SD Tech Scholarships</a>
                    <div>
                        <input type='text' placeholder="Search" name='search' style={{width:'75%'}} value={this.state.input}/>
                        <button type='submit' onClick={submitSearch} style={{width:'25%'}} className={'btn btn-outline-success'}>Search</button>
                    </div>
                    {/* Should turn this into a user icon with a drop down option for settings and login/logout */}
                    {User.getIsLoggedIn() ? (<button className={'btn btn-primary'} style={{marginRight:'2%'}} onClick={LoginOut} >Logout</button>)
                    :(<button className={'btn btn-primary'} style={{marginRight:'2%'}} onClick={LoginOut} >Login</button>)}
                </nav>
            </div>
        )
    }
}

export default SDNav