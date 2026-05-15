require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const jobs = await JobRequest.find({ location: { $regex: 'Jersey city', $options: 'i' } });
  console.log('Filtered location matches:', jobs.length);
  mongoose.connection.close();
});
