const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport")
const dotenv = require('dotenv');

const authController = require('./routes/authRoutes')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(passport.initialize())
require('./middleware/passportMiddleware')(passport)

mongoose.connect(process.env.MONGODB_URI)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

app.use(express.json());

app.use('/api/auth', authController)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});