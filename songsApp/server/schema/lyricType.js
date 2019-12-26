const mongoose = require("mongoose");
const graphql = require("graphql");
const SongType = require("./songType");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const Lyric = mongoose.model("lyric");

const LyricType = new GraphQLObjectType({
  name: "LyricType",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    likes: {
      type: GraphQLInt
    },
    content: {
      type: GraphQLString
    },
    song: {
      type: SongType,
      resolve(parentValue) {
        return Lyric.findById(parentValue)
          .populate("song")
          .then(lyric => {
            return lyric.song;
          });
      }
    }
  })
});

module.exports = LyricType;
