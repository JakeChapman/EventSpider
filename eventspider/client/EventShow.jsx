EventShow = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      event: Events.findOne({name: this.props.name}).fetch()
    };
  },

  render() {
    return <div>Post:
      {this.data.event.name}</div>;
  }
});
