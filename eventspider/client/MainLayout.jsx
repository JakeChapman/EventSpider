MainLayout = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return{
      user: Meteor.user()
    }
  },

  render() {

    if(this.data.user){
      return <div id="main-content">
        <header>
          <Header school={this.data.user.profile.school}/>
        </header>
        <div className="wrapper">
          <div id="sidebar-wrapper">
            <Nav/>
          </div>
          <div id="page-content-wrapper">
            {this.props.content}
          </div>
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    } else{
      return <Login/>
    }

  }
});
