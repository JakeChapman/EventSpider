Login = React.createClass({
  handleLogin(event) {
    console.log('HERE');
    event.preventDefault();
    //retrieve the input field values
    var email = $('#userEmail').val();
    var password = $('#userPassword').val();

    //Trim and validate your fields here....
    console.log("Email: " + email);
    console.log("Password: " + password);
    email = this.trimInput(email);
    console.log(email);
    Meteor.loginWithPassword(email, password, function(err) {
      if (!err) {
        console.log("success");
        FlowRouter.go('/');
      } else {
        console.log("error");
        Notifications.warn('Login Failed', err);
      }
    });
  },
  handleNewUser(event){
    console.log("going to registration");
    FlowRouter.go('/registration');
  },

  trimInput(val) {
    return val.replace(/^\s*|\s*$/g, "");
  },

  isValidPassword() {

  },

  render() {
    return <div>
      <div className="media-object background-image"></div>
      <div className="login" id="login-wrapper">
        <div className="login-content">
          <img alt="Company Image" id="logo" src="logo.png"/>
          <div className='social-login'>
            <button className="btn btn-lg" id='facebook'>
              <i className="zmdi zmdi-facebook-box zmdi-hc-2x"></i>
              Sign in with Facebook
            </button>
            <button className="btn btn-lg" id='google'>
              <i className="zmdi zmdi-google-plus zmdi-hc-2x"></i>
              Sign in with Twitter
            </button>
          </div>
          <h2 id="login-break">
            <span>
              or
            </span>
          </h2>

          <form action="action" className="form-group form-signin" id="loginForm"  onSubmit={this.handleLogin}>
            <div className="input-group">
              <div className="input-group-addon">
                <span className="glyphicon glyphicon-envelope"></span>
              </div>
              <input className="form-control" id="userEmail" placeholder="Email address" type="email"/>
            </div>
            <div className="input-group">
              <div className="input-group-addon">
                <span className="glyphicon glyphicon-lock"></span>
              </div>
              <input className="form-control" id="userPassword" placeholder="Password" type="password"/>
            </div>
            <div id="ResetPassword">
              <a href="/">Forget your password?</a>
            </div>
            <div className="btn" id="loginBtn">
              <input className="btn btn-lg btn-primary btn-block" id="login-button" type="submit" value="Login"/>
            </div>
          </form>
          <div className="btn" id="registerBtn">
            <button className="btn btn-lg btn-primary btn-block" id="newUser" onClick={this.handleNewUser}>
              <span className="glyphicon glyphicon-user"></span>
              Register New User
            </button>
          </div>
        </div>
      </div>
    </div>
  }
});
