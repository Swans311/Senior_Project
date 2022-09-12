import React from "react";
import * as ReactDOM from "react-dom/client";
import Search from './Search'
import studentUser from "./StudentUser";
import Login from "./Login";
import User from './User';
import MyAccount from './myAccount';
import functions from "./functions";

class SDNav extends React.Component <any, any> {
    constructor(props:any){
        super(props);
        this.state = {
            input:'',
            isToggleOpen:false,
        }
    };

    toggleOpen = () => {
        this.setState({isToggleOpen: !this.state.isToggleOpen})
    };

    render(){
        

        const handleChange = (event:any) =>{
            const {name,value} = event.target;
            let values = {name,value}
            this.setState({input:value})
        }

        const submitSearch = () => {
            let searchParam = this.state.input
            this.setState({input:''})
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<Search param={searchParam} />)
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }

        const LoginOut = () =>{
            this.setState({input:''})
            User.setIsLoggedIn(false)
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<Login/>)
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }
        const directory = () =>{
            this.setState({input:''})
            const dir = document.getElementById('directory') as HTMLElement;
            const content = ReactDOM.createRoot(dir);
            content.render(<Search/>) //should redirect to home, but that has not yet been built
            const dir2 = document.getElementById('directory2') as HTMLElement;
            if(dir2){
                dir2.style.display='none'
            }
        }
        

        const menuClass = `dropdown-menu${this.state.isToggleOpen ? 'show' : ''}`
        const itemClass = `dropdown-item${this.state.isToggleOpen? 'show' : ''}`
        return(
            <div style={{width:'100%', maxHeight:'85px'}}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto" style={{width:'100%', borderTopRightRadius:'5px', borderTopLeftRadius:'5px', maxHeight:'85px', float:'left'}}>
                    <ul className={'navbar-nav mx-auto'}>
                        <li className='nav-item active' style={{marginLeft:0, marginRight:'20px'}}>
                            <a className="navbar-brand" onClick={directory} >SD Tech Scholarships</a>
                        </li>
                        <li className={'nav-item active'} style={{marginRight:'20px', marginLeft:'20px', clear:'both'}}>
                            <input type='text' placeholder="Search" name='search' style={{width:'75%'}} value={this.state.input} onChange={handleChange}/>
                            <button type='submit' onClick={submitSearch} style={{width:'25%'}} className={'btn btn-outline-success'}>Search</button>
                        </li>
                        <li>
                            <div>
                                {/* Should turn this into a user icon with a drop down option for settings and login/logout */}
                                {User.getIsLoggedIn() ? (
                                <div className="dropdown" style={{position:'fixed', marginBottom:'5%', float:'right'}}>
                                    <button  type="button" className="btn btn-primary dropdown-toggle" onClick={this.toggleOpen} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id={'toggleDropdown'}>
                                    <i className='bi bi-person-circle'></i> Account Info
                                    </button>
                                    <ul className={menuClass} style={{zIndex:2}}>
                                        <li style={{listStyleType:'none'}}><a className="dropdown-item" href="#" onClick={functions.myAccount} style={{backgroundColor:'#333333', color:'#D3d3d3'}}>My Account</a></li>
                                        {User.getAnyUser().userType==='student' ? (<li style={{listStyleType:'none'}}><a className="dropdown-item" href="#"  style={{backgroundColor:'#333333', color:'#d3d3d3'}}>My Applications</a></li>) 
                                        : (<li style={{listStyleType:'none'}}><a className="dropdown-item" href="#" style={{backgroundColor:'#333333', color:'#d3d3d3'}}>My Scholarships</a></li>)}
                                        <li style={{listStyleType:'none', backgroundColor:'#333333', color:'#D3d3d3'}} >_________________</li>
                                        <li style={{listStyleType:'none'}}><a className="dropdown-item" href="#" onClick={LoginOut} style={{backgroundColor:'#333333', color:'#d3d3d3'}}>Logout</a></li>
                                    </ul>
                                    </div>)
                                :(<button className={'btn btn-primary'} style={{position:'fixed', marginBottom:'5%', float:'right'}} onClick={LoginOut} > <i className='bi bi-person-circle'></i> Login</button>)}
                            </div>
                        </li>
                    </ul>
                    
                </nav>
            </div>
        )
    }
}

export default SDNav