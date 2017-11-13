import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment, voteComment } from '../actions'
import Modal from 'react-modal';
import EditComment from './EditComment';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    deleteComment = (e, id) => {
        e.preventDefault();
        this.props.deleteComment(id);
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    editComment = (e, id) => {
        e.preventDefault();
        this.setState({
            showModal: true
        })
    }

    voteComment = (e, id, vote) => {
        e.preventDefault();
        this.props.voteComment(id, vote);
    }

    render() {
        const { comment } = this.props;
        const dateTime = (new Date(comment.timestamp)).toUTCString();

        return (
            <li className="comment-list-item">
                <div className="post-details">
                    <div className="post-info">
                        <span className="post-author">Author: {comment.author}</span>
                        <span className="post-author">{dateTime}</span>
                    </div>
                    <p>{comment.body}</p>
                    <div className="post-info">
                        <button className="post-downvote" onClick={(e) => this.voteComment(e, comment.id, "downVote")}>Downvote</button>
                        <span>Score: {comment.voteScore}</span>
                        <button className="post-upvote" onClick={(e) => this.voteComment(e, comment.id, "upVote")}>Upvote</button>
                        <a href=""
                            className="post-edit"
                            onClick={(e) => this.editComment(e)}>Edit</a>
                        <a href=""
                            className="post-delete"
                            onClick={(e) => this.deleteComment(e,comment.id)}>Delete</a>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Modal">
                    <h3>Edit Comment</h3>
                    <EditComment comment={comment} handleCloseModal={()=>this.handleCloseModal()} />
                </Modal>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (id) => dispatch(deleteComment(id)),
        voteComment: (id, vote) => dispatch(voteComment(id, vote))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
