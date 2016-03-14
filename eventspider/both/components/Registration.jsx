this.Registration = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {college: ""}
  },

  getMeteorData() {
    console.log('getting data');
    console.log("Query Parameter: " + this.state.college);
    return {
      colleges: Colleges.find({
        name: {
          $regex: "\.*" + this.state.college
        }
      }, {
        field: {
          name: 1,
          colors: 0,
          state: 0
        }
      }).fetch()
    };
  },

  getColleges() {
    //if ($("#collegeSearch").val().length() > 3) {
    //  TODO: Loop through query and return top 5 colleges (sorted)
    //      appending them as options to the select tag using .append()
    //$("#collegeSearch").val(this.data.colleges[0].name);
    //  };
    var collegeList = $("#collegelist");
    this.setState({college: $("#collegeSearch").val()});
    //clear the dropdown list
    collegeList.empty();
    $.each(this.data.colleges, function(key, val) {
      collegeList.append($("<option></option>").val(val.name).html(val.state));
    });

  },

  registerUser() {
    var email = $("#email").val();
    var name = $("#fname").val() + $('#lname').val();
    var password = $("#password").val();
    var college = Colleges.findOne({name: $("#collegeSearch").val()});
    var profile = {
      school: college.name,
      colors: {
        primary: college.colors.primary,
        secondary_one: college.colors.secondary_one,
        secondary_two: college.colors.secondary_two
      },
      role: "student"
    };

    var userObject = {
      username: name,
      email: email,
      password: password,
      profile: profile
    };


    Accounts.createUser(userObject, function(err) {
      if (!err) {
        console.log("Account created successfully");
        ReactLayout.render(MainLayout, {content: <FeedContainer/>});
      } else {
        console.log("Failed account creation");
      }
    });
  },

  render() {
    return ( <div>
        <div className="register-content background-image">
          <h2 id="register-header">Create an account</h2>
          <form id="register-form" role="form">

            <div className="form-group form-inline">
              <label htmlFor="fname">First Name</label>
              <input type="text" className="form-control" id="inputField" placeholder="Enter First Name"/>
            </div>

            <div className="form-group form-inline">
              <label htmlFor="lname">Last Name</label>
              <input type="text" className="form-control" id="inputField" placeholder="Enter Last Name"/>
            </div>

            <div className="form-group form-inline">
              <label htmlFor="college">College</label>
              <input type="text" className="form-control" id="inputField" placeholder="Enter College" list="collegelist" onKeyUp={this.getColleges}/>
              <datalist id='collegelist'></datalist>
            </div>

            <div className="form-group form-inline">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="inputField" placeholder="Enter Email"/>
              <input type="email" className="form-control" id="confirm-email" placeholder="Confirm Email"/>
            </div>

            <div className="form-group" id="passwordFields">
              <label htmlFor="password" className="form-inline">Password</label>
              <input type="password" className="form-control form-inline" id="inputField" placeholder="Enter Password"/>
              <input type="password" className="form-control col-md-10" id="confirm-password" placeholder="Confirm Password"/>
            </div>

            <div className="form-group" id="register-button-container">
              <button className="btn btn-lg btn-primary btn-block" id="register-button" onClick={this.registerUser}>
                Register
              </button>
            </div>

          </form>
      </div>
    </div>
    )
  }
});
