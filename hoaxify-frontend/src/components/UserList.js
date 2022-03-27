import React from "react";
import * as apiCalls from '../api/apiCalls';
import UserListItem from "./UserListItem";

class UserList extends React.Component {
    state = {
        page: {
            content: [],
            number: 0,
            size: 3
        }
    }

    componentDidMount() {
        apiCalls
            .listUsers({ page: this.state.page.number, size: this.state.page.size })
            .then((response) => {
                this.setState({
                    page: response.data
                });
            });
    }

    render() {
        return (
            <div className="card">
                <h3 className="card-title m-auto">Users</h3>
                <div className="list-group list-group-flush" data-testid='userGroup'>
                    {this.state.page.content.map((user) => {
                        return (
                            <UserListItem key={user.username} user={user}/>
                        ) // key is meant to supress browser warning? "Each child in a list must have a unique id"
                    })}
                </div>
            </div>
        );
    }
}

export default UserList;