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
  subscriptions: function() {
    this.register('events', Meteor.subscribe('events'));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {content: <Feed/>});
  }
});

FlowRouter.route('/feed/:title', {
  subscriptions: function(params) {
    this.register('events', Meteor.subscribe('event', params.title));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {content: <EventShow flag={params.title}/>});
  }
});

FlowRouter.route('/myOrg/:name', {
  subscriptions: function(params) {
    this.register('organization', Meteor.subscribe('organization', params.name))
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {content: <OrgShow flag={params.name}/>});
  }
})

FlowRouter.route('/myOrg', {
  subscriptions: function() {
    this.register('organizations', Meteor.subscribe('organizations'));
  },
  action: function(params) {
    console.log("getting org page");
    ReactLayout.render(MainLayout, {content: <Orgs/>});
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