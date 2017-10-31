import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    GET_ALL_POSTS,
    GET_CATEGORIES,
    GET_CATEGORY_POSTS,
    ADD_POST,
    ADD_COMMENT,
    VOTE_POST,
    VOTE_DOWN_POST
} from '../actions';


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

function categories(state = [], action) {
    const { categories } = action;

    switch (action.type) {
        case GET_CATEGORIES:
            return categories;
        default:
            return state;
    }
}
/*
function food (state = {}, action) {
  switch (action.type) {
    case ADD_RECIPE :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    default :
      return state
  }
}
*/
function post(state = {}, action) {
    //const { id, timestamp, title, body, author, category,voteScore } = action;
    switch (action.type) {
      case VOTE_POST :

        const { id, option } = action
      //  return {
      //    [post.voteScore]: action.voteScore ,
      //  }
      return {
         ...state,
          }
        case ADD_POST:
            return { ...state };
        default:
            return state;
    }
}

function comment(state = [], action) {
    const { id, timestamp, body, author, parentId } = action;

    switch (action.type) {
        case ADD_COMMENT:
            return { ...state };
        default:
            return state;
    }
}

export default combineReducers({
    posts,
    post,
    categories,
    routing: routerReducer
});
