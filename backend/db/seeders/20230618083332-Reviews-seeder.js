'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
      {

        spotId: 1,
        userId: 2,
        review: "Super place",
        stars: 5
      },
      {

        spotId: 1,
        userId: 3,
        review: "Decent at best",
        stars: 2
      },
      {

        spotId: 2,
        userId: 3,
        review: "Dirty",
        stars: 2
      },
      {

        spotId: 3,
        userId: 1,
        review: "Good bang for your buck",
        stars: 4
      },
      {

        spotId: 5,
        userId: 1,
        review: "Terrible",
        stars: 1
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
        stars: { [Op.in]:[5,3,4,2,1]}
      }, {});

  }
};
