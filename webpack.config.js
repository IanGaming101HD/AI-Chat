const path = require('path');

module.exports = {
  entry: './src/public/main/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};