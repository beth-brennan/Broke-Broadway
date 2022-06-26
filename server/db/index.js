//this is the access point for all things database related!

const db = require('./db')
const Show = require('./models/Show');
const TicketOption = require('./models/TicketOption');

const User = require('./models/User')

//associations could go here!

User.belongsToMany(Show, { through: 'favorite' });
Show.belongsToMany(User, { through: 'favorite' });

TicketOption.belongsTo(Show);
Show.hasMany(TicketOption);

module.exports = {
  db,
  models: {
    User,
  },
}
