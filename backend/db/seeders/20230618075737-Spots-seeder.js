'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Spots";
      await queryInterface.bulkInsert(options, [
        {
            "ownerId": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "lat": 37.7645358,
            "lng": -122.4730327,
            "name": "App Academy",
            "description": "Place where web developers are created",
            "price": 123
          },
          {
            "ownerId": 2,
            "address": "123 Fourth Street",
            "city": "San Mateo",
            "state": "California",
            "country": "United States of America",
            "lat": 97.76353545,
            "lng": -62.2414143,
            "name": "Mcdonalds",
            "description": "MickeyDs",
            "price": 1130
          },
          {
            "ownerId": 3,
            "address": "1430 Court Court",
            "city": "Las Vegas",
            "state": "Nevada",
            "country": "United States of America",
            "lat": 909.4830598,
            "lng": -18.1234567,
            "name": "Vegas Cottage",
            "description": "Small place on the strip",
            "price": 190
          }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
  await queryInterface.bulkDelete(options, {
    city: {[Op.in]: ['Las Vegas', 'San Francisco', 'San Mateo']}
  }, {});
  }
};
