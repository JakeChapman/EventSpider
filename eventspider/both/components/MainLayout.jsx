var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

MainLayout = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      x: 0,
      y: 0,
      initialX: 0,
      initialY: 0,
      dragging: "none",
      toggled: false
    }
  },

  getMeteorData() {
    return {user: Meteor.user()}
  },

  moveInit(e) {
    this.setState({initialX: e.touches[0].pageX, initialY: e.touches[0].pageY, dragging: "none"});
  },
  moveItem(e) {
    swipeStatus = (e.touches[0].pageX - this.state.initialX);
    if (swipeStatus > 0 && swipeStatus <= 250) {
      this.setState({x: swipeStatus, dragging: "left", toggled: true});
    } else if (swipeStatus < 0) {
      this.setState({dragging: "right"});
      //FlowRouter.go('/registration');
    }else{
      
    }
  },
  moveEnd(e) {
    console.log(this.state.toggled);
    if (this.state.dragging === "left") {
      if (this.state.x < 100) {
        this.setState({x: 0, toggled: false});
      } else {
        $(".wrapper").toggleClass("toggled");
        this.setState({x: 250, toggled: true});
      }
    }else if (this.state.dragging === "right") {
      if (this.state.toggled) {
        $(".wrapper").toggleClass("toggled");
        this.setState({x: 0, toggled: false});
      }else if(this.state.x < -150){
        FlowRouter.go('/registration');
      }else {
        //Do nothing
      }
    }else{
      //Do nothing
    }
  },

  closeNav(e) {
    if (this.state.toggled) {
      $(".wrapper").toggleClass("toggled");
      this.setState({x: 0, toggled: false});
    }
  },

  render() {

    if (this.data.user) {

      let bgColor = this.data.user.profile.colors.primary;

      let divStyle = {
        backgroundColor: this.data.user.profile.colors.secondary_one,
        color: this.data.user.profile.colors.secondary_two
      };

      let navStyle = {};

      if(this.state.toggled){
        let navStyle = {
          backgroundColor: this.data.user.profile.colors.secondary_one,
          color: this.data.user.profile.colors.secondary_two,
          width: this.state.x + "px"
        };
      }else {
        let navStyle = {
          backgroundColor: this.data.user.profile.colors.secondary_one,
          color: this.data.user.profile.colors.secondary_two
        };
      };

      return <div id="main-content">
          <Header school={this.data.user.profile.school} bgColor={this.data.user.profile.colors.secondary_one} fgColor={this.data.user.profile.colors.secondary_two}/>
          <div className="wrapper" style={{
            backgroundColor: bgColor
          }} onTouchStart={this.moveInit} onTouchMove={this.moveItem} onTouchEnd={this.moveEnd} onClick={this.closeNav}>
            <div id="sidebar-wrapper" style={navStyle}>
              <Nav userRole={this.data.user.profile.role}/>
            </div>
            <div id="page-content-wrapper">
              {this.props.content}
            </div>
          </div>
          <Footer bgColor={this.data.user.profile.colors.secondary_one} fgColor={this.data.user.profile.colors.secondary_two}/>
      </div>
    } else {
      return <Login/>
    }

  }
});
