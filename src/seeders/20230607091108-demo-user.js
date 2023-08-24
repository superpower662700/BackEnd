'use strict';
// email: DataTypes.STRING,
// password: DataTypes.STRING,
// firstName: DataTypes.STRING,
// lastName: DataTypes.STRING,
// address: DataTypes.STRING,
// gender: DataTypes.BOOLEAN,
// roleId: DataTypes.STRING,
// phonenumber: DataTypes.STRING,
// positionId: DataTypes.STRING,
// image: DataTypes.STRING
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'hoidanID',
      lastName: 'Eric',
      address: 'USA',
      gender: 1,
      roleId: 'R1',
      phonenumber: '0923123213',
      positionId: 'haha',
      image: 'hihi',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {

  }
};
