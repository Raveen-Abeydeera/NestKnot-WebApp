require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

const seedJobs = [
  {
    title: 'Leaky Faucet in Kitchen',
    description: 'The kitchen sink faucet has been dripping consistently for the past few days. Needs a quick fix or replacement.',
    category: 'Plumbing',
    location: 'Downtown, NY',
    contactName: 'Alice Smith',
    contactEmail: 'alice@example.com',
    status: 'Open',
  },
  {
    title: 'Install New Ceiling Fan',
    description: 'Looking for a licensed electrician to install a new ceiling fan in the master bedroom. The wiring is already in place from an old light fixture.',
    category: 'Electrical',
    location: 'Brooklyn, NY',
    contactName: 'Bob Johnson',
    contactEmail: 'bob.j@example.com',
    status: 'Open',
  },
  {
    title: 'Custom Bookshelves',
    description: 'Need a carpenter to build and install custom wooden bookshelves in my home office. Dimensions and wood preferences will be provided.',
    category: 'Carpentry',
    location: 'Queens, NY',
    contactName: 'Charlie Brown',
    contactEmail: 'charlie@example.com',
    status: 'In Progress',
  },
  {
    title: 'Exterior House Painting',
    description: 'Looking to get the front exterior of my 2-story house painted. Paint will be supplied, just need the labor and equipment.',
    category: 'Painting',
    location: 'Staten Island, NY',
    contactName: 'Diana Prince',
    contactEmail: 'diana@example.com',
    status: 'Open',
  },
  {
    title: 'Assemble IKEA Furniture',
    description: 'Need someone to assemble a large IKEA wardrobe (PAX system) and a bed frame. Instructions and all parts are in the boxes.',
    category: 'General Handyman',
    location: 'Manhattan, NY',
    contactName: 'Evan Wright',
    contactEmail: 'evan@example.com',
    status: 'Closed',
  },
  {
    title: 'Replace Circuit Breaker',
    description: 'One of the circuit breakers in the main panel keeps tripping. Need a professional to diagnose and replace it if necessary.',
    category: 'Electrical',
    location: 'Hoboken, NJ',
    contactName: 'Fiona Gallagher',
    contactEmail: 'fiona@example.com',
    status: 'Open',
  },
  {
    title: 'Fix Running Toilet',
    description: 'Guest bathroom toilet keeps running after flushing. Probably needs a new flapper or valve.',
    category: 'Plumbing',
    location: 'Jersey City, NJ',
    contactName: 'George Costanza',
    contactEmail: 'george@example.com',
    status: 'Open',
  },
  {
    title: 'Patch Drywall Hole',
    description: 'There is a small hole (about 6 inches) in the living room drywall that needs to be patched, sanded, and painted over.',
    category: 'General Handyman',
    location: 'Brooklyn, NY',
    contactName: 'Hannah Abbott',
    contactEmail: 'hannah@example.com',
    status: 'In Progress',
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Optional: Clear existing jobs before seeding
    // console.log('Clearing existing jobs...');
    // await JobRequest.deleteMany({});
    
    console.log('Inserting seed data...');
    await JobRequest.insertMany(seedJobs);
    console.log(`Successfully inserted ${seedJobs.length} jobs!`);

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    console.log('Closing database connection...');
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDB();
