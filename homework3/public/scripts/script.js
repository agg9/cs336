/*
 * script.js is a react frontend for homework3
 * @Author Austin Gibson
 * CS336 Fall 2018
 *
 */

var PersonBox = React.createClass({

    getInitialState: function() {
        return {data: []};
    },
    loadPeopleFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, err.toString());
         }.bind(this));
    },
    handlePersonSubmit: function(person) {
        var people = this.state.data;
        var newPeople = people.concat([person]);
        this.setState({data: newPeople});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: person,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: people});
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.loadPeopleFromServer();
        setInterval(this.loadPeopleFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="peopleBox">
                <h1>People</h1>
                <PersonList data={this.state.data} />
                <PersonForm onPersonSubmit={this.handlePersonSubmit} />
            </div>
        );
    }
});

var PersonList = React.createClass({
    render: function() {
        var peopleNodes = this.props.data.map(function(person) {
            return (
                <Person loginID={person.loginID}  >
                    {person.firstName}
                    {person.lastName}
                    {person.startDate}
                </Person>
            );
        });
        return (
            <div className="peopleList">
                {peopleNodes}
            </div>
        );
    }
});

var PersonForm = React.createClass({

    getInitialState: function() {
        return {loginID: '', firstName: '', lastName: '', startDate: ''};
    },

    handleLoginIDChange: function(e) {
        this.setState({loginID: e.target.value});
    },

    handlefirstNameChange: function(e) {
        this.setState({firstName: e.target.value});
    },

    handlelastNameChange: function(e) {
        this.setState({lastName: e.target.value});
    },

    handleStartDateChange: function(e) {
        this.setState({startDate: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var loginID = this.state.loginID.trim();
        var firstName = this.state.firstName.trim();
        var lastName = this.state.lastName.trim();
        var startDate = this.state.startDate.trim();
        if (!firstName || !lastName || !loginID || !startDate) {
            return;
        }
        this.props.onPersonSubmit({loginID: loginID, firstName: firstName, lastName: lastName, startDate: startDate});
        this.setState({loginID: '', firstName: '', lastName: '', startDate: ''});
    },

    render: function() {
        return (
            <form className="personForm" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="login id..."
                  value={this.state.loginID}
                  onChange={this.handleLoginIDChange}
                />
                <input
                  type="text"
                  placeholder="first name..."
                  value={this.state.firstName}
                  onChange={this.handlefirstNameChange}
                />
                <input
                  type="text"
                  placeholder="last name..."
                  value={this.state.lastName}
                  onChange={this.handlelastNameChange}
                />
                <input
                  type="text"
                  placeholder="start date..."
                  value={this.state.startDate}
                  onChange={this.handleStartDateChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var Person = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render: function() {
        return (
            <div className="person">
                <h2 className="personID" >
                    {this.props.loginID}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

ReactDOM.render(
    <PersonBox url="/people" pollInterval={2000}/>,
    document.getElementById('content')
);