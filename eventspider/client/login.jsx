Login = React.createClass({
    render() {
      return  <div>
      <div class="background-image"></div>
      <div class="login" id="login-wrapper">
        <div class="login-content">
          <img alt="Company Image" id="logo" src="logo.png"/>
          <div class='social-login'>
            <button class="btn btn-lg" id='facebook'>
              <i class="zmdi zmdi-facebook-box zmdi-hc-2x"></i>
              Sign in with Facebook
            </button>
            <button class="btn btn-lg" id='google'>
              <i class="zmdi zmdi-google-plus zmdi-hc-2x"></i>
              Sign in with Twitter
            </button>
          </div>
          <h2 id="login-break"><span> or </span></h2>

          <form action="action" class="form-group form-signin" id="loginForm">
            <div class="input-group">
              <div class="input-group-addon">
                <span class="glyphicon glyphicon-envelope"></span>
              </div>
              <input class="form-control" id="userEmail" placeholder="Email address" type="email"/>
            </div>
            <div class="input-group">
              <div class="input-group-addon">
                <span class="glyphicon glyphicon-lock"></span>
              </div>
              <input class="form-control" id="userPassword" placeholder="Password" type="password"/>
            </div>
            <div id="ResetPassword">
              <a href="/">Forget your password?</a>
            </div>
            <div class="btn" id="loginBtn">
              <input class="btn btn-lg btn-primary btn-block" id="login-button" type="submit" value="Login"/>
            </div>
          </form>
          <div class="btn" id="registerBtn">
            <button class="btn btn-lg btn-primary btn-block" id="newUser">
              <span class="glyphicon glyphicon-user"></span>
              Register New User
            </button>
          </div>
        </div>
      </div>
      </div>
    }
});
