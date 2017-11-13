import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { fetchPosts, sortPostsByDate, sortPostsByScore } from '../actions';
import { Link } from 'react-router-dom';

class PostList extends Component {

    state = {
        sort: "byScore"
    }

    componentDidMount = () => {
        this.props.getAllPosts();
    }

    onSortMethodChange = (e) => {
        switch (e.target.value) {
            case "date":
                this.setState({ sort: "byDate" })
                return;
            case "score":
                this.setState({ sort: "byScore" })
                return;
            default:
                return;
        }
    }

    render() {
        const { posts } = this.props;
        const { category } = this.props.match.params;

        let postsByCategory = category
            ? posts.filter((post) => post.category === category)
            : posts;

        let postList = [];

        if (this.state.sort === "byDate")
            postList = postsByCategory.sort((x, y) => x.timestamp <= y.timestamp);
        if (this.state.sort === "byScore")
            postList = postsByCategory.sort((x, y) => x.voteScore <= y.voteScore);

        return (
            <div className="list-posts">
                <Link to={`/posts/add`} className="container-text">Add new post</Link>
                {postList.length > 1 && <select
                    className="container-text"
                    name="category"
                    defaultValue="react"
                    onChange={(e) => this.onSortMethodChange(e)}>
                    <option value="score">Sort by score</option>
                    <option value="date">Sort by date</option>
                </select>}
                <ol className="post-list">
                    {
                        postList.length ?
                            postList.map((post, i) => (
                                <Post key={i}
                                    post={post}
                                    showDetails={false} />
                            ))
                            : (<div className="no-results">no results</div>)
                    }
                </ol>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(fetchPosts()),
        sortPostsByDate: (posts) => dispatch(sortPostsByDate(posts)),
        sortPostsByScore: (posts) => dispatch(sortPostsByScore(posts)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
