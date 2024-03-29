'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
   await queryInterface.bulkInsert(options, [
    {
        spotId: 1,
        userId: 2,
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-06-08')
     },
     {
      spotId: 3,
      userId: 1,
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-05')
     },
     {
      spotId: 2,
      userId: 3,
      startDate: new Date('2023-03-16'),
      endDate: new Date('2023-03-25')
     },
     {
      spotId: 5,
      userId: 4,
      startDate: new Date('2023-07-16'),
      endDate: new Date('2023-07-25')
     },
     {
      spotId: 4,
      userId: 5,
      startDate: new Date('2023-11-16'),
      endDate: new Date('2023-11-25')
     }
    ], {});

  },

  async down (queryInterface, Sequelize) {
      options.tableName = 'Bookings'
      const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
        spotId: {[Op.in]:[1,2,3,4,5]}
      }, {});
  }
};
