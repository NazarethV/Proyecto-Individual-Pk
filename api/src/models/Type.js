const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // si el nombre debe ser único
          },
    },
    { timestamps: false }
  )
}



