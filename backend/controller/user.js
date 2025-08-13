import User from "../models/user.js";
exports.getUsers = async (req, res) => {
   try {
    const users = await User.find({}, { wa_id: 1, name: 1, phoneNumber: 1, _id: 0 });
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.getUser=async(req,res)=>{
  try{

    const user = await User.findOne({ wa_id: req.params.wa_id }, { _id: 0, wa_id: 1, name: 1, phoneNumber: 1 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: user });
  }
  catch(error)
  {
    return res.status(500).json({ message: "Failed to fetch user" });
  }
}
