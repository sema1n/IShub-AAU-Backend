const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Register user
async function registerUser(username, password) {
  // Check if first user
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = new User({ username, password, role });
  await user.save();
  return user;
}

// Authenticate user and generate JWT
async function loginUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid username or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid username or password");

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}

// Promote user to admin (only for admins)
async function promoteUser(userId) {
  return User.findByIdAndUpdate(userId, { role: "admin" }, { new: true });
}

module.exports = { registerUser, loginUser, promoteUser };
