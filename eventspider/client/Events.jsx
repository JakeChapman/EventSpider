Feed = React.createClass({

  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    console.log('getting data');
    return {
      events: Events.find({}).fetch()
    };
  },

  renderEvents() {
    return this.data.events.map((event) => {
      return <Event key={event._id} name={event.name} start_time={event.start_time} end_time={event.end_time} on_campus={event.on_campus}/>;
    });
  },
  render() {
    return (
        <div className="events">
          {this.renderEvents()}
        </div>
    );
  }
});
