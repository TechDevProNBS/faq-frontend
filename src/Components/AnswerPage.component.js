import React from 'react';
import { Button } from 'react-bootstrap';
import './css/FAQ.css'
import AnswerQuestionsModal from './AnswerModal.component'
import CommentModal from './CommentModal.component'
import { TextArea } from 'semantic-ui-react'

export default class Answer extends React.Component {

    constructor() {
        super();

        this.state = {
            showIssueModal: true
        }
    }

    handleButtonToggleAnswerModal = (toggle) => {

        this.setState({
            showModal1: toggle
        });
    }
    handleButtonToggleCommentModal = (toggle) => {

        this.setState({
            showModal: toggle
        });
    }

    textAnswer = () => {
        return (
            <TextArea style={{ maxWidth: '100%', minWidth: '100%' }} />

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
                            <Button variant='danger' onClick={() => this.handleButtonToggleAnswerModal(true)} style={{ height: '25px', paddingTop: '0'}}>Answer Question</Button>

                            <AnswerQuestionsModal content={this.textAnswer()} title={"Answer Question"} showModal1={this.state.showModal1} close={() => this.handleButtonToggleAnswerModal(false)} />
                            <div class="collapse navbar-collapse" id="navbarResponsive">
                            </div>
                        </div>
                    </nav>
                </body>
                <br />

                <h3 style={{ marginTop: '45px', marginLeft:'10px' }}>Question:
                </h3>
                <h4 style={{ backgroundColor: '#EEEEEE', marginLeft: '40px', marginRight: '40px' }}> {sessionStorage.getItem('questions')}</h4><br />
                <div class="container site-container" style={{ marginTop: '0px', marginBottom: '30px' }}>
                    <div class="row">
                        <div class="col-lg-12">

                            <h4 style={{marginRight:'40px', marginLeft:'40px'}}>Answers (Number of Answers): </h4><br />

                            <text style={{marginRight:'80px', marginLeft:'80px'}}>This is Answer Number (Number of Comments)
                             <Button variant='primary' onClick={() => this.handleButtonToggleCommentModal(true)} style={{ height: '25px', paddingTop: '0', marginLeft: '20px' }}>Add Comment</Button>

                            <CommentModal content={this.textAnswer()} title={"Add A Comment"} showModal={this.state.showModal} close={() => this.handleButtonToggleCommentModal(false)} />
                            </text><br />
                            <text style={{marginRight:'120px', marginLeft:'120px', backgroundColor: '#EEEEEE'}}>Comment here</text>
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