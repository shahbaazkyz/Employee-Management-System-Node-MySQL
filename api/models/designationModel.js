module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define(
    "designation",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Designation already exists!",
        },
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      indexes: [
        {
          fields: ["name"],
          unique: true,
        },
      ],
    }
  );
  return Designation;
};
