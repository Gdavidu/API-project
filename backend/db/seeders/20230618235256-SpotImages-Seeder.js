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
        url: "https://ibb.co/pKq6kJn",
        preview: true
      },
      {
        spotId: 1,
        url: "https://ibb.co/DWW3RQn",
        preview: true
      },
      {
        spotId: 1,
        url: "https://ibb.co/DWW3RQn",
        preview: true
      },
      {
        spotId: 1,
        url: "https://ibb.co/DWW3RQn",
        preview: true
      },
      {
        spotId: 1,
        url: "https://ibb.co/DWW3RQn",
        preview: true
      },
      {
        spotId: 3,
        url: "https://ibb.co/rtnS1Gy",
        preview: true
      },
      {
        spotId: 2,
        url: "https://ibb.co/Y8vTDdX",
        preview: true
      },
      {
        spotId: 4,
        url: "https://ibb.co/xzCSVBw",
        preview: true
      },
      {
        spotId: 5,
        url: "https://ibb.co/BNqdVZ7",
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
