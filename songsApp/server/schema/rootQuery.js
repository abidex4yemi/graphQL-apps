const mongoose = require("mongoose");
const graphql = require("graphql");

const SongType = require("./songType");
const LyricType = require("./lyricType");

const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const Lyric = mongoose.model("lyric");
const Song = mongoose.model("song");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      }
    },
    song: {
      type: SongType,
      args: {
        id: new GraphQLNonNull(GraphQLID)
      },
      resolve(parentValue, { id }) {
        return Song.findById(id);
      }
    },
    lyric: {
      type: LyricType,
      args: {
        id: new GraphQLNonNull(GraphQLID)
      },
      resolve(parentValue, { id }) {
        return Lyric.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
