Event = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    start_time: React.PropTypes.string,
    end_time: React.PropTypes.string,
    on_campus: React.PropTypes.bool,
    isSelected: React.PropTypes.bool
  },
  expandEvent(e) {
    e.preventDefault();
    FlowRouter.go('/feed/' + this.props.name);
  },
  render() {

    if (this.props.isSelected) {
      return <div className="card full">
        <div>
          {this.props.name}
          {this.props.start_time}
          {this.props.end_time}
        </div>
      </div>
    } else {
      return <div className="card" onClick={this.expandEvent}>
        <div>
          <h2>{this.props.name}</h2>
        </div>
      </div>
    }
  }

});
