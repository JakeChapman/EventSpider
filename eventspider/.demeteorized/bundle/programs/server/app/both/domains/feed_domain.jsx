(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// both/domains/feed_domain.jsx                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//Pulling from minimongo only the subscription can fetch data from the server
                                                                       //
FeedDomain = {                                                         // 3
                                                                       //
    getAllFeedEvents: function () {                                    // 5
        return Events.find({}, { sort: { createdAt: -1 } }).fetch();   // 6
    }                                                                  //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=feed_domain.jsx.map
