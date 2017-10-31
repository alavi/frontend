import { combineReducers } from 'redux'
import {
  LIST_POSTS,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_CATEGORY,
  DELETE_POST,
  ADD_POST,
  GET_ALL_POSTS,
  GET_CATEGORY_POSTS

} from '../actions/index.js'
import {fetchPosts} from '../utils/api.js'


const initialPostsState = {
  posts: fetchPosts()
}


function postsAll (state={}, action) {
  switch(action.type) {
    case LIST_POSTS:
    return {
      ...state,
      posts:action.posts

    }
  default:
   return state
  }
}

function selectedCategory(state = 'react', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function posts(state = [], action) {
    const { posts } = action;

    switch (action.type) {
        case GET_ALL_POSTS:
            return posts.sort((x, y) => x.voteScore < y.voteScore);
        case GET_CATEGORY_POSTS:
            return posts;
        default:
            return state;
    }
}

function postsNaser(
  state = {
    isFetching: false,
    //didInvalidate: false,
    items: initialPostsState
  },
  action
) {
  switch (action.type) {
    //case INVALIDATE_CATEGORY:
      //  return Object.assign({}, state, {
      //    didInvalidate: true
      //  })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        //didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        //didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    //case INVALIDATE_CATEGORY:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory
  //postsAll,
  //posts

})

export default rootReducer
