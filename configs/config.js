require('dotenv').config();

const config = {
  options: {
    token: process.env.TOKEN || 'default-token-here',
    owner: [],
    pluginsDir: "commands"
  },
};

module.exports = config; 