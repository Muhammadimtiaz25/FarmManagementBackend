const mongoose = require("mongoose");
const Rental = require("./models/Rental");

mongoose.connect("mongodb+srv://laibasaeed026:RRnGV9egtj1IIlFQ@cluster0.2hvwvli.mongodb.net/farmDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB connected"))
.catch(err => console.error(err));

const rentals = [
  { duration: "3 months", price: 800, features: ["Compact", "Affordable"] },
  { duration: "6 months", price: 1200, features: ["Furnished", "Near Market"] },
  { duration: "12 months", price: 2000, features: ["GPS Tracking", "Maintenance Included"] }
];

Rental.insertMany(rentals)
  .then(() => {
    console.log("Data inserted!");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
