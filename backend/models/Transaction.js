const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./User');
const Book = require('./Book');

const Transaction = sequelize.define('Transaction', {
  issueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('issued', 'returned'),
    defaultValue: 'issued'
  },
  fine: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Transaction, { foreignKey: 'bookId' });
Transaction.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Transaction;
