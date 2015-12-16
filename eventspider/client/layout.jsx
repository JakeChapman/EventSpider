MainLayout = React.createClass({
  render() {
    return  <div class="container" id="main-content">
        <div id="wrapper">
          <div id="sidebar-wrapper">
          </div>
          <div id="page-content-wrapper">
            {this.props.content}
          </div>
        </div>
      </div>
  }
});
