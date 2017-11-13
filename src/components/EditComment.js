import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { editComment } from '../actions';

class EditComment extends Component {

    state = {
        body: "",
        isBodyValid: false
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.isFormValid()) {
            const { id, parentId } = this.props.comment;
            const values = serializeForm(e.target, { hash: true })
            values.timestamp = Date.now();
            this.props.editComment(id, values);
            this.props.handleCloseModal();
        }
    }

    isFormValid = () => {
        return this.state.isBodyValid;
    }

    handleChange = (e) => {
        switch (e.target.name) {
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

    handleCancel = (e) => {
        e.preventDefault();
        this.props.handleCloseModal();
    }

    componentDidMount = () => {
        const { body } = this.props.comment;
        const { isBodyValid } = this.state;
        this.setState({
            body: body,
            isBodyValid: !!body
        })
    }

    render() {
        const { comment } = this.props;

        return (
            <div>
                {!this.isFormValid() && <div className="error-msg text-center">Fill all form fiels</div>}
                <form className="create-post-form"
                    onSubmit={this.handleSubmit}>
                    <div className="create-post-details">
                        <textarea
                            name="body"
                            placeholder="Type your comment here..."
                            defaultValue={comment.body}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div className="create-post-details">
                        <a className="edit-cancel" onClick={(e) => this.handleCancel(e)}>Cancel</a>
                        <button disabled={!this.isFormValid()}>Submit Comment</button>
                    </div>
                </form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //comment: state.comment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editComment: (id, body) => dispatch(editComment(id, body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
