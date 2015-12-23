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
    /* The key 'content' is now a function */
    ReactLayout.render(Login);
  }
});

FlowRouter.route('/feed', {
  subscriptions: function() {
    this.register('events', Meteor.subscribe('events'));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content: <Feed/>,
      sidebar: <Nav/>,
      footer: <Footer/>,
      header: <Header/>
    });
  }
});

FlowRouter.route('/feed/:title', {
  subscriptions: function(params) {
    this.register('events', Meteor.subscribe('event', params.title));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content: <EventShow flag={params.title}/>,
      sidebar: <Nav/>,
      footer: <Footer/>,
      header: <Header/>
    });
  }
});

FlowRouter.route('/registration', {
  subscriptions: function() {
    this.register('colleges', Meteor.subscribe('colleges'));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content: <Registration/>,
      sidebar: <Nav/>,
      footer: <Footer/>,
      header: <Header/>
    });
  }
});
