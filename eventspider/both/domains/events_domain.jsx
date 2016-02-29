//Pulling from minimongo only the subscription can fetch data from the server

EventsDomain = {

    getAllFeedEvents(){
        return Events.find({}, {sort: {createdAt: -1}}).fetch();
    },

    getSelectEvent(){
        return Events.findOne();
    }
}