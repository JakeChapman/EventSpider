MainLayout = React.createClass({
  render() {
    return  <div id="main-content">
        <div id="wrapper">
          <div id="sidebar-wrapper">
            {this.props.sidebar}
          </div>
          <div id="page-content-wrapper">
            {this.props.content}
          </div>
        </div>
        <footer>
          {this.props.footer}        
        </footer>
      </div>
  }
});
