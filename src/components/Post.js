import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories, getPostsByCategory, votePost } from '../actions';

class Post extends Component {

  onUpVotePostClick = (id) => {
  alert("upVoteClicked: " + id )
    this.props.UpVotePost(id);
  }

    render() {

      const { id,timestamp, title, body, author, category, voteScore } = this.props;
      //const post  = this.props.post
        return (
            <li key={id} className="post-list-item">
                <div className="post-voting-box" >
                    <button className="post-upvote" type="submit" onClick={() => this.onUpVotePostClick(id)}>Upvote</button>
                    <div className="post-score">
                        <p>Score: <span>{voteScore}</span></p>
                    </div>
                    <button className="post-downvote">Downvote</button>
                </div>
                <div className="post-details">
                    <div className="post-info">
                        <span className="post-author">Author: {author}</span>
                        <span className="post-author">Category: {category}</span>
                        <span className="post-author">{timestamp}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <div className="post-info">
                        <a href="" className="post-comments">Comments: 34</a>
                        <a href="" className="post-edit">Edit</a>
                        <a href="" className="post-delete">Delete</a>
                    </div>
                </div>
            </li>
        )
    }
}

Post.propTypes = {
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    //onUpVotePostClick: PropTypes.func.isRequired
}

//export default Post;

const mapStateToProps = (state) => {
  return {
    post: state.post
    //categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpVotePost: (id) => dispatch(votePost(id,'upVote'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
