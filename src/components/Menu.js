import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
//import { fetchCategoryPosts } from '../actions';
//import {fetchPosts } from '../actions';
//import { connect } from 'react-redux';

class Menu extends Component {

    render() {
        return (
            <div className="category-menu">
                <span>Categories: </span>
                <span
                    onClick={() => this.props.onAllCategoryClick()}
                    className="category">
                    all
                </span>

                {
                    this.props.categories.map(category => (
                        <span
                            onClick={() => this.props.onCategoryClick(category.name)}
                            key={category.name}
                            className="category">
                            {category.name}
                        </span>
                    ))
                }
            </div>
        )
    }
}

Menu.propTypes = {
    categories: PropTypes.array.isRequired,
    onCategoryClick: PropTypes.func.isRequired
}

export default Menu;
