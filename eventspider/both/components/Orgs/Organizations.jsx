class OrgList extends React.Component {

  renderOrgs() {
    return this.props.orgItems.map((org) => {
      return <Org key={org._id} name={org.name} descrip={org.description} category={org.category} link={org.link} isSelected={false} status={"PENDING"}/>;
    });
  }

  render() {
    return <div className="myOrg-wrapper">
        <div className="org-title">
          My Organizations
        </div>
        <div className="organizations">
          {this.renderOrgs()}
        </div>
        <FloatButton/>
      </div>
  }
}

OrgList.propTypes = {
    orgItems: React.PropTypes.array
};

this.OrgList = OrgList;
