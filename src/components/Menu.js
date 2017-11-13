import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPosts, fetchCategories } from '../actions';

class Menu extends Component {

    componentDidMount = () => {
        this.props.getAllCategories();
    }

    render() {

        const { categories } = this.props;

        return (
            <div className="category-menu">
                <span>Categories: </span>
                <Link to={`/`}
                    className="category">
                    all
                </Link>
                {
                    categories.map(category => (
                        <Link to={`/${category.name}`}
                            key={category.name}
                            className="category">
                            {category.name}
                        </Link>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        categories: state.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(fetchPosts()),
        getAllCategories: () => dispatch(fetchCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
