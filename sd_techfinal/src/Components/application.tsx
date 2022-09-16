import React from "react";
import functions from "./functions";
import SDNav from "./NavBar";
import User from "./User";

class Application extends React.Component<any, any, {param:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            userName:'',
            value:0,
            isLoggedIn:'',
            userError:'',
            isSubmit:false,
            errName:'',
            errGPA:'',
            errMajor:'',
            errEssay:'',
            gpa:0,
            major:'',
            essay:'',
            companyName:'',

            title:'',
            postedBy:0,
            essayRequired:true,
            scholarshipMajor:'',
            ethnicity:'',
            description:'',
            isOpen:true,

        }
    };

    componentDidMount = () => {
        let userInfo = User.getAnyUser();
        let usersName = userInfo.fname + ' '+userInfo.lname
        let id = this.props.id
        fetch('http://localhost:8080/api/getScholarship/'+id, {
            method:'GET',
        }).then(res => res.json())
        .then(res => {
            //had to do this the most annoying way because the state was not allowing for accessing the item inside of the object.
            //console.log(res.response[0]);
            this.setState({title:res.response[0].title,value:res.response[0].value, companyName:res.response[0].companyName,
            postedBy:res.response[0].postedBy, essayRequired:res.response[0].essayRequired.data[0], scholarshipMajor:res.response[0].major,
            ethnicity:res.response[0].ethnicity, description:res.response[0].description, isOpen:res.response[0].isOpen.data[0],
            userName:usersName, gpa: userInfo.gpa, major:userInfo.major })
        })
    }

    

    render() {

        const handleChange = (event:any) =>{
            const {name,value} = event.target;
            let values = {name,value}
            if(name==='name'){
                this.setState({'userName':value, errName:''})
                validateInstant(values)
            }
            if(name==='gpa'){
                this.setState({'gpa':value, errGPA:''})
                validateInstant(values)
            }
            if(name==='major'){
                this.setState({'major':value, errMajor:''})
                validateInstant(values)
            }
            if(name==='essay'){
                this.setState({'essay':value, errEssay:''})
                validateInstant(values)
            }

        }

        const validateInstant = (values:any) => {
            if(values.name==='name'){
                if(values.value !== ''){
                    this.setState({ errName:''})
                } else{
                    this.setState({ errName:'Name Must Have Value'})
                }
            }
            if(values.name==='gpa'){
                if(values.value !== ''){
                    this.setState({ errGPA:''})
                } else{
                    this.setState({ errGPA:'Enter Current GPA'})
                }
                //validateInstant(values)
            }
            if(values.name==='major'){
                this.setState({ errMajor:''})
                //validateInstant(values)
            }
            if(values.name==='essay'){
                this.setState({ errEssay:''})
                //validateInstant(values)
            }
        }
        const validateSubmit = () =>{
            
            if(this.state.errEssay==='' && this.state.errGPA===''&&this.state.errMajor==='' && this.state.errName==='' ){
                return true;
            }
            //all other instances return false
             return false   

        }

        const publishApplication = async () => {
            let body = {
                studentID : User.getAnyUser().studentID,
                scholarshipID:this.props.id,
                essay:this.state.essay,
            }
            await fetch('http://localhost:8080/api/createApplication',{
                method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
            }).then(res => res.json())
            .then(res => {
                //console.log(res)
                this.setState({isSubmit:true});
                //maybe do a popup modal here instead and redirect back to search with the same params???
                functions.directory();
            })
            

        }

        const handleSubmit = (e:{preventDefault : () => void; }) => {
            e.preventDefault();
            if(validateSubmit()) {
                this.setState({isSubmit:true})
                publishApplication();
                //this currently redirects to the search page.
                //call API to submit application, await async function before moving back to search page.
            }
        }



        
        return (
            <div style={{width:'100%', marginBottom:'2%'}}>
                <SDNav/>
            <div className={'directory2'}>
                <div className={'row justify-content-md-center'}>
                <p/>
                    <div className={"col-md-auto"}>
                        <label>Scholarship Info: &nbsp;</label><input type='text' disabled={true} value={this.state.title}></input>
                    </div>
                    <div className={"col-md-auto"}>
                        <label>Company: &nbsp;</label><input type='text' disabled={true} value={this.state.companyName}></input>
                    </div>
                    <div className={"col-md-auto"}>
                        <label>Value: &nbsp;</label><input type='text' disabled={true} value={this.state.value}></input>
                    </div>
                </div>
                <p></p>
                <div className={"row justify-content-md-center"}>
                    <textarea style={{width:'85%'}}disabled={true} rows={4} value={this.state.description}></textarea>
                </div>
                <form>
                    <div className={'row justify-content-md-center'}>
                        <div className={'col-md-auto'} >
                            <label >Name</label><br/>
                            <input className={'form-control'} type={'text'} placeholder={'Name'} name={'name'} value={this.state.userName} onChange={handleChange}/>
                            <p>{this.state.errName}</p>
                        </div>
                        <div className={'col-md-auto'} >
                            <label>GPA</label><br/>
                            <input className={'form-control'} type={'number'} min="0" max="4" name={'gpa'} placeholder={'GPA'} value={this.state.gpa} onChange={handleChange}/>
                            <p>{this.state.errGPA}</p>
                        </div>
                        <div className={'col-md-auto'} >
                            <label >Major</label><br/>
                            <input className={'form-control'} type={'text'} placeholder={'Major'} name={'major'} value={this.state.Major} onChange={handleChange}/>
                            <p>{this.state.errMajor}</p>
                        </div>
                    </div>
                    
                    <div className={'form-group'} style={{clear:'both'}}>
                        <label style={{ color: 'black' }}>Essay</label><br/>
                        <textarea className={'form-control'} rows={6} name={'essay'} value={this.state.essay} placeholder={'Essay goes here...'} onChange={handleChange}/>
                        <p>{this.state.errEssay}</p>
                    </div>
                    <input type={'submit'} className={'btn btn-primary'} onClick = {handleSubmit} style={{margin:'auto'}} />
                </form>
            </div>
            </div>
        );
    }


}

export default Application