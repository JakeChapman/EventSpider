Nav = React.createClass({
  render() {
      return <ul id="sidebar-nav">
        <div id="sidebar-profile">
          <div id="profile-picture">
            <img src="got.jpg" height="75px" width="75px"/>
          </div>
          <div id="profile-info">
            <p id="p-info">John Smith</p>
            <p id="p-info">Stats</p>
          </div>
        </div>
        <div id="sidebar-links col-md-12">
          <li id="{{ activeIfTemplateIs 'masterCalendar' }}">
             <a href="{{ pathFor 'masterCalendar'}}">Master Calendar</a>
           </li>
           <li id="{{ activeIfTemplateIs 'eventsList' }}">
              <a href="{{ pathFor 'eventsList'}}">Events List</a>
            </li>
          <li><a href="{{ pathFor 'schools'}}">Find Your School</a></li>
          <li><a href="{{ pathFor 'topics'}}">Topics</a></li>
        </div>
      </ul>
  }
});
