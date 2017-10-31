import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common['Authorization'] = 'OK'

const api = {

fetchCategories: () => (
axios.get('categories').then(
(response) => (response.data)
).then((data) => (data))
)
}
export default api

//
<div id="parent"><ListPostsContainer .../><SetCategory/></div>

import api from 'utils/api'
export const getCategories = ({categories}) => (
  {
    type: GET_CATEGORIES,
    categories
  }
);

export const asyncGetCategories = (dispatch) => () => {
  api
    .fetchCategories()
    .then(categories => dispatch(getCategories(categories)))
};

import asyncGetCategories from 'where you put it'
function mapDispatchToProps(dispatch){
  return{
    getCategories: asyncGetCategories(dispatch),
  }
}

componentWillMount(){
      this.props.getCategories()
  }

// Redux thunk
