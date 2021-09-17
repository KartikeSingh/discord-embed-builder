import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";

interface props {
    user?: {
        id: string | undefined,
        name: string | undefined,
        avatar: string | undefined,
    }
}

export const Navbar: FC<props | undefined> = ({ user }) => {
    const name = user?.name;

    return (
        <Fragment>
            <ul className="navbar">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/menu'}>Menu</Link></li>
                <li className="right_float"><a href={name ? 'http://localhost:3001/api/auth/logout' : 'http://localhost:3001/api/auth/login'}>{name ? name : "Login"}</a></li>
            </ul>
        </Fragment>
    )
}