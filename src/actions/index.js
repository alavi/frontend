import * as ReadableAPI from '../utils/api';
import { push } from 'react-router-redux'
//import fetch from 'isomorphic-fetch'

//export const REQUEST_POSTS = 'REQUEST_POSTS'
//export const RECEIVE_POSTS = 'RECEIVE_POSTS'
//export const SELECT_CATEGORY = 'SELECT_CATEGORY'

//export const LIST_POSTS = 'LIST_POSTS'
///// copied
// general
export const IS_LOADING = 'ITEM_IS_LOADING';
export const HAS_ERROR = 'ITEM_HAS_ERROR';
export const FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';

// categories
export const GET_CATEGORIES = 'GET_CATEGORIES';
//export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';

// all posts
export const GET_ALL_POSTS = 'GET_ALL_POSTS';

// single post
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
//export const GET_POST_DETAILS = 'GET_POST_DETAILS';
export const VOTE_POST = 'VOTE_POST';
export const EDIT_POST = 'EDIT_POST';
//export const DOWNVOTE_POST = 'DOWNVOTE_POST';

// all comments
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';

// single comment
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
//export const UPVOTE_COMENT = 'UPVOTE_COMENT';
//export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const GET_POST_COMMENTS_COUNT = 'GET_POST_COMMENTS_COUNT'
export const SORT_POSTS_BY_DATE = 'SORT_POSTS_BY_DATE';
export const SORT_POSTS_BY_SCORE = 'SORT_POSTS_BY_SCORE';


// comment details
//export const GET_COMMENT_DETAILS = 'GET_COMMENT_DETAILS';
//export const EDIT_COMMENT_DETAILS = 'EDIT_COMMENT_DETAILS';
export const GET_COMMENT = 'GET_COMMENT';

// Generate a unique token for storing your bookshelf data on the backend server.
/*
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};
*/
/*
export function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3||0x8)).toString(16);
    });
    return uuid;
*};
*/
/*
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
};
*/
export function deletePost(postId) {
  return (dispatch) => {
        ReadableAPI
            .deletePostById(postId)
            .then(post => {
                dispatch({
                    type: DELETE_POST,
                    post
                });
                dispatch(push('/'));
            })
    }
};

export function editPost(id, body) {
    return (dispatch) => {
        ReadableAPI
            .editPost(id, body)
            .then(post => {
                dispatch({
                    type: EDIT_POST,
                    post
                })
                dispatch({
                    type: GET_POST,
                    post
                })
                dispatch(push(`/posts/${id}`))
            })
    }
};
/*
function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
};
*/
/*
function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
};
*/
/*
function fetchAllPostsOld(){
  return {
    type: LIST_POSTS

  }
};
*/
function fetchAllPosts(category) {
  console.log("inside fetchAllPosts")
  return dispatch => {
    dispatch(fetchPosts)}

};
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

export function fetchPost(id) {
    return (dispatch) => {
        ReadableAPI
            .fetchPost(id)
            .then(post => dispatch({
                type: GET_POST,
                post
            }))
    };
};

function shouldFetchPosts(state, category) {
  const posts = state.postsByCategory[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
};

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      //return dispatch(fetchAllPosts(category))
      return dispatch(fetchPosts(category))
    }
  }
};

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
    }
};
/*
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
*/
export function getPostComments(postId) {
    console.log("inside getPostComments action. postId: ")
    console.log(postId)
    return (dispatch) => {
        ReadableAPI
            .fetchCommetsByPostId(postId)
            .then(comments => dispatch({
                type: GET_POST_COMMENTS,
                comments
            }))
    }
};

export function getComment(id) {
    return (dispatch) => {
        ReadableAPI
            .fetchComment(id)
            .then(comment => dispatch({
                type: GET_COMMENT,
                comment
            }))
    };
};

export function addComment(body) {
    return (dispatch) => {
        ReadableAPI
            .addComment(body)
            .then(comment => {
                dispatch({
                    type: ADD_COMMENT,
                    comment
                })
            })
    }
};

export function getCommentsCount(id) {
    return (dispatch) => {
        ReadableAPI
            .fetchPostCommentsCount(id)
            .then(commentsCount => dispatch({
                type: GET_POST_COMMENTS_COUNT,
                commentsCount,
                id
            }))
    }
};

export function deleteComment(id) {
    return (dispatch => {
        ReadableAPI
            .deleteCommentById(id)
            .then(comment => {
                dispatch({
                    type: DELETE_COMMENT,
                    comment
                })
            })
    })
};

export function editComment(id, body) {
    return (dispatch) => {
        ReadableAPI
            .editComment(id, body)
            .then(comment => {
                dispatch({
                    type: EDIT_COMMENT,
                    comment
                })
            })
    }
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
/*
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
*/
export function addPost(body) {
    return (dispatch) => {
        ReadableAPI
            .addPost(body)
            .then(post => {
                dispatch({
                    type: ADD_POST,
                    post
                });
                dispatch(push('/'));
            })
    }
};

export function votePost(id, vote) {
    let values = {};
    values["option"] = vote;
    return (dispatch) => {
        ReadableAPI
            .votePost(id, values)
            .then(post => {
                        dispatch({
                            type: VOTE_POST,
                            post
                        });

                })
            }
};
/*
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
*/
export function voteComment(id, option) {
  let values = {};
  values["option"] = option;
  console.log(id)
    return (dispatch) => {
        ReadableAPI
            .voteComment(id, values)
            .then(comment =>
                dispatch({
                type: VOTE_COMMENT,
                comment
            }))
    };
};

export function sortPostsByDate(posts) {
    return {
        type: SORT_POSTS_BY_DATE,
        posts
    }
};
export function sortPostsByScore(posts) {
    return {
        type: SORT_POSTS_BY_SCORE,
        posts
    }
};
