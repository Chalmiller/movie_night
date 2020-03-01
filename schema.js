const axios = require('axios')

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

// Search Type
const SearchType = new GraphQLObjectType({
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
    name: 'Ratings',
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
        movieInfo: {
            type: SearchType,
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