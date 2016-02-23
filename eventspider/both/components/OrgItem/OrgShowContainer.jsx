this.OrgShowContainer = React.createClass({
    mixins: [ReactMeteorData],


    // subscribe to a reactive stream of data from
    // publication at:  server/publications/posts.js
    startMeteorSubscriptions() {
        return Meteor.subscribe("organization", this.props.name);
    },

    // re-renders view if any reactive data source changes. `sub` is reactive
    // and will change when any new data is availible from subscription.
    getMeteorData: function() {
        var sub = this.startMeteorSubscriptions();

        return {
            feedReady: sub.ready(),
            orgItem: OrgDomain.getSelectedOrg()
        };
    },


    render() {

        return <OrgShow orgItem={this.data.orgItem}/>
    }
});
