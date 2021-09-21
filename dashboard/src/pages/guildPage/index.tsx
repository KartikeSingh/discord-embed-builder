import React, { FC, Fragment } from "react";
import { Navbar, EmbedForm } from "../../components/";
import { useQuery } from '@apollo/client';
import { GuildPageQuery } from "../../graphql/query";
import { RouteComponentProps } from "react-router-dom";

interface matchParam {
    guild: string
}

export const GuildPage: FC<RouteComponentProps<matchParam>> = ({ match, history }) => {

    const { data, loading, error } = useQuery(GuildPageQuery, {
        variables: {
            guild: match.params.guild
        }
    });

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
        if (!data.getUser) history.push('/');

        return (
            <Fragment>
                <Navbar user={data.getUser} />
                <EmbedForm guild={match.params.guild} channels={data.getChannels} />
            </Fragment>
        )
    }
}