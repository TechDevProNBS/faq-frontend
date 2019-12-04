import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './css/FAQ.css'
import AnswerQuestionsModal from './AnswerModal.component'
import CommentModal from './CommentModal.component'

export default class Answer extends React.Component {

    constructor() {
        super();

        this.state = {
            showIssueModal: true
        }
    }

    handleButtonToggleModal1 = (toggle) => {

        this.setState({
            showModal1: toggle
        });
    }
    handleButtonToggleModal = (toggle) => {

        this.setState({
            showModal: toggle
        });
    }

    textAnswer = () => {
        return (
            <input style={{ maxWidth: '100%', minWidth: '100%' }} />

        );
    }

    render() {


        return (
            <div>

                <body id="page-top">

                    <nav class="navbar navbar-expand-lg fixed-top" id="mainNav" style={{ backgroundColor: '#DFDFDF', borderTop: '2px solid', borderBottom: '2px solid', color: 'black', paddingTop: '0px', paddingBottom: '0px' }}>
                        <div class="container">
                            <a class="navbar-brand js-scroll-trigger" href="/"><img
                                src="Nationwide.png"
                                width="50"
                                height="50"
                                alt="Nationwide Logo"
                                style={{ borderRadius: '25px' }} /></a>
                            <h2 style={{ fontSize: '20px' }}>{sessionStorage.getItem('questions')}</h2>
                            <div class="collapse navbar-collapse" id="navbarResponsive">
                            </div>
                        </div>
                    </nav>
                </body>
                <br />

                <div class="container site-container" style={{ marginTop: '60px', marginBottom: '30px' }}>
                    <div class="row">
                        <div class="col-lg-8  ">
                            
                            <Button variant='danger' onClick={() => this.handleButtonToggleModal1(true)} style={{ height: '25px', paddingTop: '0' }}>Answer Question</Button>

                            <AnswerQuestionsModal content={this.textAnswer()} title={"Answer Question"} showModal1={this.state.showModal1} close={() => this.handleButtonToggleModal1(false)} /><br /><br />

                            This is Answer Number <Button variant='primary' onClick={() => this.handleButtonToggleModal(true)} style={{ height: '25px', paddingTop: '0', marginLeft: '20px' }}>Add Comment</Button>

                            <CommentModal content={this.textAnswer()} title={"Add A Comment"} showModal={this.state.showModal} close={() => this.handleButtonToggleModal(false)} />

                        </div>
                    </div>
                </div>
                <footer class="py-1 sticky-bottom footer" style={{ backgroundColor: '#DFDFDF', borderTop: '2px solid', borderBottom: '2px solid', color: 'black' }}>
                    <div class="container">
                        <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                    </div>
                </footer>
            </div>
        )
    }
}