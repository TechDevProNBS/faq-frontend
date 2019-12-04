import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

class AnswerQuestionsModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showModal1: this.props.showModal1,
            content: this.props.content,
            title: this.props.title
        };
        this.close = () => {
            this.setState({ showModal1: this.props.showModal1 });
        };
        /* Function not used
        this.open = () => {
            this.setState({ showModal: true });
        }; */
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal1: nextProps.showModal1
        })
    }

    render() {
        return (
            <Modal
                show={this.state.showModal1}
                onHide={this.props.close ? this.props.close : this.close}
                backdrop={true}
                backdropClassName="backdrop-style"
                dialogClassName="modal-style"
                aria-labelledby="modal-label"
            >
                <Modal.Header closeButton={true}>
                    <h4 id="modal-label" className="overlay-title">Answer Question</h4>
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
export default AnswerQuestionsModal;

