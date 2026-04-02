require("dotenv").config();
const mongoose = require("mongoose");

// Import models
const Park = require("./models/Park");
const Adventure = require("./models/Adventure");
const Alert = require("./models/Alert");
const Campground = require("./models/Campground");
const Review = require("./models/Review");
const Trail = require("./models/Trail");
const User = require("./models/User");
const Wildlife = require("./models/Wildlife");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      Park.deleteMany({}),
      Adventure.deleteMany({}),
      Alert.deleteMany({}),
      Campground.deleteMany({}),
      Review.deleteMany({}),
      Trail.deleteMany({}),
      User.deleteMany({}),
      Wildlife.deleteMany({})
    ]);

    // Parks
    const parks = await Park.insertMany([
      {
        fullName: "Crater Lake National Park",
        parkCode: "crla",
        description: "Crater Lake inspires awe.",
        state: "Oregon",
        region: "Pacific West",
        latitude: "42.94065854",
        longitude: "-122.1338414",
        url: "https://www.nps.gov/crla/index.htm",
        imageUrl: "https://example.com/crater.jpg",
        established: "1902-05-22",
        area: "183224 acres"
      },
      {
        fullName: "Yellowstone National Park",
        parkCode: "yell",
        description: "First national park in the world.",
        state: "Wyoming",
        region: "Rocky Mountain",
        latitude: "44.6",
        longitude: "-110.5",
        url: "https://www.nps.gov/yell/index.htm",
        imageUrl: "https://example.com/yellowstone.jpg",
        established: "1872-03-01",
        area: "2219791 acres"
      },
      {
        fullName: "Yosemite National Park",
        parkCode: "yose",
        description: "Known for granite cliffs and waterfalls.",
        state: "California",
        region: "Pacific West",
        latitude: "37.8651",
        longitude: "-119.5383",
        url: "https://www.nps.gov/yose/index.htm",
        imageUrl: "https://example.com/yosemite.jpg",
        established: "1890-10-01",
        area: "761747 acres"
      }
    ]);

    // Users
    const users = await User.insertMany([
      { githubId: "111", username: "alice", displayName: "Alice Smith", email: "alice@example.com" },
      { githubId: "222", username: "bob", displayName: "Bob Johnson", email: "bob@example.com" },
      { githubId: "333", username: "carol", displayName: "Carol Davis", email: "carol@example.com" }
    ]);

    // Adventures
    await Adventure.insertMany([
      {
        parkId: parks[0]._id,
        userId: users[0].githubId,
        title: "Sunrise Hike",
        description: "Watched the sunrise over the rim.",
        date: "2024-06-10",
        type: "hike",
        duration: "2 hours",
        difficulty: "Easy",
        rating: 4
      },
      {
        parkId: parks[1]._id,
        userId: users[1].githubId,
        title: "Camping Weekend",
        description: "Stayed at Madison Campground.",
        date: "2024-07-15",
        type: "camp",
        duration: "2 days",
        difficulty: "Moderate",
        rating: 5
      },
      {
        parkId: parks[2]._id,
        userId: users[2].githubId,
        title: "Wildlife Spotting",
        description: "Saw deer and black bears.",
        date: "2024-08-20",
        type: "wildlife viewing",
        duration: "4 hours",
        difficulty: "Easy",
        rating: 5
      }
    ]);

    // Alerts
    await Alert.insertMany([
      { parkId: parks[0]._id, title: "Trail Closed", description: "Due to rockfall.", category: "closure", startDate: "2024-05-01", endDate: "2024-06-01", isActive: true },
      { parkId: parks[1]._id, title: "Bear Warning", description: "High bear activity.", category: "warning", startDate: "2024-07-01", endDate: "2024-07-31", isActive: true },
      { parkId: parks[2]._id, title: "Information", description: "Visitor center hours updated.", category: "info", startDate: "2024-08-01", endDate: "2024-12-31", isActive: true }
    ]);

    // Campgrounds
    await Campground.insertMany([
      { parkId: parks[0]._id, name: "Mazama Campground", description: "Nestled in forest.", numSites: 214, cost: "$21-$42", season: "Summer", latitude: "42.868", longitude: "-122.167" },
      { parkId: parks[1]._id, name: "Madison Campground", description: "Near Madison River.", numSites: 270, cost: "$25", season: "Summer", latitude: "44.645", longitude: "-110.861" },
      { parkId: parks[2]._id, name: "Upper Pines Campground", description: "Located in Yosemite Valley.", numSites: 238, cost: "$26", season: "Spring-Fall", latitude: "37.737", longitude: "-119.565" }
    ]);

    // Reviews
    await Review.insertMany([
      { parkId: parks[0]._id, userId: users[0].githubId, rating: 5, title: "Amazing Views", comment: "Unforgettable experience.", visitDate: "2024-06-10" },
      { parkId: parks[1]._id, userId: users[1].githubId, rating: 4, title: "Great Wildlife", comment: "Saw bison and elk.", visitDate: "2024-07-15" },
      { parkId: parks[2]._id, userId: users[2].githubId, rating: 5, title: "Iconic Scenery", comment: "Half Dome is breathtaking.", visitDate: "2024-08-20" }
    ]);

    // Trails
    await Trail.insertMany([
      { parkId: parks[0]._id, name: "Cleetwood Cove Trail", description: "Access to Crater Lake shore.", distance: "2.2 miles", elevationGain: "700 ft", difficulty: "Strenuous", trailType: "out-and-back", dogFriendly: false, season: "Summer" },
      { parkId: parks[1]._id, name: "Fairy Falls Trail", description: "Scenic waterfall hike.", distance: "5 miles", elevationGain: "200 ft", difficulty: "Moderate", trailType: "loop", dogFriendly: true, season: "Summer" },
      { parkId: parks[2]._id, name: "Mist Trail", description: "Leads to Vernal and Nevada Falls.", distance: "7 miles", elevationGain: "2000 ft", difficulty: "Strenuous", trailType: "out-and-back", dogFriendly: false, season: "Spring-Fall" }
    ]);

    // Wildlife
    await Wildlife.insertMany([
      { parkId: parks[0]._id, commonName: "Clark's Nutcracker", scientificName: "Nucifraga columbiana", category: "bird", description: "Known for hoarding pine seeds.", habitat: "High elevation pine forests", conservationStatus: "Least Concern" },
      { parkId: parks[1]._id, commonName: "Grizzly Bear", scientificName: "Ursus arctos horribilis", category: "mammal", description: "Large omnivorous bear.", habitat: "Forests and meadows", conservationStatus: "Threatened" },
      { parkId: parks[2]._id, commonName: "Rainbow Trout", scientificName: "Oncorhynchus mykiss", category: "fish", description: "Popular freshwater fish.", habitat: "Rivers and lakes", conservationStatus: "Least Concern" }
    ]);

    console.log("Database seeded with multiple records!");
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
