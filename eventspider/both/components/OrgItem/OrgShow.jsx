class OrgShow extends React.Component{

  render() {
    return <div className="card full">
      <div id="orgStatus">
        {this.props.orgItem.status}
      </div>
      <div id="org-picture">
        <img src="/got.jpg" height="50px" width="50px"/>
      </div>
      <div className="org-name">
        {this.props.orgItem.name}
      </div>
    </div>
  }
}

OrgShow.propTypes = {
  orgItem: React.PropTypes.object
};

this.OrgShow = OrgShow;
