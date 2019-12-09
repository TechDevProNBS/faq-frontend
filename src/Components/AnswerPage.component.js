import React from 'react';
import { Button } from 'react-bootstrap';
import './css/FAQ.css'
import AnswerQuestionsModal from './AnswerModal.component'
import CommentModal from './CommentModal.component'
import DeleteAnswerModal from './DeleteAnswerModal.component'
import DeleteCommentModal from './DeleteCommentModal.component'
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
    
    handleButtonToggleCommentModal = (toggle) => {
        this.setState({
            showModal: toggle
        });
    }
    handleButtonToggleAnswerModal = (toggle) => {
        this.setState({
            showModal1: toggle
        });
    }
    handleButtonToggleDeleteAnswerModal = (toggle, a_id) => {
        this.setState({
            showModal2: toggle
        });
        var a_id = sessionStorage.setItem('a_id', a_id);
    }
    handleButtonToggleDeleteCommentModal = (toggle, c_id) => {
        this.setState({
            showModal3: toggle
        });
        var c_id = sessionStorage.setItem('c_id', c_id);
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

    editAnswer = (spanid, answer ) => {

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
        refTextInput.style.marginLeft = "20px"
        refTextInput.value = answer
        ref.appendChild(refTextInput)
        ref.appendChild(refConfirmButton)
    }
    editQuestionRating = async (id) => {
        let currentRating = ""
        let q_id = sessionStorage.getItem('q_id')
        await fetch(`http://localhost:9001/Questions/TotalRatings/${q_id}`)                                  //Url from backend
            .then(response => response.json())
            .then(dataTop => {
                
                currentRating = dataTop
            })
            
       if(id=="UP"){currentRating=currentRating+1}
      else if(id=="DOWN"){currentRating=currentRating-1}
       
       let updateRating = {
        "rating": currentRating,
        "q_id":q_id,
        "u_id":24
       }
      await fetch(`http://localhost:9001/Questions/EditQuestionRating`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRating)
    })
   
    }

    editAnswerRating = async (vote, a_id) => {
        let currentRating = ""
        await fetch(`http://localhost:9001/Answers/TotalRatings/${a_id}`)                                  //Url from backend
            .then(response => response.json())
            .then(dataTop => {
                
                currentRating = dataTop
            })
            
       if(vote=="UP"){currentRating=currentRating+1}
      else if(vote=="DOWN"){currentRating=currentRating-1}
       
       var updateRating = {
        "rating": currentRating,
        "a_id":a_id,
        "u_id":24
       }
      await fetch(`http://localhost:9001/Answers/EditAnswerRating`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRating)
    })
            console.log(currentRating)
    }
  
    editComment = (spanid, comment ) => {

        var ref = document.getElementById("comment" + spanid)
        ref.innerHTML = ""
        var refTextInput = document.createElement("TextArea");
        var refConfirmButton = document.createElement("input");
        refConfirmButton.type = "Button"
        refConfirmButton.value = "Confirm"
        refConfirmButton.className = "EditConfirm"
        refConfirmButton.addEventListener("click", function () {
            let data = {
                "c_id": spanid,
                "updC": refTextInput.value
            }
            fetch(`http://localhost:4001/Comments/UpdateC`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            window.location.replace(`http://localhost:3000/answer`)
        })
        refTextInput.style.minWidth = "40%"
        refTextInput.style.maxWidth = "40%"
        refTextInput.style.marginLeft = "80px"
        refTextInput.value = comment
        ref.appendChild(refTextInput)
        ref.appendChild(refConfirmButton)
    }



    componentDidMount = async () => {
        let Alpha = ""
        let Beta = ""
        let Gamma = ""
        var q_id = sessionStorage.getItem('q_id');
        await fetch(`http://localhost:4001/Answers/RecentA/${q_id}`)
            .then(response => response.json())

            .then(data => {
                console.log(data)
                Alpha = data
            })

        await fetch(`http://localhost:4001/Answers/CountA/${q_id}`)
            //Url from backend
            .then(response => response.json())
            .then(data => {
                Beta = data[0].hits

            })
        if (Beta > 0) {
            fetch(`http://localhost:4001/Comments/GetC/${q_id}`)
                .then(response => response.json())
                .then(dataC => {
                    Gamma = dataC
                    this.setState({
                        RecentC: dataC,
                        RecentA: Alpha,
                        CountA: Beta
                    })
                })
        }
        else {
            this.setState({
                RecentC: Gamma,
                RecentA: Alpha,
                CountA: 0
            })
        }


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
                <h4 className='QuestionHeading'> {sessionStorage.getItem('questions')}<Button variant='primary' id="upVoteQ" onClick={() => this.editQuestionRating("UP")} className='VoteUp'><i style={{ marginBottom: '3px' }} class="arrow up"></i></Button>
                    <Button variant='danger'  id="dwnVoteQ" onClick={() => this.editQuestionRating("DOWN")}  className='VoteDown'><i style={{ marginBottom: '7px' }} class="arrow down"></i></Button>
                    (rating)<br /></h4>
                <text variant='secondary' style={{ marginLeft: '40px' }}>posted on: {sessionStorage.getItem('postDQ')} @ {sessionStorage.getItem('postTQ')}</text>
                <div class="container site-container" style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <div class="row">
                        <div class="col-lg-12">
                            <h4 className='AnswersSubheading'>Answers ({this.state.CountA}): </h4><br />
                            <div className='Separator'>
                                <hr />
                            </div>
                            {
                                this.state.RecentA.map((data) =>
                                    <div>
                                        <span id={'answer' + data.a_id}> <text className='EditAnswerText'>{data.answer}</text></span>< br/>
                                        <span>posted on: {data.niceDate} @ {data.niceTime}</span>

                                        <a href='#' onClick={() => this.editAnswer(data.a_id, data.answer)} style={{ marginLeft: '20px' }}>Edit</a>
                                        <a href='#' onClick={() => this.handleButtonToggleDeleteAnswerModal(true, data.a_id)} style={{ marginLeft: '20px', marginRight: '20px' }}>Delete</a>
                                        <br /><br />
                                        <Button variant='primary' onClick={() => this.editAnswerRating("UP",data.a_id)} className='VoteUp'><i style={{ marginBottom: '3px' }} class="arrow up"></i></Button>
                                        <Button variant='danger' onClick={() => this.editAnswerRating("DOWN", data.a_id)} className='VoteDown'><i style={{ marginBottom: '7px' }} class="arrow down"></i></Button>
                                        (rating)
                                        <Button variant='primary' size='sm' onClick={() => this.answerStorage(data.a_id)} className='CommentButton'>Add Comment</Button><br /><br />
                                        <hr className='AnswerCommentSeparator' />
                                        <br />
                                        {
                                            this.state.RecentC.map((RecentC) => {
                                                if (data.a_id == RecentC.a_id) {
                                                    var element = <div><span id={'comment' + RecentC.c_id}> <text className='CommentText' className='CommentBox'>{RecentC.comment}</text></span><br/>
                                                    <span style={{ marginLeft: '55px' }}>posted on: {RecentC.niceDate}</span><br />
                                                    <span style={{ marginLeft: '55px' }}>@ {RecentC.niceTime}</span>
                                                    <a href='#' onClick={() => this.editComment(RecentC.c_id, RecentC.comment)} style={{ marginLeft: '20px' }}>Edit</a>
                                                    <a href='#' onClick={() => this.handleButtonToggleDeleteCommentModal(true, RecentC.c_id)} style={{ marginLeft: '20px', marginRight: '20px' }}>Delete</a>
                                                    <br/><br/><br/>
                                                    
                                                    </div>
                                                    
                                                }
                                                return (
                                                    <div>
                                                        {element}                                                        
                                                    </div>

                                                )
                                            }
                                            )
                                        }
                                        <br /><br />
                                        <hr className='Separator' />

                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <DeleteAnswerModal title={"Delete Confirmation"} showModal2={this.state.showModal2} close={() => this.handleButtonToggleDeleteAnswerModal(false)} />
                <DeleteCommentModal title={"Delete Confirmation"} showModal3={this.state.showModal3} close={() => this.handleButtonToggleDeleteCommentModal(false)} />
                <CommentModal content={this.textComment()} title={"Add A Comment"} showModal={this.state.showModal} close={() => this.handleButtonToggleCommentModal(false)} />
                <footer class="py-1 sticky-bottom footer" className='FAQFooter'>
                    <div class="container">
                        <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                    </div>
                </footer>
            </div>
        )
    }
}