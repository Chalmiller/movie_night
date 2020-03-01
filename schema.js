const axios = require('axios')

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        Title: {
            type: GraphQLString
        },
        Year: {
            type: GraphQLString
        },
        Rated: {
            type: GraphQLString
        },
        Released: {
            type: GraphQLString
        },
        Director: {
            type: GraphQLString
        },
        Writer: {
            type: GraphQLString
        },
        Actors: {
            type: GraphQLString
        },
        Plot: {
            type: GraphQLString
        },
        Awards: {
            type: GraphQLString
        },
        Poster: {
            type: GraphQLString
        },
        Ratings: {
            type: new GraphQLList(RatingsType)
        }
    })
});

// Links Type
const RatingsType = new GraphQLObjectType({
    name: 'Links',
    fields: () => ({
        Source: {
            type: GraphQLString
        },
        Value: {
            type: GraphQLString
        }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launch: {
            type: LaunchType,
            args: {
                movie: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://www.omdbapi.com/?apikey=5c5dfb&t=${args.movie}`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});