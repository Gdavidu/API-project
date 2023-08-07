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
        url: "https://asset.cloudinary.com/ddsopojwd/b90f9582ef8bc08a0591a2817d40d3cf",
        preview: true
      },
      {
        spotId: 1,
        url: "https://asset.cloudinary.com/ddsopojwd/7a06bc7250df6b566bd3ec0ce6fc32e4",
        preview: true
      },
      {
        spotId: 1,
        url: "https://asset.cloudinary.com/ddsopojwd/7a06bc7250df6b566bd3ec0ce6fc32e4",
        preview: true
      },
      {
        spotId: 1,
        url: "https://asset.cloudinary.com/ddsopojwd/7a06bc7250df6b566bd3ec0ce6fc32e4",
        preview: true
      },
      {
        spotId: 1,
        url: "https://asset.cloudinary.com/ddsopojwd/7a06bc7250df6b566bd3ec0ce6fc32e4",
        preview: true
      },
      {
        spotId: 3,
        url: "https://asset.cloudinary.com/ddsopojwd/fea2fe443c6a54a4afa81355e5990497",
        preview: true
      },
      {
        spotId: 2,
        url: "https://asset.cloudinary.com/ddsopojwd/35db176c6a94367fd4b657efe30dd075",
        preview: true
      },
      {
        spotId: 4,
        url: "https://asset.cloudinary.com/ddsopojwd/4547ce4c4cb8b2c07810fd31afe497ff",
        preview: true
      },
      {
        spotId: 5,
        url: "https://asset.cloudinary.com/ddsopojwd/005bf813609823b4b248b481610dcb21",
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
