import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize} from 'redux-form';
import { updateTimelog, fetchTimelog } from '../../../actions/timelog';

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

class EditTimelog extends Component {
  constructor(props) {
    super(props);

    const { params, fetchTimelog, updateTimelog } = this.props;
    // Fetch conversation thread (messages to/from user)
    fetchTimelog(params.timelogId);
    this._id =  params.timelogId;
  }

  handleFormSubmit(formProps) {
    this.props.updateTimelog(this._id, formProps);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.timelog && nextProps.timelog != this.props.timelog) {
      this.handleInitialize(nextProps);  
    }
    
    
  }

  handleInitialize(nextProps) {
      const initData = {
        "date": nextProps.timelog.date,
        "note": nextProps.timelog.note,
        "from_hour": nextProps.timelog.from.hour,
        "from_minutes": nextProps.timelog.from.minutes,
        "to_hour": nextProps.timelog.to.hour,
        "to_minutes": nextProps.timelog.to.minutes
      };
      
      this.props.initialize(initData);
    
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
    const { handleSubmit, timelog } = this.props;

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
        <button action="submit" className="btn btn-primary">Send</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.timesheet.error,
    timelog: state.timesheet.timelog,
  };
}

export default connect(mapStateToProps, { updateTimelog, fetchTimelog })(form(EditTimelog));
