Event = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    start_time: React.PropTypes.string,
    end_time: React.PropTypes.string,
    on_campus: React.PropTypes.bool
  },

  render() {
    return <div className="event">
      <div className="event-content">
        <h2>{this.props.name}</h2>
      </div>
    </div>
  }

});
