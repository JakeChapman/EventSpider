Event = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    descrip: React.PropTypes.string,
    location: React.PropTypes.string,
    tags: React.PropTypes.array,
    categories: React.PropTypes.array,
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

  render() {

    if (this.props.isSelected) {
      return <div className="card full">
        <div className="top-section">
          <div id="sub-icon">
            <i className="zmdi zmdi-run zmdi-hc-3x"/>
          </div>
          <div id="title-section">
            {this.props.title}
          </div>
        </div>
        <div className="descrip-section">
          {this.props.descrip}
        </div>
        <div className="info-section">
          {this.props.location}
          {this.props.start_time}
          {this.props.end_time}
        </div>
      </div>
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
