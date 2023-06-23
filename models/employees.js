const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    employee_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'EmployeeId'
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'LastName'
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'FirstName'
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'Title'
    },
    reports_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'EmployeeId'
      },
      field: 'ReportsTo'
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'BirthDate'
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'HireDate'
    },
    address: {
      type: DataTypes.STRING(70),
      allowNull: true,
      field: 'Address'
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'City'
    },
    state: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'State'
    },
    country: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'Country'
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'PostalCode'
    },
    phone: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'Phone'
    },
    fax: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'Fax'
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'Email'
    }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false,
    indexes: [
      {
        name: "IFK_EmployeeReportsTo",
        fields: [
          { name: "ReportsTo" },
        ]
      },
    ]
  });
};
