Event = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    start_time: React.PropTypes.string,
    end_time: React.PropTypes.string,
    on_campus: React.PropTypes.bool
  },
  expandEvent() {
    FlowRouter.go('/feed/Meteor')
  },
  render() {
    return <div className="card" onClick={this.expandEvent}>
      <div>
        <h2>{this.props.name}</h2>
      </div>
    </div>
  }

});
