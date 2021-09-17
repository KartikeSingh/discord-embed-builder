import React, { FC, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { Navbar } from "../../components/";

interface props extends RouteComponentProps {
    user?: {
        id: string,
        name: string,
        avatar: string,
    }
}

export const Home: FC<props> = ({ user }) => {
    return (
        <Fragment>
            <Navbar user={user} />
            <div className="container__home">
                <h1>Embed Generator</h1>
                <p>Easily create embed for your servers.</p>

                <button className="button__link"><a href="/menu">Your Servers</a></button>
            </div>
        </Fragment>
    )
}