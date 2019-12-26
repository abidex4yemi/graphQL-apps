const mongoose = require("mongoose");
const graphql = require("graphql");

const SongType = require("./songType");
const LyricType = require("./lyricType");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Song = mongoose.model("song");
const Lyric = mongoose.model("lyric");

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: {
          type: GraphQLString
        }
      },
      resolve(parentValue, { title }) {
        return new Song({ title }).save();
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: {
          type: GraphQLString
        },
        songId: {
          type: GraphQLID
        }
      },
      resolve(parentValue, args) {
        return Song.addLyric(songId, content);
      }
    },
    likeLyric: {
      type: LyricType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parentValue, { id }) {
        return Lyric.like(id);
      }
    },
    deleteSong: {
      type: SongType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parentValue, { id }) {
        return Song.remove({ _id: id });
      }
    }
  }
});

module.exports = mutations;
