Feed = React.createClass({

  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    console.log('getting data');
    return {
      events: Events.find({}, {sort: {title: 1}}).fetch()
    };
  },

  navSwipe(event){
    event.preventDefault();
    $(".wrapper").toggleClass("toggled");
  },

  renderEvents() {
    return this.data.events.map((event) => {
      return <Event key={event._id} title={event.title} location={event.location} date={event.date} descrip={event.description} start_time={event.start_time} end_time={event.end_time} on_campus={event.on_campus} isSelected={false}/>;
    });
  },
  render() {
    return (
        <div className="events" onSwipe={this.navSwipe}>
          {this.renderEvents()}
        </div>
    );
  }
});
