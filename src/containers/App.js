import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectCategory,
  fetchPostsIfNeeded
//  invalidateCategory
} from '../actions/index'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    console.log("inside componentDidMount")
    const { dispatch, selectedCategory } = this.props
    console.log(dispatch)
    console.log(selectedCategory)
    dispatch(fetchPostsIfNeeded(selectedCategory))
  }

  componentDidUpdate(prevProps) {
    console.log("inside componentDidUpdate")
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      const { dispatch, selectedCategory } = this.props
      dispatch(fetchPostsIfNeeded(selectedCategory))
    }
  }

  handleChange(nextCategory) {
    this.props.dispatch(selectCategory(nextCategory))
    this.props.dispatch(fetchPostsIfNeeded(nextCategory))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedCategory } = this.props
  //  dispatch(invalidateCategory(selectedCategory))
    dispatch(fetchPostsIfNeeded(selectedCategory))
  }

  render() {
    const { selectedCategory, posts, isFetching, lastUpdated } = this.props
    console.log (this.props)
    console.log ("this is posts:")
    console.log(posts)
    return (
      <div>
      <Picker
        value={selectedCategory}
        onChange={this.handleChange}
        options={['react', 'redux', 'udacity']}
      />

        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>}
      </div>
    )
  }
}

App.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedCategory, postsByCategory } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }

  return {
    selectedCategory,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
