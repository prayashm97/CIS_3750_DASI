/* eslint-disable no-console */

const app = require('./app');

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
