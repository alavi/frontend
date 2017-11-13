import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    GET_CATEGORIES,
    GET_ALL_POSTS,
    GET_POST,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    VOTE_POST,
    GET_POST_COMMENTS,
    GET_COMMENT,
    ADD_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT,
    DELETE_COMMENT,
    GET_POST_COMMENTS_COUNT
} from '../actions';

function posts(state = [], action) {
    const { posts, post, commentsCount, id } = action;

    switch (action.type) {
        case GET_ALL_POSTS:
            return posts;
        case ADD_POST:
            return [...state, post];
        case EDIT_POST:
        case VOTE_POST:
            return state.map(item => (item.id === post.id ? post : item))
        case DELETE_POST:
            return state.filter((item) => item.id !== post.id);
        default:
            return state;
    }
};

function categories(state = [], action) {
    const { categories } = action;

    switch (action.type) {
        case GET_CATEGORIES:
            return categories;
        default:
            return state;
    }
};

function post(state = [], action) {
    const { post, commentsCount } = action;

    switch (action.type) {
        case GET_POST:
        case VOTE_POST:
            return post;
        default:
            return state;
    }
};

function postComments(state = [], action) {
    const { comments, comment } = action;

    switch (action.type) {
        case GET_POST_COMMENTS:
            return comments;
        case ADD_COMMENT:
            return [...state, comment];
        case DELETE_COMMENT:
            return state.filter((item) => item.id !== comment.id);
        case EDIT_COMMENT:
        case VOTE_COMMENT:
            return state.map(item => (item.id === comment.id ? comment : item))
        default:
            return state;
    }
};

function comment(state = [], action) {
    const { comment } = action;

    switch (action.type) {
        case GET_COMMENT:
        case VOTE_COMMENT:
            return comment;
        default:
            return state;
    }
};

function commentsCount(state = {}, action) {
    const { commentsCount, id } = action;

    switch (action.type) {
        case GET_POST_COMMENTS_COUNT:
            return {
                ...state, [id]: commentsCount
            }
        default:
            return state;
    }
}

export default combineReducers({
    post,
    posts,
    comment,
    postComments,
    commentsCount,
    categories,
    routing: routerReducer
});
