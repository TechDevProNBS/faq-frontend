import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'
import './css/FAQ.css'
import AskQuestionModal from './AskQuestionModal.component'
import { TextArea } from 'semantic-ui-react'

export default class Home extends React.Component {
    constructor() {
        super();

        this.state = {                                                        //this.state represent the rendered values, i.e. what’s currently on the screen
            RecentQ: [],
            UnansweredQ: [],
            TopRatedQ: [],
            showIssueModal: true
            //Name of what you want 
        }
    }

    Qstorage(question) {
        sessionStorage.setItem('questions', question)
    }

    componentDidMount = () => {
        let dataUnanswered = ""
        let dataRecent = ""

        fetch("http://localhost:4001/Questions/RecentQ")                         //Url from backend
            .then(response => response.json())
            .then(dataRe => {
                dataRecent = dataRe;
            })
        fetch("http://localhost:4001/Questions/UnansweredQ")                                  //Url from backend
            .then(response => response.json())
            .then(dataUn => {
                dataUnanswered = dataUn
            })
        fetch("http://localhost:4001/Questions/TopRatedQ")                                  //Url from backend
            .then(response => response.json())
            .then(dataTop => {

                this.setState({
                    RecentQ: dataRecent,
                    UnansweredQ: dataUnanswered,
                    TopRatedQ: dataTop
                })
            })
    }

    handleButtonToggleAskModal = (toggle) => {

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

                            <Form inline>
                                <FormControl type="text" spellcheck='true' size="sm" placeholder="Search..." className="mr-sm-1" style={{ borderRadius: '25px', width: '250px' }} />
                            </Form>
                            <div class="collapse navbar-collapse" id="navbarResponsive">

                            </div>
                        </div>
                    </nav>
                </body>
                <br />

                <div class="container" style={{ marginTop: '60px', marginBottom: '30px' }}>
                    <div class="row">
                        <div class="col-lg-8  ">
                            <h3 style={{ color: '#3252A4' }}>Trending Questions</h3>
                            <p class="lead"></p>
                            {
                                this.state.TopRatedQ.map((data, index) =>

                                    <div>
                                        <a href="/answer" onClick={() => this.Qstorage(data.question)}>{index + 1}) {data.question}</a><br />
                                        <br />
                                    </div>
                                )}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 ">
                            <h3 style={{ color: '#3252A4' }}>Questions Which Need Answers</h3>
                            <p class="lead"></p>
                            {
                                this.state.UnansweredQ.map((data, index) =>
                                    <div>
                                        <a href="/answer" onClick={() => this.Qstorage(data.question)}>{index + 1}) {data.question}</a><br />
                                        <br />
                                    </div>
                                )}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <h3 style={{ color: '#3252A4' }}>Recently Posted Questions</h3>
                            <p class="lead"></p>
                            {
                                this.state.RecentQ.map((data, index) =>
                                    <div>
                                        <a href="/answer" onClick={() => this.Qstorage(data.question)}>{index + 1}) {data.question}</a><br />
                                        <br />
                                    </div>
                                )}

                        </div>
                    </div>
                </div>
               <center>
                    <Button variant='danger' onClick={() => this.handleButtonToggleAskModal(true)} style={{ height: '25px', paddingTop: '0' }}>Ask A Question</Button>
                    </center>
                    <AskQuestionModal content={this.textAnswer()} title={"Ask A Question"} showModal={this.state.showModal} close={() => this.handleButtonToggleAskModal(false)} /><br /><br />
                <footer class="py-1 sticky-bottom" style={{ backgroundColor: '#DFDFDF', borderTop: '2px solid', borderBottom: '2px solid', color: 'black' }}>
                    <div class="container">
                        <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                    </div>
                </footer>
            </div>
        )
    }
}
