const dontenv = require("dotenv");
dontenv.config();

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      commentBody: {
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
  return Comments;
};
