// const User = require('../models/User');
// const authenticateUser = require('../middlewares/authenticateUser');

// // Search for friends
// const searchFriends = async (req, res) => {
//   try {
//     const friends = await User.find({
//       $or: [
//         { firstname: new RegExp(req.query.firstname, 'i') },
//         { lastname: new RegExp(req.query.lastname, 'i') },
//       ],
//     });

//     res.status(200).json(friends);
//   } catch (error) {
//     res.status(404).json({ error: 'Friends not found' });
//   }
// };

// module.exports = {
//   searchFriends,
// };