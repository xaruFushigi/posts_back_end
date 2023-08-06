const Comments = require("./Comments");
const dontenv = require("dotenv");
dontenv.config();

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      // model attributes go here
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Specify the schema here
      schema: process.env.DATABASE_SCHEMA,
      // By default, Sequelize will add "createdAt" and "updatedAt" fields to the table
      timestamps: true,
      // If you don't want these fields, set timestamps to false
      // timestamps: false,
    },
  );

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade", // when deleted a comment, it deletes automatically every related Post
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade", // when deleted a comment, it deletes automatically every related Post
    });
  };
  return Posts;
};
