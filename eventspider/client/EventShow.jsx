EventShow = React.createClass({
  propTypes: {
    flag: React.PropTypes.string
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      event: Events.findOne({title: this.props.flag})
    };
  },

  render() {
    return <div className="event">
      <Event  title={this.data.event.title} descrip={this.data.event.description} location={this.data.event.location} tags={this.data.event.tags} categories={this.data.event.categories} date={this.data.event.date} start_time={this.data.event.start_time} end_time={this.data.event.end_time} on_campus={this.data.event.on_campus} isSelected={true}/>
    </div>
  }
});
