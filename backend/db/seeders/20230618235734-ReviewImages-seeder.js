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
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTYv0DyUVhHLXIuPooVKCOoyVGkQh7ajLK4X1OVD0XsbqPKJmKnYEAaDK6khSvVGIJYhI&usqp=CAU"
      },
      {
        reviewId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-878790077208688262/original/b4f80b7c-a546-49d9-931c-12e3cb683003.jpeg?im_w=720"
      },
      {
        reviewId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-43779320/original/5e373a7b-8565-4f36-8a62-d063308804bb.jpeg?im_w=720"
      },
      {
        reviewId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-44968237/original/a0b1e51a-1a17-4b11-93f7-5cad9646567d.jpeg?im_w=720"
      },
      {
        reviewId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-796442211647220964/original/76a0b088-11f4-43a4-815d-cb99ce6ea0e5.jpeg?im_w=720"
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
        reviewId: { [Op.in]:[1,2,3,4,5]}
      }, {});

  }
};
