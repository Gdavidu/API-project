'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'})

      Spot.belongsToMany(
        models.User,
        {
          through:models.Review,
          foreignKey: 'spotId', onDelete: 'cascade', hooks:true}
        )
     Spot.belongsToMany(
        models.User,
        {
          through: models.Booking,
          foreignKey: 'spotId', onDelete: 'cascade', hooks:true}
        );

      Spot.hasMany(
            models.SpotImage,
            {foreignKey: 'spotId', onDelete: 'cascade', hooks:true}
            )
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {type:DataTypes.STRING,
      allowNull:false},
    description: {type:DataTypes.STRING,
      allowNull:false},
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
