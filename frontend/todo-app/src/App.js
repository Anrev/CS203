import './App.css';
import './Bootstrap.css'
// Default export from React (React) is directly usable, but Component is not default so it has to be in curly brace.
import React, { Component } from 'react';

// import FirstComponent from './Components/learning-examples/FirstComponent'
// import SecondComponent from './Components/learning-examples/SecondComponent'
// import ThirdComponent from './Components/learning-examples/ThirdComponent'
// import Counter from './Components/counter/Counter'

import TodoApp from './Components/todo/TodoApp'

// Root Component of entire React App. Calls TodoApp.
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter/>*/}
        <TodoApp/>
      </div>
    );
  }
}

// // First lesson
// class LearningComponents extends Component {
//   // JSX (new version of JavaScript - compiled to Babel)
//   render() {
//     return (
//       <div className="LearningComponents">
//         Hello World
//         <FirstComponent></FirstComponent>
//         <SecondComponent></SecondComponent>
//         <ThirdComponent></ThirdComponent>
//       </div>
//     );
//   }
// }


export default App;
