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


            const selectWinner = () => {
                //fetch request to update to winner
                //fetch request to update to not winner also.
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
                        {this.props.data !== 'reject' ? (<div><h4>Applicant Name: {this.props.data[0]}</h4>
                        <h6>Major: {this.props.data[1]}</h6>
                        <h6>GPA: {this.props.data[2]}</h6>
                        <h6>Gender: {this.props.data[3]}</h6>
                        <h6>Ethnicity: {this.props.data[4]}</h6>
                        <h6>Essay: </h6>
                        <textarea disabled={true}>{this.props.data[5]}</textarea>
                        <p/>
                        <button className={'btn btn-success'} onClick={selectWinner}>Select Winner</button>
                        <button className={'btn btn-warning'}>Not Winner</button>
                        </div>) : (<button className = {'btn btn-danger'} onClick={functions.directory}>Reject All Applications</button>)}
                        
                    <button onClick={this.setModal} className={'btn btn-outline-success'}>Close</button>
                </div>
            
            </Modal>
                
        );
    }


}

export default PopUpModal