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
            RecentC: [],
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

    editAnswer = (spanid, answer, ) => {

        var ref = document.getElementById("answer" + spanid)
        ref.innerHTML = ""
        var refTextInput = document.createElement("TextArea");
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
        refTextInput.style.minWidth = "60%"
        refTextInput.style.maxWidth = "60%"
        refTextInput.style.marginLeft = "80px"
        refTextInput.value = answer
        ref.appendChild(refTextInput)
        ref.appendChild(refConfirmButton)
    }


    componentDidMount = async () => {
        let Alpha = ""
        var q_id = sessionStorage.getItem('q_id');
       await fetch(`http://localhost:4001/Answers/RecentA/${q_id}`)
            .then(response => response.json())
            .then(data => {
                    Alpha = data
                })
            
        var a_id = sessionStorage.getItem('a_id');
        await fetch(`http://localhost:4001/Comments/GetC/${q_id}`)
            .then(response => response.json())
            .then(dataC => {
                
                this.setState({
                    RecentC:dataC,
                    RecentA:Alpha
                })
            })
           
}

    answerStorage2(a_id) {
        var a_id = sessionStorage.setItem('a_id', a_id);
        this.removeAnswer()
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
            <div>
                <body id="page-top">
                    <nav class="navbar navbar-expand-lg fixed-top" id="mainNav" className='FAQHeader'>
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
                <h3 className='QuestionSubheading'>Question:
                </h3>
                <h4 className='QuestionHeading'> {sessionStorage.getItem('questions')}</h4><br />
                <div class="container site-container" style={{ marginTop: '0px', marginBottom: '30px' }}>
                    <div class="row">
                        <div class="col-lg-12">
                            <h4 className='AnswersSubheading'>Answers ({this.state.CountA}): </h4><br />
                            <div className='Separator'>
                                <hr />
                            </div>
                            {
                                this.state.RecentA.map((data) =>
                                    <div>
                                        <span id={'answer' + data.a_id}> <text className='EditAnswerText'>{data.answer}</text></span>

                                        <a href='#' onClick={() => this.editAnswer(data.a_id, data.answer)} style={{ marginLeft: '20px' }}>Edit</a>
                                        <a href='#' onClick = {()=> this.answerStorage2(data.a_id)} style={{ marginLeft: '20px', marginRight: '20px' }}>Delete</a>
                                        <br /><br />
                                        <Button variant='primary' className='VoteUp'><i style={{ marginBottom: '3px' }} class="arrow up"></i></Button>
                                        <Button variant='danger' className='VoteDown'><i style={{ marginBottom: '7px' }} class="arrow down"></i></Button>
                                        (rating)
                                        <Button variant='primary' size='sm' onClick={() => this.answerStorage(data.a_id)} className='CommentButton'>Add Comment</Button><br /><br />                                  
                                            <hr className='AnswerCommentSeparator' />
                                        <br />
                                        {
                                            this.state.RecentC.map((RecentC) =>
                                                 {
                                                    console.log(data.a_id+"..."+RecentC.a_id)
                                                     if(data.a_id==RecentC.a_id){
                                                        var element=<span id={'comment' + RecentC.c_id}> <text className='CommentText'>{RecentC.comment}</text></span>
                                                     }
                                                    return( 
                                                            <div>
                                                            {element}
                                                            </div> 
                                                            
                                                    )   
                                                 }
                                            )
                                        }
                                        <br /><br />
                                            <hr className='Separator'/>

                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <CommentModal content={this.textComment()} title={"Add A Comment"} showModal={this.state.showModal} close={() => this.handleButtonToggleCommentModal(false)} />
                <footer class="py-1 sticky-bottom footer" className='FAQFooter'>
                    <div class="container">
                        <p class="m-0 text-center text-black">Copyright &copy; Max Hand 2019</p>
                    </div>
                </footer>
            </div>
        )
    }
}