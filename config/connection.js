const Sequelize = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost', 
  dialect: 'mysql', 
  port: 3306, 
  define: {
    timestamps: true, 
  },
});

module.exports = sequelize;