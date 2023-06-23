const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sqlite_stat1', {
    tbl: {
      type: "",
      allowNull: true
    },
    idx: {
      type: "",
      allowNull: true
    },
    stat: {
      type: "",
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sqlite_stat1',
    timestamps: false
  });
};
