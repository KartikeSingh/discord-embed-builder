import React, { FC, Fragment } from "react";
import { GuildCard, Navbar } from "../../components";
import { useQuery } from '@apollo/client';
import { MenuPageQuery } from "../../graphql/query";
import { RouterProps } from "react-router";

export const Menu: FC<RouterProps> = ({ history }) => {

    const { data, loading, error } = useQuery<Data>(MenuPageQuery);

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
    } else if (data) {
        if (!data.getUser) history.push('/');

        return (
            <Fragment>
                <Navbar user={data.getUser} />
                <div className="container__guilds">
                    {
                        data ? data?.getGuilds?.map((v, key) => (
                            <GuildCard name={v.name} key={key} id={v.id} icon={v.icon} />
                        )) : <h1>You donot have any mutual guild with bot where you have manage server permissions.</h1>
                    }
                </div>
            </Fragment>
        )
    } else {
        history.push('/');

        return (
            <Fragment>
                Error
            </Fragment>
        )
    }
}

interface Data {
    getUser: {
        id: string | undefined,
        name: string | undefined,
        avatar: string | undefined,
    },
    getGuilds: Array<guilds>
}

interface guilds {
    id: string,
    name: string,
    icon: string,
}