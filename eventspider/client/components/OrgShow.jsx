OrgShow = React.createClass({
  propTypes: {
    flag: React.PropTypes.string
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      org: Organizations.findOne({name: this.props.flag})
    };
  },

  render() {
    return <div className="org">
      <Org key={this.data.org._id} name={this.data.org.title} descrip={this.data.org.description} category={this.data.org.category} link={this.data.org.link}  isSelected={true} status={"PENDING"}/>
    </div>
  }
});
