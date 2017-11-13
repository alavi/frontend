import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import { uuid } from '../utils/helpers';

class AddPost extends Component {
    state = {
        title: "",
        body: "",
        author: "",
        isTitleValid: false,
        isBodyValid: false,
        isAuthorValid: false,
        showErrorMsg: false
    }

    isFormValid = () => {
        return this.state.isTitleValid && this.state.isBodyValid && this.state.isAuthorValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            showErrorMsg: true
        })
        if (this.isFormValid()) {
            const values = serializeForm(e.target, { hash: true })
            values["id"] = uuid();
            values["timestamp"] = Date.now();
            this.props.addPost(values);
        }
    }

    handleChange = (e) => {
        switch (e.target.name) {
            case "title":
                this.setState({
                    title: e.target.value,
                    isTitleValid: !!e.target.value
                })
                return;
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

    render() {
        const { categories } = this.props;

        return (
            <div>
                {!this.isFormValid() && this.state.showErrorMsg && <div className="error-msg text-center">Fill all form fiels</div>}
                <form className="create-post-form" onSubmit={this.handleSubmit}>
                    <div className="create-post-details">
                        <input type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => this.handleChange(e)} />
                        <textarea name="body"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Type your text here"/>
                        <input type="text"
                            onChange={(e) => this.handleChange(e)}
                            name="author"
                            placeholder="Author" />
                        <select name="category" defaultValue="react">
                            {
                                categories.map((category) => (
                                    <option key={category.path} value={category.path}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="create-post-details">
                        <button>Add Post</button>
                    </div>
                </form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {

    return {
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (body) => dispatch(addPost(body)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
