const User = require('../models/user');

exports.getPremium = async (req, res) => {
    try {
      const isPremiumUser = req.user.ispremiumuser;
      if(isPremiumUser){
        const aggExp=await User.findAll({
          attributes:["username","totalExpense"],
          order:[["totalExpense",'DESC']]
        })
        res.status(200).json(aggExp)
      }else{
         res.status(401).json({ success: false, message: "Unauthorized : you are not a premium user" });
      }
    } catch (err) {
        console.error('Error fetching:', err);
        res.status(500).json({ error: 'Failed to fetch' });
    }
};
