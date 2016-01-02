Registration = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    console.log('getting data');
    return {colleges: Colleges.find({}).fetch()};
  },

  isSearchable(text) {
    if (text.length > 3) {
      return true
    }
    else{
      return false
    };
  },

  searchResults(text) {
    if (isSearchable(text)) {
      return true;
    };
  },

  render() {
    return (
      <div className="registration">

        <div className="register-content">

          <form id="register-form" role="form">

            <div className="form-group form-inline">
              <label for="fname">First Name</label>
              <input type="text" className="form-control" id="fname" placeholder="Enter First Name"/>
            </div>

            <div className="form-group form-inline">
              <label for="lname">Last Name</label>
              <input type="text" className="form-control" id="lname" placeholder="Enter Last Name"/>
            </div>

            <div className="form-group form-inline">
              <label for="college">College</label>
              <input type="text" className="form-control" id="collegeSearch" placeholder="Enter College" />
            </div>

            <div className="form-group">
              <label for="email" className="form-inline">Email</label>
              <input type="email" className="form-control form-inline" id="email" placeholder="Enter Email"/>
              <input type="email" className="form-control" id="confirm-email" placeholder="Confirm Email"/>
            </div>

            <div className="form-group" id="passwordFields">
              <label for="password" className="form-inline">Password</label>
              <input type="password" className="form-control form-inline" id="password" placeholder="Enter Password"/>
              <input type="password" className="form-control col-md-10" id="confirm-password" placeholder="Confirm Password"/>
            </div>

            <div className="form-group" id="register-button-container">
              <input type="submit" value="Register" className="btn btn-lg btn-primary" id="register-button"/>
            </div>

          </form>
        </div>
      </div>
    );
  }
});
