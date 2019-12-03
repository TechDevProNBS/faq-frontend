<div className="container">
    <div clasName="row">
        <div className="col">

            <div id='Question' className="container" style={{ visibility: 'hidden', width: '500px', borderRadius: '25px', backgroundColor: '#5aa3f2', border: '2px solid', borderColor: 'red', float: 'center', position: 'relative', top: '20px' }}>
                <div clasName="row">
                    <div className="col">
                        <div>
                            <center>
                                <Form style={{ color: 'white' }}>
                                    <br />
                                    <center><h3>Question Form</h3></center>
                                    <Form.Group controlId="Question"><br />
                                        <Form.Label style={{ color: 'white' }}>Please Enter The Question You Would Like to Ask:</Form.Label>
                                        <form class="ui form"><textarea style={{ width: '400px', height: '100px' }} placeholder="Question..." rows="3"></textarea></form>
                                    </Form.Group>
                                    <center>
                                        <Button onClick={() => this.CloseQuestion()} variant="secondary" type="submit" style={{ marginRight: '5px' }}>
                                            Close
                                            </Button>
                                        <Button variant="danger" type="submit">
                                            Submit
                                             </Button>
                                        <br /><br />
                                    </center>
                                </Form>
                                <div className="multiline" style={{ float: 'right', position: 'relative', left: '55px', top: '5px' }}>
                                    <Button variant="danger" onClick={() => this.OpenQuestion()}>Create a Question</Button>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>