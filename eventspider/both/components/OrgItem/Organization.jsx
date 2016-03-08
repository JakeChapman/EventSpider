this.Org = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    descrip: React.PropTypes.string,
    category: React.PropTypes.string,
    link: React.PropTypes.string,
    isSelected: React.PropTypes.bool,
    EID: React.PropTypes.number
  },

  expandOrg(e){
    e.preventDefault();
    FlowRouter.go('/myOrg/' + this.props.name);
  },

  render() {
      return <div className="card" onClick={this.expandOrg}>
        <div id="org-picture">
          <img src="got.jpg" height="50px" width="50px"/>
        </div>
        <div className="org-name" onClick={this.orgClick}>
          {this.props.name}
        </div>
      </div>
    }
});
