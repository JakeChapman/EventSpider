Orgs = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    console.log("getting orgs");
    return {organizations: Organizations.find({}).fetch()};
  },

  orgClick() {
    alert("Click");
  },

  renderOrgs() {
    return this.data.organizations.map((org) => {
      return <Org key={org._id} name={org.name} descrip={org.description} category={org.category} link={org.link} isSelected={false} status={"PENDING"}/>;
    });
  },

  render() {
    console.log("Rendering orgs");
    return <div className="myOrg-wrapper">
        <div className="org-title">
          My Organizations
        </div>
        <div className="organizations">
          {this.renderOrgs()}
        </div>
      </div>
  }
});
