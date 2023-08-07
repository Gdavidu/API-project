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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-586898398649103226/original/9c689aaa-2364-4f1f-ae9c-d56bda466912.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-586898398649103226/original/9e6c2409-c192-4e1f-9c05-be4eb486051c.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-586898398649103226/original/c6c5f145-42e4-48ba-aaaf-c1a15cd68ae4.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-586898398649103226/original/06dd2926-c7d9-4846-8534-37fb0b5a8cd3.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-586898398649103226/original/75596971-c074-4259-9611-ba5663433f74.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-586898398649103226/original/0a8643e3-a2b3-41c8-bca9-9b7e8a00c9f5.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://nationaltoday.com/wp-content/uploads/2022/08/27-McDonalds-Day-1200x834.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-879012498547289208/original/e24abccc-fbd9-4b42-a8b6-7b57598c13fc.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-725313637421984377/original/cee1ce2a-a42b-41df-a206-8311a8af2924.jpeg?im_w=720",
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
