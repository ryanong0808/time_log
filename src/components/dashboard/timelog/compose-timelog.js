import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addTimelog } from '../../../actions/timelog';

const form = reduxForm({
  form: 'composeTimelog',
  validate,
});

function validate(formProps) {
  const errors = {};

  if (!formProps.note) {
    errors.note = 'Please enter a note';
  }

  return errors;
}

const renderField = field => (
  <div>
    <input className="form-control" autoComplete="off" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

class ComposeTimelog extends Component {
  constructor(props) {
    super(props);

  }

  handleFormSubmit(formProps) {
    this.props.addTimelog(formProps);
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
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h2>Start New Timelog</h2>

        <label>Date</label>
        {this.renderAlert()}
        <Field name="date" component={renderField} type="text" placeholder="Enter date..." />
        
        <label>From(Hour:Minutes)</label>
        {this.renderAlert()}
        <Field name="from_hour" className="form-control" component={renderField} type="text" />       
        <Field name="from_minutes" className="form-control" component={renderField} type="text" />       

        <label>To(Hour:Minutes)</label>
        {this.renderAlert()}
        <Field name="to_hour" className="form-control" component={renderField} type="text" />       
        <Field name="to_minutes" className="form-control" component={renderField} type="text" />       

        <label>Enter your note below</label>
        {this.renderAlert()}
        <Field name="note" component={renderField} type="text" placeholder="Type here to chat..." />
        <button action="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.timesheet.error,
  };
}

export default connect(mapStateToProps, { addTimelog })(form(ComposeTimelog));
