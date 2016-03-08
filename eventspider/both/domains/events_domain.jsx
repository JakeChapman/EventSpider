//Pulling from minimongo only the subscription can fetch data from the server

EventsDomain = {

    getAllFeedEvents(){
        return Events.find({}, {sort: {createdAt: -1}}).fetch();
    },

    getSelectEvent(key){
        return Events.findOne(new Meteor.Collection.ObjectID(key));
    },

    handleCreateEevent(data){
        Meteor.call('Event.create' ,data);
    },

    getAllCategories(){
        return Categories.find().fetch();
    }
}