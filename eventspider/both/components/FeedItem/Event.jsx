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

      return (
        <div className="card medium" onClick={this.expandEvent}>
            <div className="card-content">
                <span className="card-title">{this.props.title}</span>
                <p id="short-descrip">
                    {trimmed_descrip}
                </p>
                <div className="col-sm-6">
                    {this.props.date}
                </div>
                <div className="col-sm-6">
                    {this.props.start_time} - {this.props.end_time}
                </div>
            </div>
        </div>
      )
    }

});
