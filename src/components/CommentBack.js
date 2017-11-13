import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Comment extends Component {

    render() {
        const { comment } = this.props;
        return (
            <li className="comment-list-item">
                <div className="post-details">
                    <div className="post-info">
                        <span className="post-author">Author: {comment.author}</span>
                        <span className="post-author">{comment.timestamp}</span>
                    </div>
                    <p>{comment.body}</p>
                    <div className="post-info">
                        <button className="post-downvote">Downvote</button>
                        <span>Score: {comment.voteScore}</span>
                        <button className="post-upvote">Upvote</button>
                        <a href="" className="post-edit">Edit</a>
                        <a href="" className="post-delete">Delete</a>
                    </div>
                </div>
            </li>
        )
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment;