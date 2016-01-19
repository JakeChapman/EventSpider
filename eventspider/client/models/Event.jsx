Event = React.createClass({
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
    isSelected: React.PropTypes.bool
  },
  expandEvent(e) {
    e.preventDefault();
    $('.events').transition('fade');
    FlowRouter.go('/feed/' + this.props.title);
  },

  addToCalendar() {
    alert('Adding to Calendar');
    $('#calendarAdded').css('color', 'green');
    $('#calendarAdded').css('visibility', 'visible');
    $('#calendarAdded').toggleClass('spin')
  },

  render() {

    if (this.props.isSelected) {
      return (
        <div className="card full">
          <div className="top-section">
            <div id="sub-icon">
              <i className="zmdi zmdi-run zmdi-hc-3x"/>
            </div>
            <div className="vertical-line"/>
            <div id="title-section">
              {this.props.title}
            </div>
          </div>
          <div className="descrip-section">
            {this.props.descrip}
          </div>
          <div className="save-section">
            add to
            <i className="glyphicon glyphicon-calendar" onClick={this.addToCalendar}/>
            <i className="glyphicon glyphicon-ok-circle" id="calendarAdded"/>
          </div>
          <div className="info-section">
            <div id="location-full">
              <i className="zmdi zmdi-pin"/>
              {this.props.location}
            </div>
            <div id="time-full">
              <i className="zmdi zmdi-time"/>
              {this.props.start_time}
              -
              {this.props.end_time}
            </div>
          </div>
          <div className="img-section">
            <img src="/got.jpg" height="75px" width="75px" className="img-thumbnail"/>
          </div>
          <div className="org-section">
            Host by: TODO ADD ORG
          </div>
          <div className="social-section">
            <i className="zmdi zmdi-facebook-box zmdi-hc-2x" id="facebook-full"></i>
            <i className="zmdi zmdi-google-plus zmdi-hc-2x" id="google-full"></i>
          </div>
        </div>
      )
    } else {
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
  }

});
