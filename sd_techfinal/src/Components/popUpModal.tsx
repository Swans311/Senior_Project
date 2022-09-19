import React from "react";
//@ts-ignore
import Modal from 'react-modal';
import functions from "./functions";
import SDNav from "./NavBar";
import User from "./User";
import DataGrid from 'react-data-grid';
import vars from "./vars";



class PopUpModal extends React.Component<any, any, {any:any}> {
    constructor(props:any){
        super(props);
        this.state = {
            isOpen:true,
        }
    };

    


    componentDidMount = () => {
        this.setState({isOpen:this.props.open})
    }

    setModal = () => {
        this.setState({isOpen:!this.state.isOpen})
    }

    render() {

        const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          };          
            let subtitle:any;
                    
            function afterOpenModal() {
              // references are now sync'd and can be accessed.
              subtitle.style.color = 'black';
            }


            const selectWinner = async (e:any) => {
                let name = e.target.name
                if(name === 'no'){
                    let body = {'id':this.props.data[0], 'win': 0}
                    await fetch ('http://localhost:8080/api/selectWinner', {
                        method:"PUT",
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(body)})
                        .then(res=> res.json())
                        .then(res => {
                            functions.viewApplications(this.props.id);
                        })
                }else{
                    let body = {'id':this.props.data[0], 'win': 1}
                    await fetch ('http://localhost:8080/api/selectWinner', {
                        method:"PUT",
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(body)})
                        .then(res=> res.json())
                        .then(res => {
                            functions.viewApplications(this.props.id);
                        })
                }
                //fetch request to update to winner
                //fetch request to update to not winner also.
            }

            const rejectAll = async () => {
                let id = this.props.id;
                await fetch('http://localhost:8080/api/rejectAll', {
                    method:"PUT",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(id)})
                    .then(res=> res.json())
                    .then(res => {
                        functions.viewApplications(this.props.id);
                    })
            }

            let essay:any='';
            for(let i=6;i<this.props.data.length;i++){
                essay += this.props.data[i];
            }
            
        return (
            <Modal
            ariaHideApp={false}
            isOpen={this.state.isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={this.setModal}
            style={customStyles}
            contentLabel="Example Modal">
                <div className={'directory'}>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{this.props.title}</h2>
                        {this.props.data !== 'reject' ? (<div><h4>Applicant Name: {this.props.data[1]}</h4>
                        <h6>Major: {this.props.data[2]}</h6>
                        <h6>GPA: {this.props.data[3]}</h6>
                        <h6>Gender: {this.props.data[4]}</h6>
                        <h6>Ethnicity: {this.props.data[5]}</h6>
                        <h6>Essay: </h6>
                        <textarea disabled={true} style={{width:'100%'}} cols={6} rows={6}>{essay}</textarea>
                        <p/>
                        <button className={'btn btn-success'} onClick={selectWinner} name={'yes'}>Select Winner</button>
                        <button className={'btn btn-warning'} onClick={selectWinner} name={'no'}>Not Winner</button>
                        </div>) : (<button className = {'btn btn-danger'} onClick={rejectAll}><i className="bi bi-exclamation-triangle"></i>Reject All Applications</button>)}
                        
                    <button onClick={this.setModal} className={'btn btn-outline-success'}>Close</button>
                </div>
            
            </Modal>
                
        );
    }


}

export default PopUpModal