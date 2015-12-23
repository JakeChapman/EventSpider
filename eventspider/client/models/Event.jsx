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
      return <div className="card" onClick={this.expandEvent}>
        <div>
          <h2>{this.props.title}</h2>
        </div>
      </div>
    }
  }

});
