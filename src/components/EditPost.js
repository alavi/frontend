import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { editPost } from '../actions';

class EditPost extends Component {

    state = {
        title: "",
        body: "",
        isTitleValid: false,
        isBodyValid: false
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
            default:
                return;
        }
    }

    isFormValid = () => {
        return this.state.isTitleValid && this.state.isBodyValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isFormValid()) {
            const { id } = this.props.post;
            const values = serializeForm(e.target, { hash: true })
            values.timestamp = Date.now();
            this.props.editPost(id, values);
            this.props.handleCloseModal();
        }
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.handleCloseModal();
    }

    componentDidMount = () => {
        const { title, body } = this.props.post;
        const { isBodyValid, isTitleValid } = this.state;
        this.setState({
            title: title,
            body: body,
            isTitleValid: !!title,
            isBodyValid: !!body
        })
    }

    render() {
        const { post } = this.props;

        return (
            <div>
                {!this.isFormValid() && <div className="error-msg text-center">Fill all form fiels</div>}
                <form className="create-post-form"
                    onSubmit={this.handleSubmit}>
                    <div className="create-post-details">
                        <input type="text"
                            name="title"
                            placeholder="Post Title"
                            defaultValue={post.title}
                            onChange={(e) => this.handleChange(e)} />
                        <textarea
                            name="body"
                            placeholder="Type your post here..."
                            defaultValue={post.body}
                            onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="create-post-details">
                        <a className="edit-cancel" onClick={(e) => this.handleCancel(e)}>Cancel</a>
                        <button disabled={!this.isFormValid()}>Submit Post</button>
                    </div>
                </form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: (id, body) => dispatch(editPost(id, body)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
