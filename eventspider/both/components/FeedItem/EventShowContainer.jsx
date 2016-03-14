this.EventShowContainer = React.createClass({
    mixins: [ReactMeteorData],


    // subscribe to a reactive stream of data from
    // publication at:  server/publications/posts.js
    startMeteorSubscriptions() {
        return Meteor.subscribe("events");
    },

    // re-renders view if any reactive data source changes. `sub` is reactive
    // and will change when any new data is availible from subscription.
    getMeteorData: function() {
        var sub = this.startMeteorSubscriptions();

        return {
            feedReady: sub.ready(),
            eventItem: EventsDomain.getSelectEvent(this.props.selector)
        };
    },
    

  render() {

    return <EventShow eventItem={this.data.eventItem}/>
  }
});
