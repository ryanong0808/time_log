import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { fetchUser } from '../../../actions/index';
import { updateUser } from '../../../actions/user';
const form = reduxForm({
  form: 'editUser',
  validate,
});

const renderField = field => (
  <div>
    <input className="form-control" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  return errors;
}

class EditProfile extends Component {
  constructor(props) {
    super(props);

    const { params, fetchUser, updateUser } = this.props;
    
  }

  handleFormSubmit(formProps) {
    this.props.updateUser(this.userId, formProps);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.profile && nextProps.profile != this.props.profile) {
      this.handleInitialize(nextProps);  
    }
    
    
  }

  handleInitialize(nextProps) {
      const initData = {
        "firstName": nextProps.profile.profile.firstName,
        "lastName": nextProps.profile.lastName,
        "email": nextProps.profile.email,
        "preferred_from_hour": nextProps.profile.preferredWorkingHours.from.hour,
        "preferred_from_minutes": nextProps.profile.preferredWorkingHours.from.minutes,
        "preferred_to_hour": nextProps.profile.preferredWorkingHours.to.hour,
        "preferred_to_minutes": nextProps.profile.preferredWorkingHours.to.minutes
      };
      
      this.props.initialize(initData);
    
  }

  componentWillMount() {
    // Fetch user data prior to component mounting

    const userId = cookie.load('uid');
    this.props.fetchUser(userId);
    this.userId = userId;

  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

    render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
        
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile
  };
}

export default connect(mapStateToProps, { fetchUser, updateUser })(form(EditProfile));
