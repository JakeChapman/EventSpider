// OrgData handles all data subscriptions and pushes data down to
// children via props.
//
// This component is a container or 'view controller' and will gather
// any data needed from the domain objects and handle subscriptions
//
// In a future version the children will be able to specify what fields
// they need, however currently they're stored in this component.

/*global OrgsList, ReactMeteorData, FeedDomain */

this.OrgContainer = React.createClass({
    mixins: [ReactMeteorData],

    // subscribe to a reactive stream of data from
    // publication at:  server/publications/posts.js
    startMeteorSubscriptions() {
        return Meteor.subscribe("organizations");
    },

    // re-renders view if any reactive data source changes. `sub` is reactive
    // and will change when any new data is availible from subscription.
    getMeteorData: function() {
        var sub = this.startMeteorSubscriptions();

        return {
            orgReady: sub.ready(),
            orgItems: OrgDomain.getAllOrgs()
        };
    },

    render() {
        return <OrgList orgItems={this.data.orgItems}/>;
    }
});