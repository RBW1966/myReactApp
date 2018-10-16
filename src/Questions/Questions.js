import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import axios from 'axios';
import auth0Client from '../Auth';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  async componentDidMount() {
    const DEMO_TOKEN = auth0Client.getIdToken();

    console.log('DEMO_TOKEN=' + DEMO_TOKEN);
    // const questions = (await axios.get('http://localhost:8081/')).data;
    // this.setState({
    //   questions,
    // });
    if (auth0Client.isAuthenticated()) {
    fetch("http://localhost:8081/", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + DEMO_TOKEN
      }
    })
    .then((response) => {
      return response.text();
    })
    .then(data => {
      console.log(data);
    })
    }
  }
  // async _getProtectedQuote() {
  //   var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  //   fetch("http://localhost:3001/api/protected/random-quote", {
  //     method: "GET",
  //     headers: {
  //       'Authorization': 'Bearer ' + DEMO_TOKEN
  //     }
  //   })
  //   .then((response) => response.text())
  //   .then((quote) => {
  //     AlertIOS.alert(
  //       "Chuck Norris Quote:", quote)
  //   })
  //   .done();
  // },

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.questions === null && <p>Loading questions...</p>}
          {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Answers: {question.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
export default Questions;