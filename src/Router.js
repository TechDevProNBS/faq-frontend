import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from './Components/FAQMainPage'
import AnswerPage from './Components/AnswerComponent'

class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Router>
                        <div>
                            <Route exact path="/" component={MainPage} />
                            <Route exact path="/answer" component={AnswerPage} />
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
}
export default App;
