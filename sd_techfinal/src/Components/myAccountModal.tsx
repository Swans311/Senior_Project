import React from "react";
import Modal from 'react-modal';
import functions from "./functions";




class MyAccountModal extends React.Component<any, any, {any:any}> {
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

            const modalAction = async () => {
                if(this.props.action === 'Close'){
                    let id = {'id':parseInt(this.props.data)}
                    await fetch('http://localhost:8080/api/closeScholarship', {
                    method:"PUT",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(id)})
                    .then(res=> res.json())
                    .then(res => {
                        this.setModal()
                        functions.myAccount()
                    })
                }else{
                    let id = parseInt(this.props.data);
                    await fetch('http://localhost:8080/api/deleteApp/'+id,{
                        method:'DELETE'
                    }).then(res => res.json())
                    .then(res=> {
                        this.setModal()
                        functions.myAccount()
                    })
                }
                
            }

            //closeScholarship pass id in as body, but that is it.
            //delete application/id
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
                        <button className={'btn btn-warning'} onClick={modalAction}><i className={'"bi bi-exclamation-triangle"'}></i> {this.props.action}</button>
                    <button onClick={this.setModal} className={'btn btn-outline-success'}>Back</button>
                </div>
            
            </Modal>
                
        );
    }


}

export default MyAccountModal