Filter = React.createClass({

  render() {
    return (
      <div className="filters">
        <div className="row">
          <div id="filter-block">New</div>
          <div id="filter-block">Popular</div>
          <div id="filter-block">Friends</div>
        </div>
        <div className="row">
          <div id="filter-block">Filter by Org.</div>
          <div id="filter-block">Filter by Sub Category</div>
          <div id="filter-block">Search</div>
        </div>
        <div className="row">
          <div id="filter-block">Sports</div>
          <div id="filter-block">General</div>
          <div id="filter-block">Major</div>
        </div>
      </div>
    );
  }

});
