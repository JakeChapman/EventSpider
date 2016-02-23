//Pulling from minimongo only the subscription can fetch data from the server

OrgDomain = {

    getAllOrgs(){
        return Organizations.find({}, {sort: {createdAt: -1}}).fetch();
    },

    getSelectedOrg(){
        return Organizations.findOne();
    }
}