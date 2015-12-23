EventShow = React.createClass({
  propTypes: {
    flag: React.PropTypes.string
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      event: Events.findOne({name: this.props.flag})
    };
  },

  render() {
    return  <Event key={this.data.event._id} name={this.data.event.name} start_time={this.data.event.start_time} end_time={this.data.event.end_time} on_campus={this.data.event.on_campus} isSelected={true}/>;
  }
});
