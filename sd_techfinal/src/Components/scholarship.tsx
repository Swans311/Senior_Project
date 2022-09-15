import React from "react";
import Select from 'react-select';
import functions from "./functions";
import SDNav from "./NavBar";
import studentUser from "./StudentUser";
import User from "./User";

class Scholarship extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            title:'',
            value:'',
            gpa:0,
            ethnicity:'',
            major:'',
            essayRequired:false,
            description:'',
            isLoggedIn:'',
            errTitle:'Scholarship Must have Title',
            isSubmit:false,
            errGPA:'Must enter Min GPA Required',
            errValue:'Must enter Scholarship Value',
        }
    };

    

    render() {
        const userInfo = User.getAnyUser();
        const handleChange = (event:any) =>{
            const {name,value} = event.target;
            let values = {name,value}
            if(name === 'title'){
                this.setState({title:value})
                validateInstant(values)
            }
            if(name === 'value'){
                this.setState({value:value})
                validateInstant(values)
            }
            if(name === 'gpa'){
                this.setState({'gpa':value})
                validateInstant(values)
            }
            if(name === 'ethnicity'){
                this.setState({ethnicity:value})
            }
            if(name === 'major'){
                this.setState({major:value})
            }
            if(name === 'checkbox'){
                this.setState({essayRequired:!this.state.essayRequired})
            }
            if(name === 'description'){
                this.setState({description:value})
                validateInstant(values)
            }
        }

        const validateInstant = (values:any) => {
            if(values.name === 'title'){
                if(values.value.length > 3){
                    this.setState({errTitle:''})
                }else{
                    this.setState({errTitle:'Length Requirement not met.'})
                }
            }
            if(values.name === 'value'){
                if(values.value > 0){
                    this.setState({errValue:''})
                }else{
                    this.setState({errValue:'Value must be a positive number'})
                }
            }
            if(values.name === 'gpa'){
                if(values.value >=0 && values.value <= 4){
                    this.setState({errGPA:''})
                }
                else{
                    this.setState({errGPA:'GPA Must be on a 4.0 max scale.'})
                }
            }
        }
        const postScholarship = async () => {
            const body = {
                'id':parseInt(userInfo.organizationID),
                'companyName':userInfo.companyName,
                'value':parseFloat(this.state.value),
                'essayRequired':this.state.essayRequired,
                'major':this.state.major,
                'gpa':parseFloat(this.state.gpa),
                'ethnicity':this.state.ethnicity,
                'description':this.state.description,
                'title':this.state.title,
            }
            await fetch('http://localhost:8080/api/createScholarship', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({isSubmit:true});
                functions.directory();
            })
            
            
                //usefulData = {'id':res.response.insertId, 'response': res.response, 'error':res.error}
        }

        const handleSubmit = (e:any) => {
            e.preventDefault()
            if( this.state.errValue === '' && this.state.errGPA === '' && this.state.errTitle === ''){
                let body = {
                    'id':userInfo.organizationID,
                    'companyName':userInfo.companyName,
                    'value':this.state.value,
                    'essayRequired':this.state.essayRequired,
                    'major':this.state.major,
                    'gpa':this.state.gpa,
                    'ethnicity':this.state.ethnicity,
                    'description':this.state.description,
                    'title':this.state.title,
                }
                postScholarship()//.then(()=>functions.directory())
                if(this.state.isSubmit){
                    functions.directory();
                }
                else{

                }

            }
        }

        

        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
                <div className={'directory'} style={{width:'100%'}}>
                    <div className={'directory2'}>
                        <h2>Create New Scholarship</h2>
                    <form>
                    <div className={'row justify-content-md-center'}>
                        <div className={'col-md-auto'} >
                            <label >Title</label><br/>
                            <input className={'form-control'} type={'text'} placeholder={'Scholarship Name'} name={'title'} value={this.state.title} onChange={handleChange}/>
                            <p>{this.state.errTitle}</p>
                        </div>
                        <div className={'col-md-auto'} >
                            <label>Value $</label><br/>
                            <input className={'form-control'} type={'number'}  name={'value'} placeholder={'Enter Value here...'} value={this.state.value} onChange={handleChange}/>
                            <p>{this.state.errValue}</p>
                        </div>
                        <div className={'col-md-auto'} >
                            <label >Min GPA</label><br/>
                            <input className={'form-control'} type={'number'} step="0.01" min="0" max="4" placeholder={'4.0 Scale'} name={'gpa'} value={this.state.gpa} onChange={handleChange}/>
                            <p>{this.state.errGPA}</p>
                        </div>
                    </div>
                    <div className={'row justify-content-md-center'}>
                        <div className={'col-md-auto'} >
                            <label >Ethnicity</label><br/>
                            <input className={'form-control'} type={'text'} placeholder={'Ethnicity'} name={'ethnicity'} value={this.state.ethnicity} onChange={handleChange} />
                        </div>
                        <div className={'col-md-auto'} >
                            <label>Major</label><br/>
                            <input className={'form-control'} type={'text'} name={'major'} placeholder={'Major'} value={this.state.major} onChange={handleChange} />
                        </div>
                        <div className={'col-md-auto'} >
                            <label ></label><br/>
                            <input className={'form-check-input'} type={'checkbox'} name={'checkbox'} value={this.state.isOpen} onChange={handleChange}/><label>&nbsp; Essay Required</label>
                        </div>
                    </div>
                    <div className={'form-group'} style={{clear:'both'}}>
                        <label style={{ color: 'black' }}>Description</label><br/>
                        <textarea className={'form-control'} rows={6} name={'description'} value={this.state.description} placeholder={'Description goes here...'} onChange={handleChange} />
                        <p>{this.state.errEssay}</p>
                    </div>
                    <button className={'btn btn-success'} onClick={handleSubmit}>Post Scholarship</button>
                </form>
                </div>
                </div>
            </div>
        );
    }


}

export default Scholarship