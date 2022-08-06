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
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </nav>
            </div>
        )
    }
}

export default SDNav