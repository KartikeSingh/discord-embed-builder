import { gql } from '@apollo/client';

export const homePageQuery = gql`
query homePageQuery {
    getUser{
        id
        name
        avatar
    }
}
`;

export const MenuPageQuery = gql`
query homePageQuery {
    getUser{
        id
        name
        avatar
    }
    getGuilds{
        id
        name
        icon
    }
}
`;

export const GuildPageQuery = gql`
query homePageQuery ($guild:String){
    getUser{
        id
        name
        avatar
    }
    getGuild (guild:$guild){
        id
        name
        icon
    }
    getChannels (guild:$guild){
        id
        name
    }
}
`;