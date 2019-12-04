import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

class AskQuestionsModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showModal: this.props.showModal,
            content: this.props.content,
            title: this.props.title
        };
        this.close = () => {
            this.setState({ showModal: this.props.showModal });
        };
        /* Function not used
        this.open = () => {
            this.setState({ showModal: true });
        }; */
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        })
    }

    render() {
        return (
            <Modal
                show={this.state.showModal}
                onHide={this.props.close ? this.props.close : this.close}
                backdrop={true}
                backdropClassName="backdrop-style"
                dialogClassName="modal-style"
                aria-labelledby="modal-label"
            >
                <Modal.Header closeButton={true}>
                    <h4 id="modal-label" className="overlay-title">Ask A Question</h4>
                </Modal.Header>
                <Modal.Body>
                    {this.state.content}
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant='primary'> Submit
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default AskQuestionsModal;
