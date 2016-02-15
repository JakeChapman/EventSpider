(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/routes.jsx                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//Flow Helpers                                                         //
var pathFor = function (path, params) {                                // 2
  var query = params && params.query ? FlowRouter._qs.parse(params.query) : {};
  return FlowRouter.path(path, params, query);                         // 6
};                                                                     //
                                                                       //
var urlFor = function (path, params) {                                 // 9
  return Meteor.absoluteUrl(pathFor(path, params));                    // 10
};                                                                     //
                                                                       //
var currentRoute = function (route) {                                  // 13
  FlowRouter.watchPathChange();                                        // 14
  return FlowRouter.current().route.name === route ? 'active' : '';    // 15
};                                                                     //
                                                                       //
FlowHelpers = {                                                        // 20
  pathFor: pathFor,                                                    // 21
  urlFor: urlFor,                                                      // 22
  currentRoute: currentRoute                                           // 23
};                                                                     //
                                                                       //
// Flow Router here down                                               //
                                                                       //
FlowRouter.route('/', {                                                // 28
  subscriptions: function () {                                         // 29
    this.register('events', Meteor.subscribe('events'));               // 30
  },                                                                   //
  action: function (params) {                                          // 32
    ReactLayout.render(MainLayout, { content: React.createElement(Feed, null) });
  }                                                                    //
});                                                                    //
                                                                       //
FlowRouter.route('/feed/:title', {                                     // 37
  subscriptions: function (params) {                                   // 38
    this.register('events', Meteor.subscribe('event', params.title));  // 39
  },                                                                   //
  action: function (params) {                                          // 41
    ReactLayout.render(MainLayout, { content: React.createElement(EventShow, { flag: params.title }) });
  }                                                                    //
});                                                                    //
                                                                       //
FlowRouter.route('/myOrg/:name', {                                     // 46
  subscriptions: function (params) {                                   // 47
    this.register('organization', Meteor.subscribe('organization', params.name));
  },                                                                   //
  action: function (params) {                                          // 50
    ReactLayout.render(MainLayout, { content: React.createElement(OrgShow, { flag: params.name }) });
  }                                                                    //
});                                                                    //
                                                                       //
FlowRouter.route('/myOrg', {                                           // 55
  subscriptions: function () {                                         // 56
    this.register('organizations', Meteor.subscribe('organizations'));
  },                                                                   //
  action: function (params) {                                          // 59
    console.log("getting org page");                                   // 60
    ReactLayout.render(MainLayout, { content: React.createElement(Orgs, null) });
  }                                                                    //
});                                                                    //
                                                                       //
FlowRouter.route('/qrCode', {                                          // 65
  action: function (params) {                                          // 66
    ReactLayout.render(MainLayout, { content: React.createElement(QrCodeGenerator, null) });
  }                                                                    //
});                                                                    //
                                                                       //
FlowRouter.route('/registration', {                                    // 71
  subscriptions: function () {                                         // 72
    this.register('colleges', Meteor.subscribe('colleges'));           // 73
  },                                                                   //
  action: function (params) {                                          // 75
    ReactLayout.render(Registration);                                  // 76
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=routes.jsx.map
