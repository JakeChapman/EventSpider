Filter = React.createClass({

  getCategories(){
    //TODO: Query for top 3 categories and store in array
    // Categories.find().sort(eventTotal: -1).limit(3);
  },

  render() {
    return (
      <div className="filters">
        <div className="row">
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />New</div>
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />Popular</div>
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />Friends</div>
        </div>
        <div className="row">
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />Filter by Org.</div>
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />Filter by Sub Category</div>
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />Search</div>
        </div>
        <div className="row">
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />Sports</div>
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />General</div>
          <div className="col-xs-4" id="filter-block"><img src="generic_profile.png" />Major</div>
        </div>
      </div>
    );
  }

});
