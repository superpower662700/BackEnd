// currenNumber: DataTypes.STRING,
// maxNumber: DataTypes.STRING,
// date: DataTypes.DATE,
// timeType: DataTypes.STRING,
// doctorId: DataTypes.INTEGER

'use strict';
module.exports = {
        up: async (queryInterface, Sequelize) => { // up nên không thể cập nhật phải xóa bảng r chạy lại 
                await queryInterface.createTable('schedules', {

                        id: {
                                allowNull: false,
                                autoIncrement: true,
                                primaryKey: true,
                                type: Sequelize.INTEGER
                        },
                        currenNumber: {
                                type: Sequelize.INTEGER
                        },
                        maxNumber: {
                                type: Sequelize.INTEGER
                        },
                        date: {
                                type: Sequelize.DATE
                        },
                        timeType: {
                                type: Sequelize.STRING
                        },
                        doctorId: {
                                type: Sequelize.INTEGER
                        },

                        createdAt: {
                                allowNull: false,
                                type: Sequelize.DATE
                        },
                        updatedAt: {
                                allowNull: false,
                                type: Sequelize.DATE
                        }
                });
        },
        down: async (queryInterface, Sequelize) => {
                await queryInterface.dropTable('schedules');
        }
};