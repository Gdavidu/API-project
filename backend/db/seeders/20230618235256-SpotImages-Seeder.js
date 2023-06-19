'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "example.png",
        preview: true
      },
      {
        spotId: 3,
        url: "example1.png",
        preview: true
      },
      {
        spotId: 2,
        url: "example2.png",
        preview: true
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
        preview: { [Op.in]:[true,false]}
      }, {});

  }
};
