import React, { Component } from 'react';
import '../assets/styles/App.css';
import Header from './Header';
import PostList from './PostList';
import AddPost from './AddPost';
import PostDetails from './PostDetails';
import Post from './Post'
import Menu from './Menu';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories, getPostsByCategory } from '../actions';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  componentDidMount = () => {
    this.props.getAllCategories();
    this.props.getAllPosts();
  }

  render() {
    const { posts, categories } = this.props;


    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div>
            <Header title={"all posts"} />

              <Menu
                categories={this.props.categories}
                onCategoryClick={this.props.getPostsByCategory}
                onAllCategoryClick={this.props.getAllPosts}
              />
              <div className="container">
                <Link to={`/posts/add`} className="container-text">Add new post</Link>

              <Switch>
                  <Route
                    exact path="/posts/add" render={() => (
                    <AddPost posts={posts} />
                    )}
                  />
                  <Route
                    exact path="/" render={() => (
                    <PostList posts={posts} />
                    )}
                  />

                </Switch>


              </div>
          </div>
        )} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: () => dispatch(fetchPosts()),
    getAllCategories: () => dispatch(fetchCategories()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
