import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchTimelogs, filterTimelogs } from '../../../actions/timelog';

import TimelogList from './timelog-list';

class TimeSheet extends Component {
  constructor(props){
    super(props);
    this.state = {
      from_date: '',
      to_date: ''
    }
  }

  componentWillMount() {
    // Fetch timesheet (timelogs involving current user)
    this.props.fetchTimelogs();
  }

  filterTimelogs() {
    const filters = {
      from_date: this.state.from_date,
      to_date: this.state.to_date
    };

    this.props.filterTimelogs(filters);
  }

  renderTimelogs() {
    if (this.props.timelogs && this.props.timelogs.length > 0) {
      return (
        <TimelogList timelogs={this.props.timelogs} />
      );
    }

    return <div>You do not have any active timelogs.</div>;
  }

  handleChangeFrom(e) {
    this.setState({ from_date: e.target.value });
  }

   handleChangeTo(e) {
    this.setState({ to_date: e.target.value });
  }
  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                From:<input type="text" name="from_date" value={this.state.from_date} onChange={ this.handleChangeFrom.bind(this) } />
              </div>
              <div className="col-md-4">
                To:<input type="text" name="to_date" value={this.state.to_date} onChange={ this.handleChangeTo.bind(this) } />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary" onClick={this.filterTimelogs.bind(this)}>Filter</button>
              </div>
            </div>
            {this.renderTimelogs()}
          </div>
        </div>
        <Link className="btn btn-primary" to="/dashboard/timelog/new">Add Timelog</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timelogs: state.timesheet.timelogs,
  };
}

export default connect(mapStateToProps, { fetchTimelogs, filterTimelogs })(TimeSheet);
