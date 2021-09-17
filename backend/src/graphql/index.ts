import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { getGuilds, getGuildChannels, getGuild } from '../utility';

const userType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        avatar: { type: GraphQLString },
        access_token: { type: GraphQLString },
        refresh_token: { type: GraphQLString },
    })
});

const guildType = new GraphQLObjectType({
    name: "GuildType",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        icon: { type: GraphQLString },
    })
});

const channelType = new GraphQLObjectType({
    name: "ChannelType",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    })
});

const rootSchema = new GraphQLObjectType({
    name: "RootSchema",
    fields: {
        getUser: {
            type: userType,
            async resolve(source, args, req) {
                return req.user
            }
        },
        getGuilds: {
            type: new GraphQLList(guildType),
            async resolve(source, args, req) {
                return await getGuilds(req.user);
            }
        },
        getChannels: {
            type: new GraphQLList(channelType),
            args: {
                guild: { type: GraphQLString }
            },
            async resolve(source, args, req) {
                return await getGuildChannels(args.guild, req.user);
            }
        },
        getGuild: {
            type: guildType,
            args: {
                guild: { type: GraphQLString }
            },
            async resolve(source, args) {
                return await getGuild(args.guild);
            }
        }
    }
})

export default new GraphQLSchema({ query: rootSchema });