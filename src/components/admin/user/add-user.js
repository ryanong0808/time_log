import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize, formValueSelector } from 'redux-form';
import { addUser } from '../../../actions/user';

const form = reduxForm({
  form: 'composeUser',
  validate,
});

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter email';
  }

  return errors;
}

const renderField = field => (
  <div>
    <input className="form-control" autoComplete="off" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

class AddUser extends Component {
  constructor(props) {
    super(props);

    const { addUser } = this.props;
  }

  handleFormSubmit(formProps) {
    this.props.addUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    } else if (this.props.note) {
      return (
        <div className="alert alert-success">
          <strong>Success!</strong> {this.props.note}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, user } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h2>Add New User</h2>
        {this.renderAlert()}
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <Field name="firstName" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <Field name="lastName" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <p>Preferred Working Hours Per Day </p>
        <div className="row">
          <div className="col-md-3">
            <label>From</label>
            <Field name="preferred_from_hour" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-3">
            <label>(hour:minutes)</label>
            <Field name="preferred_from_minutes" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-3">
            <label>To</label>
            <Field name="preferred_to_hour" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-3">
            <label>(hour:minutes)</label>
            <Field name="preferred_to_minutes" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <p>Role</p>
        <div className="row">
          <div className="col-md-3">
             <Field name="role" component="select">
              <option value="Member">Member</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
            </Field>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.edit_user
  };
}

export default connect(mapStateToProps, { addUser })(form(AddUser));
