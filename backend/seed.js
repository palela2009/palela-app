const mongoose = require('mongoose');
const Phone = require('./models/Phone');
const Laptop = require('./models/Laptop');
require('dotenv').config();

const phones = [
  {
    title: "iPhone 15 Pro",
    price: 999,
    description: "Latest iPhone with A17 Pro chip and titanium design",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    price: 1199,
    description: "Flagship Android phone with S Pen and amazing camera",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
  },
  {
    title: "Google Pixel 8 Pro",
    price: 899,
    description: "Pure Android experience with incredible AI features",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400"
  },
  {
    title: "OnePlus 12",
    price: 799,
    description: "Flagship killer with super fast charging",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
  },
  {
    title: "Xiaomi 14 Pro",
    price: 699,
    description: "Premium features at competitive price",
    image: "https://images.unsplash.com/photo-1592286927505-67d1b1e2ff6d?w=400"
  },
  {
    title: "Sony Xperia 1 V",
    price: 1099,
    description: "Professional camera phone for creators",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400"
  }
];

const laptops = [
  {
    title: "MacBook Pro 16\"",
    price: 2499,
    description: "Powerful laptop with M3 Pro chip for professionals",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
  },
  {
    title: "Dell XPS 15",
    price: 1799,
    description: "Premium Windows laptop with stunning display",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"
  },
  {
    title: "ThinkPad X1 Carbon",
    price: 1599,
    description: "Business laptop with legendary keyboard",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
  },
  {
    title: "ASUS ROG Zephyrus",
    price: 2199,
    description: "Gaming laptop with RTX 4080 graphics",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"
  },
  {
    title: "HP Spectre x360",
    price: 1399,
    description: "Convertible laptop with touch screen",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400"
  },
  {
    title: "Microsoft Surface Laptop 5",
    price: 1299,
    description: "Elegant design with premium build quality",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    await Phone.deleteMany({});
    await Laptop.deleteMany({});
    console.log('Cleared existing data');

    await Phone.insertMany(phones);
    await Laptop.insertMany(laptops);
    console.log('Database seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
