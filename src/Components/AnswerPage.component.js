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
            RecentA: [],
            showIssueModal: true
        }
    }

    answerStorage(a_id) {
        sessionStorage.setItem('a_id', a_id)
        this.handleButtonToggleCommentModal(true)
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
            <TextArea style={{ maxWidth: '100%', minWidth: '100%' }} id="textAnswer" />
        );
    }

    textComment = () => {
        return (
            <TextArea style={{ maxWidth: '100%', minWidth: '100%' }} id="textComment" />
        );
    }

    editAnswer = (spanid, answer) => {
        var ref = document.getElementById("answer" + spanid)
        ref.innerHTML = ""
        var refTextInput = document.createElement("input");
        var refConfirmButton = document.createElement("input");
        refConfirmButton.type = "Button"
        refConfirmButton.value = "Confirm"
        refConfirmButton.className = "EditConfirm"
        refConfirmButton.addEventListener("click", function () {
            let data = {
                "a_id": spanid,
                "updA": refTextInput.value
            }
            fetch(`http://localhost:4001/Answers/UpdateA`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            window.location.replace(`http://localhost:3000/answer`)
        })
        refTextInput.type = "text"
        refTextInput.style.marginLeft = "80px"
        refTextInput.value = answer
        ref.appendChild(refTextInput)
        ref.appendChild(refConfirmButton)
    }

    componentDidMount = () => {
        var q_id = sessionStorage.getItem('q_id');
        fetch(`http://localhost:4001/Answers/RecentA/${q_id}`)
            //Url from backend
            .then(response => response.json())
            .then(data => {
                this.setState({
                    RecentA: data
                })
            })
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
                            <Button variant='danger' onClick={() => this.handleButtonToggleAnswerModal(true)} style={{ height: '25px', paddingTop: '0' }}>Answer Question</Button>
                            <AnswerQuestionsModal content={this.textAnswer()} title={"Answer Question"} showModal1={this.state.showModal1} close={() => this.handleButtonToggleAnswerModal(false)} />
                            <div class="collapse navbar-collapse" id="navbarResponsive">
                            </div>
                        </div>
                    </nav>
                </body>
                <br />
                <h3 style={{ marginTop: '45px', marginLeft: '10px' }}>Question:
                </h3>
                <h4 style={{ backgroundColor: '#EEEEEE', marginLeft: '40px', marginRight: '40px' }}> {sessionStorage.getItem('questions')}</h4><br />
                <div class="container site-container" style={{ marginTop: '0px', marginBottom: '30px' }}>
                    <div class="row">
                        <div class="col-lg-12">
                            <h4 style={{ marginRight: '40px', marginLeft: '40px' }}>Answers (Number of Answers): </h4><br />
                            <div style={{ maxWidth: '100%', backgroundColor: 'black' }}>
                                            <hr />
                                        </div>
                            {
                                this.state.RecentA.map((data) =>
                                    <div>
                                        <span id={'answer' + data.a_id}> <text style={{ marginLeft: '80px', backgroundColor: '#EEEEEE' }}>{data.answer}</text></span>
                                        <Button variant='primary' className='VoteUp'><i style={{ marginBottom: '3px' }} class="arrow up"></i></Button>
                                        <Button variant='danger' className='VoteDown'><i style={{ marginBottom: '5px' }} class="arrow down"></i></Button>
                                        (rating)
                                      <Button variant='danger' size='sm' style={{ height: '25px', paddingTop: '0', position: 'absolute', right: '40px' }}>Delete</Button>
                                        <Button variant='secondary' size='sm' onClick={() => this.editAnswer(data.a_id, data.answer)} style={{ height: '25px', paddingTop: '0', position: 'absolute', right: '110px' }}>Edit</Button><br /><br />
                                        <Button variant='primary' size='sm' onClick={() => this.answerStorage(data.a_id)} style={{ height: '25px', paddingTop: '0', marginLeft: '100px' }}>Add Comment</Button><br /><br />

                                        <text style={{ marginLeft: '40px' }}>Comment here</text>
                                        <br /><br />
                                        <div style={{ maxWidth: '100%', backgroundColor: 'black' }}>
                                            <hr />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <CommentModal content={this.textComment()} title={"Add A Comment"} showModal={this.state.showModal} close={() => this.handleButtonToggleCommentModal(false)} />
                <footer class="py-1 sticky-bottom footer" style={{ backgroundColor: '#DFDFDF', borderTop: '2px solid', borderBottom: '2px solid', color: 'black' }}>
                    <div class="container">
                        <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                    </div>
                </footer>
            </div>
        )
    }
}