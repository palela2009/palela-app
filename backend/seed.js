const mongoose = require('mongoose');
const Phone = require('./models/Phone');
const Laptop = require('./models/Laptop');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected to Atlas');

    const phoneCount = await Phone.countDocuments();
    const laptopCount = await Laptop.countDocuments();

    console.log(`\n📊 Database Status:`);
    console.log(`Phones: ${phoneCount}`);
    console.log(`Laptops: ${laptopCount}\n`);

    if (phoneCount === 0 && laptopCount === 0) {
      console.log('⚠️  Database is empty!');
      console.log('💡 You need to insert data manually via MongoDB Compass or Atlas.');
    } else if (phoneCount === 0 || laptopCount === 0) {
      console.log('⚠️  Some collections are empty!');
    } else {
      console.log('✅ Database has data!');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase();
