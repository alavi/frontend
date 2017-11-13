import React, { Component } from 'react';
import '../assets/styles/App.css';
import Menu from './Menu';
import PostList from './PostList'
import PostDetails from './PostDetails';
import AddPost from './AddPost';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="App-title">Readable</h1>
          </header>
          <Menu />
          <div className="container">
            <Switch>
              <Route
                exact path="/:category?"
                component={PostList} />
              <Route
                exact path="/posts/add"
                component={AddPost} />
              <Route
                exact path="/:category/:id"
                component={PostDetails} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;