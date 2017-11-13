import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import { fetchPosts, fetchCategories, getPostsByCategory, votePost } from '../actions';

class Post extends Component {

  onVotePostClick = (data) => {
  //alert("upVoteClicked: " + data )
    this.props.votePost(data);
  //  this.setState({ voteScore: this.props.voteScore })

  }

//  state = {
  // voteScore: this.props.voteScore
//  }




    render() {

      const { id,timestamp, title, body, author, category, voteScore } = this.props
      //const post = this.props.post

        return (
            <li key={id} className="post-list-item">
                <div className="post-voting-box" >
                    <button className="post-upvote" type="submit" onClick={() => this.onVotePostClick({id:id, option:'upVote'})}>Upvote</button>
                    <div className="post-score">
                        <p>Score: <span>{voteScore}</span></p>
                    </div>
                    <button className="post-downvote" type="submit" onClick={() => this.onVotePostClick({id:id, option:'downVote'})}>Downvote</button>
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
                    <CommentList
                      postId={id}
                    />
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
}


//const mapStateToProps = (state) => {
  //return {
  //  voteScore: state.voteScore
  //};
//};

function mapDispatchToProps (dispatch) {
  return {
    votePost: (data) => dispatch(votePost(data))

  }
}

export default connect(null, mapDispatchToProps)(Post);
