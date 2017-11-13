import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost, votePost, getCommentsCount } from '../actions';
import Modal from 'react-modal';
import EditPost from './EditPost';

class Post extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    deletePost = (e, id) => {
        e.preventDefault();
        this.props.deletePost(id);
    }

    editPost = (e) => {
        e.preventDefault();
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    votePost = (e, id, vote) => {
        e.preventDefault();
        this.props.votePost(id, vote);
    }

    componentDidMount = () => {
        if (!this.props.showDetails) {
            const { id } = this.props.post;
            this.props.getCommentsCount(id);
        }
    }

    render() {

        const { showDetails } = this.props;
        let { id, timestamp, title, body, author, category, voteScore } = this.props.post;

        if (this.props.location && !this.props.post) {
            let { id, timestamp, title, body, author, category, voteScore } = this.props.location.state.post;
        }

        const dateTime = (new Date(timestamp)).toUTCString();

        return (
            <div>
                <li className="post-list-item">
                    <div className="post-voting-box" >
                        <button className="post-upvote"
                            onClick={(e) => this.votePost(e, id, "upVote")}>Upvote</button>
                        <div className="post-score">
                            <p>Score: <span>{voteScore}</span></p>
                        </div>
                        <button className="post-downvote"
                            onClick={(e) => this.votePost(e, id, "downVote")} >Downvote</button>
                    </div>
                    <div className="post-details">
                        <div className="post-info">
                            <span className="post-author">Author: {author}</span>
                            <span className="post-author">Category: {category}</span>
                            <span className="post-author">{dateTime}</span>
                        </div>
                        <h3 className="post-title">
                            {
                                showDetails
                                    ? title
                                    : <Link to={{ pathname: `/${category}/${id}`, state: { post: this.props.post, edit: false } }}
                                        className="link-button">
                                        {title}
                                    </Link>
                            }

                        </h3>
                        <p className={!showDetails ? "post-text" : ""}>{body}</p>
                        <div className="post-info">
                            {!showDetails && <span>Comments: {this.props.commentsCount[id]}</span>}
                            <div className="post-controls">

                                <a href=""
                                    className="post-edit"
                                    onClick={(e) => this.editPost(e)}>
                                    Edit
                                </a>
                                <a href=""
                                    className="post-delete"
                                    onClick={(e) => this.deletePost(e, id)}>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Modal">
                    <h3>Edit Post</h3>
                    <EditPost
                        post={this.props.post}
                        handleCloseModal={(e) => this.handleCloseModal(e)} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commentsCount: state.commentsCount
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => dispatch(deletePost(id)),
        votePost: (id, vote) => dispatch(votePost(id, vote)),
        getCommentsCount: (id) => dispatch(getCommentsCount(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
