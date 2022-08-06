import React from "react";
import * as ReactDOM from "react-dom/client";
import Search from './Search'
import studentUser from "./StudentUser";

class SDNav extends React.Component <any, any> {
    constructor(props:any){
        super(props);
        this.state = {
            
            passError:'',
        }
    };

    render(){

        


        return(
            <div >
                <nav className="navbar navbar-dark bg-dark justify-content-between" style={{width:'100%', borderTopRightRadius:'5px', borderTopLeftRadius:'5px'}}>
                    <a className="navbar-brand">Navbar</a>
                    <div>
                        <input type='text' placeholder="Search" style={{width:'75%'}}/>
                        <button type='submit' style={{width:'25%'}} className={'btn btn-outline-success'}>Search </button>
                    </div>
                    <button className={'btn btn-primary'} style={{marginRight:'2%'}}>Login</button>
                </nav>
            </div>
        )
    }
}

export default SDNav