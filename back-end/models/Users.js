const Comments = require("./Comments");
const dontenv = require("dotenv");
dontenv.config();

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      // model attributes go here
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Set this to enforce uniqueness for the username
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Specify the schema here
      schema: process.env.DATABASE_SCHEMA,
      // By default, Sequelize will add "createdAt" and "updatedAt" fields to the table
      timestamps: true, // by default it is alwasy true
      // If you don't want these fields, set timestamps to false
      // timestamps: false,
    },
  );

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade", // when deleted a comment, it deletes automatically every related Post
    });

    Users.hasMany(models.Posts, {
      onDelete: "cascade", // when deleted a comment, it deletes automatically every related Post
    });
  };

  return Users;
};
