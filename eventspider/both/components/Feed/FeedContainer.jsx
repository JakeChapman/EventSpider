// FeedData handles all data subscriptions and pushes data down to
// children via props.
//
// This component is a container or 'view controller' and will gather
// any data needed from the domain objects and handle subscriptions
//
// In a future version the children will be able to specify what fields
// they need, however currently they're stored in this component.

/*global FeedList, ReactMeteorData, FeedDomain */

this.FeedContainer = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            recordCount: {
                posts: 5
                //postComments: 5 XXX no comment limit
            }
        };
    },

    // subscribe to a reactive stream of data from
    // publication at:  server/publications/posts.js
    startMeteorSubscriptions() {
        var recordCount = this.state.recordCount;
        return Meteor.subscribe("events");
    },

    // re-renders view if any reactive data source changes. `sub` is reactive
    // and will change when any new data is availible from subscription.
    getMeteorData: function() {
        var sub = this.startMeteorSubscriptions();

        return {
            feedReady: sub.ready(),
            feedItems: EventsDomain.getAllFeedEvents()
        };
    },

    render() {
        return <Feed
            incrementLimit={this.incrementLimit}
            feedItems={this.data.feedItems}
        />;
    }

});