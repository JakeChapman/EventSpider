class Feed extends React.Component{

  navSwipe(event) {
    event.preventDefault();
    $(".wrapper").toggle("toggled");
  }

  renderEvents() {
    return this.props.feedItems.map((event) => {
      return <FeedEvent key={event._id} _id={event._id} title={event.title} location={event.location} date={event.date} descrip={event.description} start_time={event.start_time} end_time={event.end_time} on_campus={event.on_campus} isSelected={false}/>;
    });
  }
  render() {
    return (
      <div>
        {this.renderEvents()}
      </div>
    );
  }
}

Feed.propTypes= {
    feedItems: React.PropTypes.array
};

this.Feed = Feed;
