import React, { FC, Fragment } from "react";
import { Navbar } from "../../components/";
import { useQuery } from '@apollo/client';
import { homePageQuery } from "../../graphql/query";
import { RouterProps } from "react-router";

export const Home: FC<RouterProps> = () => {

    const { data, loading, error } = useQuery(homePageQuery);

    if (loading && !error && !data) {
        return (
            <Fragment>
                <h1>Loading...</h1>
            </Fragment>
        )
    } else if (error && !loading && !data) {
        return (
            <Fragment>
                <h1>Error</h1>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Navbar user={data.getUser} />
                <div className="container__home">
                    <h1>Embed Generator</h1>
                    <p>Easily create embed for your servers.</p>

                    <button className="button__link"><a href="/menu">Your Servers</a></button>
                </div>
            </Fragment>
        )
    }
}