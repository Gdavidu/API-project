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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-785731234229058562/original/96379dba-817e-4e83-b6b1-ad5a37494795.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 3,
        url: "https://nationaltoday.com/wp-content/uploads/2022/08/27-McDonalds-Day-1200x834.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-616900705459751410/original/721aa921-23aa-4a9b-b03c-915ed1a39f22.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-918511772278598927/original/d0aa2e45-89d7-45fe-8eff-bbd83130bf33.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-586898398649103226/original/0a8643e3-a2b3-41c8-bca9-9b7e8a00c9f5.jpeg?im_w=720",
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
