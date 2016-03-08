this.CategoryList = React.createClass({
    renderList(){
        return this.props.items.map(item =>{
            return (
                <input type="checkbox" key={item._id} name={item.name}  value={item.name}>{item.name}</input>
            )
        });
    },

    render(){
        return(
                <div>
                    {this.renderList()}
                </div>
        )
    }
});
