import React, { Component } from 'react';
import Post from './Post';
import {PropTypes} from 'prop-types';

class PostList extends Component {

    render() {
        console.log("inside PostList")
        const { posts } = this.props;

        return (

            <div className="list-posts">
                <ol className="post-list">
                    {
                        posts.length?
                        posts.map(post => (
                            <Post
                                key={post.id}
                                id={post.id}
                                timestamp={post.timestamp}
                                title={post.title}
                                body={post.body}
                                author={post.author}
                                category={post.category}
                                voteScore={post.voteScore}
                                //onUpVotePostClick={post.onUpVotePostClick}
                            />
                        ))
                        : (<div className="no-results">no results</div>)
                    }
                </ol>
            </div>
        )
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList;
