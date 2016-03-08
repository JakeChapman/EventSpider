CollegeDomain = {
    getInitialList(){
        return Colleges.find({}, {sort: {name: -1}, limit: 10}).fetch();
    }
};