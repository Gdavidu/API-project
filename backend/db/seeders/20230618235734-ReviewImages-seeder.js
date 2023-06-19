'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "image url"
      },
      {
        reviewId: 2,
        url: "image url1"
      },
      {
        reviewId: 3,
        url: "image url2"
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
        reviewId: { [Op.in]:[1,2,3]}
      }, {});

  }
};
