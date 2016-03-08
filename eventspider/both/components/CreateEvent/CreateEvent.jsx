this.CreateEvent = React.createClass({

    handleClick() {
        //Handle event creation in event domain
        console.log("creating event...");
    },

    render() {
        return (
            <div className='card full create-event'>
                <div className="input-group" id="eText">
                    <input type="text" id="eTitle" placeholder="Enter Title"/>
                    <input type="text" id="eLocation" placeholder="Enter Location"/>
                </div>
                <div className="input-group" id="eDescrip">
                    <textarea placeholder="Enter Description here"></textarea>
                </div>
                <div className="input-group" id="eDescrip">
                    <label htmlFor="eDate">Enter Date</label>
                    <input type="date" id="eDate" placeholder="Enter Date"/>
                </div>
                <div className="input-group" id="eList">
                    <CategoryList items={this.props.items}/>
                </div>
                <button onClick={this.handleClick()} className="btn btn-default">Create Event</button>
            </div>
        );
    }
});
