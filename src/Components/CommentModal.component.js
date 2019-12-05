import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

import { TextArea } from 'semantic-ui-react'

class CommentModal extends Component {
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
    postComment = (e) =>{
        e.preventDefault();
        console.log(document.getElementById("textComment"))
       
        this.setState({
            textComment:document.getElementById("textComment").value
        }, () => {
            let data = {
                "a_id": sessionStorage.getItem('a_id'),
                "userID": 71,                                                                  //We create a variable called data and store what is currently in the state into it
                "comment":this.state.textComment
            }
            fetch(`http://localhost:4001/Comments/PostC`, {                                    //This is the fetch request that actually communicates with the backend
                method: 'POST',                                                             //This defines the method as a POST method
                headers: {
                    'Content-Type': 'application/json',                                     //This converts it into JSON format
                },
                body: JSON.stringify(data)
            })
                .then(response => {                                                         //Error handling
                    if (response.status === 200) {
                        window.location.replace(`http://localhost:3000/answer`);
                    } else {
                        alert('Failed to post comment');
                    };
                })
                console.log(this.state.textComment)
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
                    <h4 id="modal-label" className="overlay-title">Add a Comment</h4>
                </Modal.Header>
                <Modal.Body>
                    {this.state.content}
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant='danger' onClick={this.postComment}> Submit
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default CommentModal;