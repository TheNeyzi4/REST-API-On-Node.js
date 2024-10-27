const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const dotenv = require('dotenv');

dotenv.config()
const mongoose = require("mongoose")
const User = mongoose.model('User')

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
}

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				const user = await (await User.findById(payload.userId)).isSelected('username id')
				if (user) {
					done(null, user)
				} else {
					done(null, false)
				}
			} catch (e) {
				console.log(e)
				done('error', false)
			}
		})
	)
}