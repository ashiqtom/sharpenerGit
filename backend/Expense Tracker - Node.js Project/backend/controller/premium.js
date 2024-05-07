const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getPremium = async (req, res) => {
    try {
      const isPremiumUser = req.user.ispremiumuser;
      if(isPremiumUser){
        const aggExp=await User.findAll({attributes:["username","totalExpense"]})
        console.log(aggExp,'<<<<<<<<<<')

        // const leaderboardofusers = await User.findAll({
        //     attributes: ['id', 'username',[sequelize.fn('COALESCE', sequelize.fn('sum', sequelize.col('expenses.amount')), 0), 'totalCost'] ],
        //     include: [{model: Expense, attributes: []}],
        //     group:['user.id'],
        //     order:[['totalCost', 'DESC']]
        // })
        res.status(200).json(aggExp)
      }// else{
      //   return res.status(404).json({ success: false, message: "You are not prime user" });
      // }
    } catch (err) {
        console.error('Error fetching:', err);
        res.status(500).json({ error: 'Failed to fetch' });
    }
};
