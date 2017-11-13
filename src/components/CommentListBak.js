import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { getPostComments } from '../actions';

class CommentList extends Component {
    componentDidMount = () => {
        const { postId } = this.props.postdId;
        this.setState({ comments: this.props.getPostComments(postId)});
    }

    render() {
        const { comments } = this.props;

        return (
            <div className="list-posts">
                <ol className="post-list">
                    {
                      comments.length ?
                            comments.map(comment => (
                                <Comment key={comment.id} comment={comment} />
                            ))
                            : (<div className="no-results">no results</div>)
                    }
                </ol>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { postComments } = state;
    return {
        comments: postComments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostComments: (id) => dispatch(getPostComments(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
