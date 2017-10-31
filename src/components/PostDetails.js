import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Post extends Component {

    render() {

        const { timestamp, title, body, author, category, voteScore } = this.props;
        return (
            <li className="post-list-item">
                <div className="post-voting-box" >
                    <button className="post-upvote" onClick={this.onUpVotePostClick}>Upvote</button>
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
                    <h3>Post 1</h3>
                    <p>Post body</p>
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
    onUpVotePostClick: PropTypes.func.isRequired
}

export default Post;
