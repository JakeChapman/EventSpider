class EventShow extends React.Component{

    render() {
        let user = Meteor.user();
        for (var i = 0; i < user.profile.eids.length; i++) {
            console.log(user.profile.eids[i]);
        }

        //if ($.inArray(this.props.eventItem.EID, user.profile.eids) > -1) {

        return (
            <div className="card full">
                <div className="top-section">
                    <div id="sub-icon">
                        <i className="zmdi zmdi-run zmdi-hc-3x"/>
                    </div>
                    <div className="vertical-line"/>
                    <div id="title-section">
                        {this.props.eventItem.title}
                    </div>
                </div>
                <div className="descrip-section">
                    {this.props.eventItem.descrip}
                </div>
                <div className="save-section">
                    add to
                    <i className="glyphicon glyphicon-calendar" onClick={this.addToCalendar}/>
                    <i className="glyphicon glyphicon-ok-circle" id="calendarAdded"/>
                </div>
                <div className="info-section">
                    <div id="location-full">
                        <i className="zmdi zmdi-pin"/>
                        {this.props.eventItem.location}
                    </div>
                    <div id="time-full">
                        <i className="zmdi zmdi-time"/>
                        {this.props.eventItem.start_time}
                        -
                        {this.props.eventItem.end_time}
                    </div>
                </div>
                <div className="img-section">
                    <img src="/got.jpg" height="75px" width="75px" className="img-thumbnail"/>
                </div>
                <div className="org-section">
                    Host by: TODO ADD ORG
                </div>
                <div className="social-section">
                    <i className="zmdi zmdi-facebook-box zmdi-hc-2x" id="facebook-full"></i>
                    <i className="zmdi zmdi-google-plus zmdi-hc-2x" id="google-full"></i>
                </div>
            </div>
        )
    }
}

EventShow.propTypes =  {
    title: React.PropTypes.string,
    descrip: React.PropTypes.string,
    location: React.PropTypes.string,
    tags: React.PropTypes.object,
    categories: React.PropTypes.object,
    date: React.PropTypes.string,
    start_time: React.PropTypes.string,
    end_time: React.PropTypes.string
};

this.EventShow = EventShow;