//Flow Helpers
let pathFor = (path, params) => {
  let query = params && params.query
    ? FlowRouter._qs.parse(params.query)
    : {};
  return FlowRouter.path(path, params, query);
};

let urlFor = (path, params) => {
  return Meteor.absoluteUrl(pathFor(path, params));
};

let currentRoute = (route) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route
    ? 'active'
    : '';
};

FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute
};

// Flow Router here down

FlowRouter.route('/', {
  action: function(params) {
    ReactLayout.render(MainLayout, {content: <FeedContainer/>});
  }
});

FlowRouter.route('/feed/:key', {
  action: function(params) {
    ReactLayout.render(MainLayout, {content: <EventShowContainer selector={params.key}/>});
  }
});

FlowRouter.route('/myOrg/:name', {
    action: function(params) {
        ReactLayout.render(MainLayout, {content: <OrgShowContainer name={params.name}/>});
  }
});

FlowRouter.route('/myOrg', {
  action: function(params) {
    ReactLayout.render(MainLayout, {content: <OrgContainer/>});
  }
});

FlowRouter.route('/createEvent',{
  action: function(params){
    ReactLayout.render(MainLayout, {content: <EventCreation/>});
  }
});

FlowRouter.route('/registration', {
  subscriptions: function() {
    this.register('colleges', Meteor.subscribe('colleges'));
  },
  action: function(params) {
    ReactLayout.render(Registration);
  }
});
