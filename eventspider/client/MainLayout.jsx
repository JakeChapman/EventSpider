var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

MainLayout = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {x: 0, y: 0, initialX: 0, initialY: 0, dragging: "none"}
  },

  getMeteorData() {
    return {user: Meteor.user()}
  },

  moveInit(e) {
    this.setState({initialX: e.touches[0].pageX, initialY: e.touches[0].pageY, dragging: "none"});
  },
  moveItem(e) {
    swipeStatus = (e.touches[0].pageX - this.state.initialX);
    if (swipeStatus > 0) {
      $(".wrapper").toggleClass("toggled");
    } else if (swipeStatus < 0) {
      FlowRouter.go('/registration');
    }
    alert(deltaX);
  },
  moveEnd(e) {
    this.setState({x: 0, y: 0, dragging: "all 0.5s ease"});
  },

  render() {
    if (this.data.user) {

      let bgColor = this.data.user.profile.colors.primary;

      let divStyle = {
        backgroundColor: this.data.user.profile.colors.secondary_one,
        color: this.data.user.profile.colors.secondary_two
      };

      console.log(divStyle);
      return <div id="main-content">
        <header>
          <Header school={this.data.user.profile.school} bgColor={this.data.user.profile.colors.secondary_one} fgColor={this.data.user.profile.colors.secondary_two}/>
        </header>
        <ReactCSSTransitionGroup transitionName="main" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="wrapper" style={{
            backgroundColor: bgColor
          }} onTouchStart={this.moveInit} onTouchMove={this.moveItem} onTouchEnd={this.moveEnd}>
            <div id="sidebar-wrapper">
              <Nav/>
            </div>
            <div id="page-content-wrapper">
              {this.props.content}
            </div>
          </div>
        </ReactCSSTransitionGroup>
        <footer>
          <Footer bgColor={this.data.user.profile.colors.secondary_one} fgColor={this.data.user.profile.colors.secondary_two}/>
        </footer>
      </div>
    } else {
      return <Login/>
    }

  }
});
