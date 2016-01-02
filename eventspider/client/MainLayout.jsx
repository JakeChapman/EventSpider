MainLayout = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {user: Meteor.user()}
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
        <div className="wrapper" style={{
          backgroundColor: bgColor
        }}>
          <div id="sidebar-wrapper">
            <Nav/>
          </div>
          <div id="page-content-wrapper">
            {this.props.content}
          </div>
        </div>
        <footer>
          <Footer bgColor={this.data.user.profile.colors.secondary_one} fgColor={this.data.user.profile.colors.secondary_two}/>
        </footer>
      </div>
    } else {
      return <Login/>
    }

  }
});
