require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ""))); // Serve static files like HTML, CSS, JS

// MongoDB Connection
;
const MONGO_URI = "mongodb+srv://test:ishwar@cluster0.grenw.mongodb.net/your-database?retryWrites=true&w=majority";


// Connect to MongoDB using the URI from the environment variables or the hardcoded one

const connectDB = async () => {
    console.log("Called the function")
    try{
    await mongoose.connect(MONGO_URI)
    console.log("DB is connected")
    }catch(e)
    {
        console.log("Error in connecting the db", e)
    }
}

connectDB()
   

// Define Schema & Model
const UserSchema = new mongoose.Schema({
    email: String,
    phone: String
});

const User = mongoose.model("User", UserSchema);



const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model("contacts", contactSchema);
// Handle Contact Form Submission
 app.post("/submit", async (req, res) => {
    try {
        const { name, email, message } = req.body;
         const newContact = new Contact({ name, email, message });
         await newContact.save();
        res.status(201).json({ message: "✅ Message received and saved successfully!" });
} catch (error) {

     console.log(error)
        res.status(500).json({ message: "❌ Error saving contact message", error });
    }
});



app.post("/submit-contact", async (req, res) => {
    try {
       const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
       res.send("Message received successfully!");
    } catch (error) {
       console.error(error);
        res.status(500).send("Server Error");
    }
 });


// Routes

// 🏠 Index Route (Home Page)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "", "index.html"));
});

// ℹ️ About Page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "", "about.html"));
});

// 💼 Services Page
app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "", "services.html"));
});

// 🛠️ Skills Page
app.get("/skills", (req, res) => {
    res.sendFile(path.join(__dirname, "", "skills.html"));
});

// 📞 Contact Page
app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "", "contact.html"));
});

// 📩 Handle Form Submission
// app.post("/submit", async (req, res) => {
//     try {
//         const { email, phone } = req.body;
//         const newUser = new User({ email, phone });
//         await newUser.save();
//         res.status(201).json({ message: "✅ User saved successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "❌ Error saving user", error });
//     }
// });

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
