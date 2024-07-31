const mongoose = require('mongoose');
const StationList = require('./models/StationList');
const Train = require('./models/Train');

const mongoURI = 'mongodb+srv://MalshiTmel:bruiCE1228@railwayapplication.hb6cxx3.mongodb.net/RailwayDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  seedDatabase();
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

async function seedDatabase() {
  await StationList.deleteMany({});
  await Train.deleteMany({});

  // Add station lists
  const stationLists = [
    {
      line_name: "Main Line",
      stations_list: [
        "Colombo Fort", "Maradana", "Ragama", "Gampaha", "Veyangoda",
        "Polgahawela", "Rambukkana", "Kandy", "Peradeniya", "Gampola",
        "Nawalapitiya", "Hatton", "Talawakele", "Nanu Oya", "Haputale",
        "Bandarawela", "Ella", "Badulla"
      ]
    },
    {
      line_name: "Coastal Line",
      stations_list: [
        "Colombo Fort", "Mount Lavinia", "Kalutara", "Beruwala", "Bentota",
        "Aluthgama", "Ambalangoda", "Hikkaduwa", "Galle", "Matara"
      ]
    },
    {
      line_name: "Upcountry Line",
      stations_list: [
        "Colombo Fort", "Maradana", "Ragama", "Gampaha", "Veyangoda",
        "Polgahawela", "Rambukkana", "Kandy", "Peradeniya", "Gampola",
        "Nawalapitiya", "Hatton", "Talawakele", "Nanu Oya", "Haputale",
        "Bandarawela", "Ella"
      ]
    },
    {
      line_name: "Northern Line",
      stations_list: [
        "Colombo Fort", "Maradana", "Ragama", "Gampaha", "Veyangoda",
        "Polgahawela", "Rambukkana", "Anuradhapura", "Mihintale", "Habarana",
        "Kurunegala", "Puttalam"
      ]
    },
    {
      line_name: "Southern Line",
      stations_list: [
        "Colombo Fort", "Mount Lavinia", "Kalutara", "Beruwala", "Bentota",
        "Aluthgama", "Ambalangoda", "Hikkaduwa", "Galle", "Matara",
        "Beliatta", "Hambantota"
      ]
    },
    {
      line_name: "Colombo Circular Line",
      stations_list: [
        "Colombo Fort", "Colombo Maradana", "Colombo Fort", "Colombo Bambalapitiya",
        "Colombo Mount Lavinia", "Colombo Dehiwala", "Colombo Wellawatte",
        "Colombo Nugegoda", "Colombo Kirulapone"
      ]
    },
    {
      line_name: "Badulla Line",
      stations_list: [
        "Colombo Fort", "Maradana", "Ragama", "Gampaha", "Veyangoda",
        "Polgahawela", "Rambukkana", "Kandy", "Peradeniya", "Gampola",
        "Nawalapitiya", "Hatton", "Talawakele", "Nanu Oya", "Haputale",
        "Bandarawela", "Ella", "Badulla"
      ]
    }
  ];

  // Add trains
  const trains = [
    { train_name: "Denuwara Menike Express", route_name: "Main Line" },
    { train_name: "Udarata Menike Express", route_name: "Main Line" },
    { train_name: "Podi Menike Express", route_name: "Main Line" },
    { train_name: "Kandy Intercity", route_name: "Main Line" },
    { train_name: "Colombo-Kandy Express", route_name: "Main Line" },
    { train_name: "Bade Galle Express", route_name: "Main Line" },
    { train_name: "Ruhunu Kumari Express", route_name: "Coastal Line" },
    { train_name: "Muthu Kumari Express", route_name: "Coastal Line" },
    { train_name: "Galu Kumari Express", route_name: "Coastal Line" },
    { train_name: "Matara-Colombo Express", route_name: "Coastal Line" },
    { train_name: "Hambantota Express", route_name: "Coastal Line" },
    { train_name: "Colombo-Matara Express", route_name: "Coastal Line" },
    { train_name: "Yal Devi Express", route_name: "Northern Line" },
    { train_name: "Uttara Devi Express", route_name: "Northern Line" },
    { train_name: "Rajarata Rajina Express", route_name: "Northern Line" },
    { train_name: "Jaffna Intercity Express", route_name: "Northern Line" },
    { train_name: "Kankesanthurai Express", route_name: "Northern Line" },
    { train_name: "Pulathisi Express", route_name: "Batticaloa Line" },
    { train_name: "Galoya Express", route_name: "Batticaloa Line" },
    { train_name: "Batticaloa-Colombo Express", route_name: "Batticaloa Line" },
    { train_name: "Vavuniya-Batticaloa Express", route_name: "Batticaloa Line" },
    { train_name: "Udaya Devi Express", route_name: "Trincomalee Line" },
    { train_name: "Trincomalee-Colombo Express", route_name: "Trincomalee Line" },
    { train_name: "Ella-Kandy Express", route_name: "Upcountry Line" },
    { train_name: "Badulla-Colombo Express", route_name: "Upcountry Line" },
    { train_name: "Kandy-Badulla Express", route_name: "Upcountry Line" },
    { train_name: "Colombo Circular Train", route_name: "Circular Line" },
    { train_name: "Pettah-Maharagama Line", route_name: "Circular Line" },
    { train_name: "Colombo-Jaffna Local", route_name: "Local and Regional" },
    { train_name: "Colombo-Hatton Local", route_name: "Local and Regional" },
    { train_name: "Colombo-Kalutara Local", route_name: "Local and Regional" },
    { train_name: "Colombo-Kurunegala Local", route_name: "Local and Regional" }
  ];

  try {
    await StationList.insertMany(stationLists);
    await Train.insertMany(trains);
    console.log('Database seeded!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database', err);
    process.exit(1);
  }
}
