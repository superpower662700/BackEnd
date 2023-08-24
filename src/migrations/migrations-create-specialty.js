
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => { // up nên không thể cập nhật phải xóa bảng r chạy lại 
        await queryInterface.createTable('specialties', {

            // address: DataTypes.STRING,
            // description: DataTypes.STRING,
            // image: DataTypes.STRING
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('specialties');
    }
};