const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers', {
    customer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'CustomerId'
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: 'FirstName'
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'LastName'
    },
    company: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'Company'
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
      allowNull: false,
      field: 'Email'
    },
    support_rep_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'EmployeeId'
      },
      field: 'SupportRepId'
    }
  }, {
    sequelize,
    tableName: 'customers',
    timestamps: false,
    indexes: [
      {
        name: "IFK_CustomerSupportRepId",
        fields: [
          { name: "SupportRepId" },
        ]
      },
    ]
  });
};
