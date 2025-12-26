const mongoose = require('mongoose');
const Phone = require('./models/Phone');
const Laptop = require('./models/Laptop');
require('dotenv').config();

const phones = [
  {
    title: 'iPhone 15 Pro Max',
    price: 4299,
    description: 'A17 Pro ჩიპი, 256GB, ტიტანიუმის კორპუსი, ProMotion დისპლეი',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'
  },
  {
    title: 'Samsung Galaxy S24 Ultra',
    price: 3899,
    description: 'Snapdragon 8 Gen 3, 12GB RAM, 256GB, S Pen, 200MP კამერა',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'
  },
  {
    title: 'Google Pixel 8 Pro',
    price: 3499,
    description: 'Google Tensor G3, 12GB RAM, 256GB, Magic Eraser, Night Sight',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'
  },
  {
    title: 'Xiaomi 14 Pro',
    price: 2799,
    description: 'Snapdragon 8 Gen 3, Leica კამერა, 120W სწრაფი დამუხტვა',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
  },
  {
    title: 'OnePlus 12',
    price: 2599,
    description: 'Snapdragon 8 Gen 3, 16GB RAM, Hasselblad კამერა',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400'
  }
];

const laptops = [
  {
    title: 'MacBook Pro 16" M3 Max',
    price: 8999,
    description: 'M3 Max ჩიპი, 36GB RAM, 1TB SSD, Liquid Retina XDR დისპლეი',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
  },
  {
    title: 'Dell XPS 15',
    price: 4599,
    description: 'Intel Core i9-13900H, RTX 4070, 32GB RAM, 1TB SSD, 4K OLED',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'
  },
  {
    title: 'HP Spectre x360',
    price: 3999,
    description: 'Intel Core i7-1355U, 16GB RAM, 1TB SSD, 2-in-1 დიზაინი',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
  },
  {
    title: 'Lenovo ThinkPad X1 Carbon',
    price: 4299,
    description: 'Intel Core i7-1365U, 32GB RAM, 1TB SSD, 14" 2.8K დისპლეი',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'
  },
  {
    title: 'ASUS ROG Zephyrus G14',
    price: 5499,
    description: 'AMD Ryzen 9 7940HS, RTX 4090, 32GB RAM, 2TB SSD, 240Hz',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Phone.deleteMany({});
    await Laptop.deleteMany({});
    console.log('Old data cleared');

    await Phone.insertMany(phones);
    await Laptop.insertMany(laptops);

    console.log('✅ Database seeded successfully!');
    console.log(`Phones: ${phones.length}`);
    console.log(`Laptops: ${laptops.length}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
