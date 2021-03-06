"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.JobSkills, {
        foreignKey: "jobId",
        as: "skills",
      });
      this.hasMany(models.Contacts, {
        foreignKey: "jobId",
        as: "contacts",
      });
    }
  }
  Job.init(
    {
      internship: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      link: DataTypes.TEXT,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "Applied",
          "Interview Scheduled",
          "Decision Pending",
          "Accepted",
          "Rejected"
        ),
        defaultValue: "Applied",
      },
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
