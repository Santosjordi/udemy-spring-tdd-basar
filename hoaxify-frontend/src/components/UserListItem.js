import React from "react";
import defaultPicture from '../assets/profile.png';
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const UserListItem = props => {
    return (
        <Link
            to={`/${props.user.username}`}
            className="list-group-item list-group-item-action">
            <ProfileImageWithDefault
                className="rounded-circle"
                image={props.user.image}
                alt='profile'
                width='32' height='32' />
            <span className="pl-2">{`${props.user.displayName}@${props.user.username}`}</span>
        </Link>
    )
}

export default UserListItem;