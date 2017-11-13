import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import CommentList from './CommentList';
import Post from './Post';
import { Link } from 'react-router-dom';

class PostDetails extends Component {

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    render() {
        const { post } = this.props;
        const { id } = this.props.match.params;

        return (
            <div>
                {Object.keys(post).length !== 0 && <div>
                    <Post post={post} showDetails={true} />
                    <CommentList postId={id} />
                </div>}
                {Object.keys(post).length === 0 && <div className="text-center">
                    <h3 className="container-text text-center">No such post</h3>
                    <Link to={'/'}>return home</Link>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { post, posts } = state;
    return {
        post: post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(fetchPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
