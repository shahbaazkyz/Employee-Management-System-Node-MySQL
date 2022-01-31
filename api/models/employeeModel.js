module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employee",
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
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: { args: true, msg: "Invalid email!" },
        },
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shift: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designationName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "designation",
          key: "name",
        },
      },
    },
    {
      indexes: [
        {
          fields: ["email"],
          unique: true,
        },
        {
          fields: ["phone"],
          unique: true,
        },
      ],
    }
  );
  return Employee;
};
