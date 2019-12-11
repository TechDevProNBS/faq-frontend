import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import AskQuestionModal from './AskQuestionModal.component'
import { Form, FormControl, Button } from 'react-bootstrap'
import './css/FAQ.css'
import { TextArea } from 'semantic-ui-react'

class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filteredResults: []
        }
    }

    textAnswer = () => {
        return (
            <TextArea id="textQuestion" style={{ maxWidth: '100%', minWidth: '100%' }} />

        );
    }

    search = (e) => {
        e.preventDefault();

        var initialString = document.getElementById("searchText").value
        var queryString = initialString.replace(/[^a-zA-Z ]/g, "")
        fetch(`http://localhost:4001/Questions/SearchQ/${queryString}`)
            .then(response => response.json())
            .then(data => {
                JSON.stringify(data)
                
                this.props.myRef.setState(
                    {
                        filteredResults: data,
                        filteredResults: JSON.stringify(data)
                }, () => this.state.filteredResults)})
                sessionStorage.setItem('search', 1)
            }
    renderHomepage() {
        sessionStorage.setItem('search', 2)
    }
    callchange = (e) => {
       // console.log(e.keyCode)
        if (e.keyCode == 13) {
            this.search(e)
        }
    }
    render(){
        if (sessionStorage.getItem('search') == 1) {
        return(
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
                                 <div className='searchBar'> 
                                <Form inline>
                                    <input id="searchText" onKeyDown={this.callchange} spellcheck='true' size="sm" placeholder="Search..." className="mr-sm-1 searchBarText" />
                                <button className='searchButton' onClick={this.search}><img src="search.png" width='30px' height='30px'></img></button>
                                </Form>
                                </div>
                                <div class="collapse navbar-collapse" id="navbarResponsive">

                                </div>
                            </div>
                        </nav>
                    </body>
                    </div>
        )
        }
    else if (sessionStorage.getItem('search') == 2) {
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
                         <div className='searchBar'> 
                        <Form inline>
                            <input id="searchText" onKeyDown={this.callchange} spellcheck='true' size="sm" placeholder="Search..." className="mr-sm-1 searchBarText" />
                        <button className='searchButton' onClick={this.search}><img src="search.png" width='30px' height='30px'></img></button>
                        </Form>
                        </div>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                        </div>
                    </div>
                </nav>
            </body>
            <br />
            <div className="container" style={{ marginTop: '60px', marginBottom: '30px' }}>
                <div class="row">
                    <div class="col-lg-8  ">
                        <h3 style={{ color: '#3252A4' }}>Search Results:</h3>
                        <p class="lead"></p>
                        {
                            this.state.filteredResults.map((data, index) =>
                                <div>
                                    <a href="/answer" onClick={() => this.Qstorage(data.question, data.q_id, data.niceDate, data.niceTime)}>{index + 1}) {data.question}</a><br />
                                    <br />
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <center>
                <div style={{ marginTop: '210px' }}>Not found what you were looking for?</div><br />
                <Button variant='danger' onClick={() => this.handleButtonToggleAskModal(true)} style={{ height: '25px', paddingTop: '0' }}>Ask A Question</Button>
            </center>
            <AskQuestionModal content={this.textAnswer()} title={"Ask A Question"} showModal={this.state.showModal} close={() => this.handleButtonToggleAskModal(false)} /><br />
            <footer className='py-1  FAQFooter'>
                <div class="container">
                    <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                </div>
            </footer>
        </div>
        )
    }
}
}
export default Search;
