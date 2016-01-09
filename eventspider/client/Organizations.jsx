Organizations = React.createClass({
  render() {
    return (
      <div className="myOrg-wrapper">
        <div className="org-title">
          My Organizations
        </div>
        <div className="card">
          <div id="org-picture">
            <img src="got.jpg" height="50px" width="50px"/>
          </div>
          <div className="org-name">
            Organization Title
          </div>
        </div>
      </div>
    )
  }
})
