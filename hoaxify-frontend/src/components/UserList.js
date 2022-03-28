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

    loadData = (requestedPage = 0) => {
        apiCalls
            .listUsers({ page: requestedPage, size: this.state.page.size })
            .then((response) => {
                this.setState({
                    page: response.data
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    onClickNext = () => {
        this.loadData(this.state.page.number + 1);
    }
    onClickPrevious = () => {
        this.loadData(this.state.page.number - 1);
    }

    render() {
        return (
            <div className="card">
                <h3 className="card-title m-auto">Users</h3>
                <div className="list-group list-group-flush" data-testid='userGroup'>
                    {this.state.page.content.map((user) => {
                        return (
                            <UserListItem key={user.username} user={user} />
                        ) // key is meant to supress browser warning? "Each child in a list must have a unique id"
                    })}
                </div>
                <div>
                    {!this.state.page.first && <span className="badge badge-light float-left"
                        style={{ cursor: 'pointer' }}
                        onClick={this.onClickPrevious}>
                        {`< previous `}
                    </span>}
                    {!this.state.page.last && <span className="badge badge-light float-right"
                        style={{ cursor: 'pointer' }}
                        onClick={this.onClickNext}>
                        {`next >`}
                    </span>}
                </div>
            </div>
        );
    }
}

export default UserList;