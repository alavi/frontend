import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { getPostComments, addComment } from '../actions';
import { uuid } from '../utils/helpers';
import serializeForm from 'form-serialize';

class CommentList extends Component {

    state = {
        body: "",
        author: "",
        isBodyValid: false,
        isAuthorValid: false
    }

    componentDidMount = () => {
        const { postId } = this.props;
        this.props.getPostComments(postId);
    }

    handleSubmit = (e) => {
        if (this.isFormValid()) {
            e.preventDefault();
            const values = serializeForm(e.target, { hash: true })
            values["id"] = uuid();
            values["timestamp"] = Date.now();
            values["parentId"] = this.props.postId;
            this.props.addComment(values);
        }
    }

    handleChange = (e) => {
        switch (e.target.name) {
            case "body":
                this.setState({
                    body: e.target.value,
                    isBodyValid: !!e.target.value
                })
                return;
            case "author":
                this.setState({
                    author: e.target.value,
                    isAuthorValid: !!e.target.value
                })
                return;
            default:
                return;
        }
    }

    isFormValid = () => {
        return this.state.isBodyValid && this.state.isAuthorValid;
    }

    render() {
        const { comments } = this.props;
        let sortedComments = comments.sort((x, y) => x.voteScore <= y.voteScore)

        return (
            <div className="list-posts">
                <p className="container-text">Comment(s):{comments.length}</p>

                <ol className="post-list">
                    {
                        sortedComments.length ?
                            sortedComments.map((comment, i) => (
                                <Comment key={i} comment={comment} />
                            ))
                            : (<div className="no-results">There is no comments on this post, you can be the first to add comment.</div>)
                    }
                </ol>
                <form
                    className="container-text create-comment"
                    onSubmit={this.handleSubmit}>
                    <div>
                        <textarea name="body"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Type your text here" />
                        <input name="author"
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            placeholder="Athor" />

                    </div>
                    <div className="create-post-details">
                        <button disabled={!this.isFormValid()}>Add Comment</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { postComments } = state;
    return {
        comments: postComments
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostComments: (id) => dispatch(getPostComments(id)),
        addComment: (body) => dispatch(addComment(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
