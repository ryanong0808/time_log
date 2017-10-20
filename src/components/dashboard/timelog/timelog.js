import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchTimelog } from '../../../actions/timelog';

import TimelogItem from './timelog-item';

class TimeLog extends Component {
  constructor(props) {
    super(props);

    const { params, fetchTimelog } = this.props;
    // Fetch timelog
    fetchTimelog(params.timelogId);
  }

  renderTimelog() {
    if (this.props.timelog) {
      return (
        <TimelogItem
            key={this.props.timelog._id}
            timelogId={this.props.timelog._id}
            date={this.props.timelog.date}
            hours={this.props.timelog.hours}
            minutes={this.props.timelog.minutes}
            note={this.props.timelog.note}
          />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            {this.renderTimelog()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timelog: state.timesheet.timelog,
  };
}

export default connect(mapStateToProps, { fetchTimelog })(TimeLog);
