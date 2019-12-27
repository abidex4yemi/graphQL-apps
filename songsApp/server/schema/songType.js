const mongoose = require("mongoose");
const graphql = require("graphql");
const LyricType = require("./lyricType");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Song = mongoose.model("song");

const SongType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return Song.findLyrics(parentValue.id);
      }
    }
  })
});

module.exports = SongType;
