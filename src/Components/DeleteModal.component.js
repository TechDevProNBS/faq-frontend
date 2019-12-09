import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

class DeleteModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showModal2: this.props.showModal2,
            title: this.props.title
        };
        this.close = () => {
            this.setState({ showModal2: this.props.showModal2 });
        };
        /* Function not used
        this.open = () => {
            this.setState({ showModal: true });
        }; */
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal2: nextProps.showModal2
        })
    }
    
    removeAnswer() {
        var a_id = sessionStorage.getItem('a_id');
        fetch(`http://localhost:4001/Answers/DelA/` + a_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Answer Deleted');
                    window.location.reload();
                } else {
                    alert('Failed to delete answer');
                };
            })
    }


    render() {
        return (
            <Modal
                show={this.state.showModal2}
                onHide={this.props.close ? this.props.close : this.close}
                backdrop={true}
                backdropClassName="backdrop-style"
                dialogClassName="modal-style"
                aria-labelledby="modal-label"
            >
                <Modal.Header closeButton={true}>
                    <h4 id="modal-label" className="overlay-title">Delete Confirmation</h4>
                </Modal.Header>
                <Modal.Footer>
                    
                    <Button variant='danger' onClick={this.removeAnswer}> Confirm
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default DeleteModal;