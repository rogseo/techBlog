const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const seedUser = require('./userData');
const seedPost = require('./postData');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUser, {
    individualHooks: true,
    returning: true,
  });

  for (const post of seedPost) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

