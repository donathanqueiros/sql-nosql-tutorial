const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoices', {
    invoice_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'InvoiceId'
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'CustomerId'
      },
      field: 'CustomerId'
    },
    invoice_date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'InvoiceDate'
    },
    billing_address: {
      type: DataTypes.STRING(70),
      allowNull: true,
      field: 'BillingAddress'
    },
    billing_city: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'BillingCity'
    },
    billing_state: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'BillingState'
    },
    billing_country: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'BillingCountry'
    },
    billing_postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'BillingPostalCode'
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      field: 'Total'
    }
  }, {
    sequelize,
    tableName: 'invoices',
    timestamps: false,
    indexes: [
      {
        name: "IFK_InvoiceCustomerId",
        fields: [
          { name: "CustomerId" },
        ]
      },
    ]
  });
};
