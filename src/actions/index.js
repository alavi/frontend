
//import {fetchPosts} from '../utils/api.js'
//import * as ReadableAPI from '../utils/api.js'
import * as ReadableAPI from '../utils/api';
import { push } from 'react-router-redux'
//import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const LIST_POSTS = 'LIST_POSTS'
///// copied
// general
export const IS_LOADING = 'ITEM_IS_LOADING';
export const HAS_ERROR = 'ITEM_HAS_ERROR';
export const FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';

// categories
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';

// all posts
export const GET_ALL_POSTS = 'GET_ALL_POSTS';

// single post
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST_DETAILS = 'GET_POST_DETAILS';
export const VOTE_POST = 'VOTE_POST';
//export const DOWNVOTE_POST = 'DOWNVOTE_POST';

// all comments
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';

// single comment
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPVOTE_COMENT = 'UPVOTE_COMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


// comment details
export const GET_COMMENT_DETAILS = 'GET_COMMENT_DETAILS';
export const EDIT_COMMENT_DETAILS = 'EDIT_COMMENT_DETAILS';


/////

//const url = 'http://localhost:3001/'
//const api = 'http://localhost:3001'
//const headers = { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' }
//const headers = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json' }

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3||0x8)).toString(16);
    });
    return uuid;
}

//const u = `${url}posts/`

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function deletePost(postID) {
  return {
    type: DELETE_POST,
    postID
  }
}

function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchAllPostsOld(){
  return {
    type: LIST_POSTS

  }
}

function fetchAllPosts(category) {
  console.log("inside fetchAllPosts")
  return dispatch => {
    dispatch(fetchPosts)}

  }
/*
  function fetchPosts(category) {
    return dispatch => {
      dispatch(requestPosts(category))
      return fetch(`http://localhost:3001/posts/`, { headers: headers})
       .then(response => response.json())
       //.then(data => dispatch(receivePosts(category, data)))

    }
  }
*/

// fetch posts by category
/*
export function getPostsByCategory(category) {
    return (dispatch) => {
        ReadableAPI
            .getCategoryPosts(category)
            .then(posts => dispatch({
                type: GET_CATEGORY_POSTS,
                posts
            }))
    };
};
*/
/*
export function fetchPosts() {
    return (dispatch) => {
        ReadableAPI
            .getAllPosts()
            .then(posts => dispatch({
                type: GET_ALL_POSTS,
                posts
            }))
    };
};
*/

function shouldFetchPosts(state, category) {
  const posts = state.postsByCategory[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      //return dispatch(fetchAllPosts(category))
      return dispatch(fetchPosts(category))
    }
  }
}

//// copied:


// fetch all posts from server
export function fetchPosts() {
    return (dispatch) => {
        ReadableAPI
            .getAllPosts()
            .then(posts => dispatch({
                type: GET_ALL_POSTS,
                posts
            }))
    };
};

// fetch posts by category
export function getPostsByCategory(category) {
    return (dispatch) => {
        ReadableAPI
            .getCategoryPosts(category)
            .then(posts => dispatch({
                type: GET_CATEGORY_POSTS,
                posts
            }))
    };
};

// fetch all available categories from server
export function fetchCategories() {
  console.log("action: fetchCategories")
    return (dispatch) => {
        ReadableAPI
            .getAllCategories()
            .then(categories => dispatch({
                type: GET_CATEGORIES,
                categories
            }))
    };
};

export function addPost({ id, timestamp, title, body, author, category }) {
    return {
        type: ADD_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category
    }
}

export function votePost({id, option}) {
  console.log("Inside action: votePost, option: ")
  console.log(option)
  console.log(id)
    return (dispatch) => {
        ReadableAPI
            .votePost(id, option)
            .then(dispatch({
                type: VOTE_POST,
                id,
                option
            }))
    };
};
