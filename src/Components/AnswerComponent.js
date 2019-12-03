import React from 'react';
import {Text} from 'react-bootstrap'
import './css/FAQ.css'



export default class Home extends React.Component {

    render() {

        return (
            <div>

                <body id="page-top">

                    <nav class="navbar navbar-expand-lg fixed-top" id="mainNav" style={{ backgroundColor: '#DFDFDF', borderTop: '2px solid', borderBottom: '2px solid', color: 'black', paddingTop:'0px', paddingBottom:'0px'}}>
                        <div class="container">
                            <a class="navbar-brand js-scroll-trigger" href="/"><img
                                src="Nationwide.png"
                                width="50"
                                height="50"
                                alt="Nationwide Logo"
                                style={{ borderRadius: '25px' }} /></a>
                            <h2>This is Question Number 1?</h2>
                                                        <div class="collapse navbar-collapse" id="navbarResponsive">

                            </div>
                        </div>
                    </nav>
                </body>
                <br />
                <div class="container site-container" style={{marginTop:'60px', marginBottom:'30px'}}>
                    <div class="row">
                        <div class="col-lg-8  ">
                            This is Question Number 1?<br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                    </div>
                <footer class="py-1 sticky-bottom footer" style={{ backgroundColor: '#DFDFDF',  borderTop: '2px solid', borderBottom: '2px solid', color: 'black'}}>
    <div class="container">
      <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
    </div>
  </footer>
                </div>
        )
    }
}