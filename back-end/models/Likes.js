const dontenv = require("dotenv");
dontenv.config();

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      // Other columns and their data types can be defined here
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

  return Likes;
};
