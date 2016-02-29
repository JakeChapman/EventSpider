//Pulling from minimongo only the subscription can fetch data from the server

OrgDomain = {

    getAllOrgs(){
        return Events.find({}, {sort: {createdAt: -1}}).fetch();
    }
}