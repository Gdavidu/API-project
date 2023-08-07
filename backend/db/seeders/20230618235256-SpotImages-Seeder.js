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
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691379734/9c689aaa-2364-4f1f-ae9c-d56bda466912_oinjdi.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691379793/9e6c2409-c192-4e1f-9c05-be4eb486051c_j9bppw.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691379929/c6c5f145-42e4-48ba-aaaf-c1a15cd68ae4_rig0l2.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691379938/c3f393c2-d133-4bfb-b435-550fa558f67e_vtlbfe.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691379956/0a8643e3-a2b3-41c8-bca9-9b7e8a00c9f5_whnj8h.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691380010/e24abccc-fbd9-4b42-a8b6-7b57598c13fc_ls85uo.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691379763/27-McDonalds-Day-1200x834_fgchg8.webp",
        preview: true
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691380026/cacae8df-0efb-4227-ab1a-ccd2f16862a4_rhkib3.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/ddsopojwd/image/upload/v1691380033/a80f49af-afe6-4a48-9356-7ab150869a37_r3rnmc.jpg",
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
