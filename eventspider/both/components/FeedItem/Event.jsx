this.FeedEvent = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    descrip: React.PropTypes.string,
    location: React.PropTypes.string,
    tags: React.PropTypes.object,
    categories: React.PropTypes.object,
    date: React.PropTypes.string,
    start_time: React.PropTypes.string,
    end_time: React.PropTypes.string,
    on_campus: React.PropTypes.bool,
  },

  expandEvent(e) {
    e.preventDefault();
    FlowRouter.go('/feed/' + this.props.title);
  },

  addToCalendar() {
    alert('Adding to Calendar');
    $('#calendarAdded').css('color', 'green');
    $('#calendarAdded').css('visibility', 'visible');
    $('#calendarAdded').toggleClass('spin')
  },

  render() {

      let trimmed_descrip = this.props.descrip.substring(0, 60) + "...";

      return <div className="card" onClick={this.expandEvent}>
        <div className="feed">
          <div id="sub-icon">
            <i className="zmdi zmdi-run zmdi-hc-3x"/>
          </div>
          <div className="vertical-line"/>
          <div id="title-location">
            {this.props.title}
            <div id="location">
              {this.props.location}
            </div>
            <div id="short-descrip">
              {trimmed_descrip}
            </div>
          </div>
          <div className="vertical-line"/>
          <div id="time-date">
            {this.props.date}
            {this.props.start_time}
            -
            {this.props.end_time}
          </div>
        </div>
      </div>
    }

});
