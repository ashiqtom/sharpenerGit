const User = require('../models/user');
const Expense = require('../models/expense');

exports.getPremium = async (req, res) => {
    try {
      const isPremiumUser = req.user.ispremiumuser;
      console.log(isPremiumUser)
      if(isPremiumUser){
        
      const user=await User.findAll()
      const expenses = await Expense.findAll();
      const userAgggateExpense={}
      expenses.forEach(expense => {
        if(userAgggateExpense[expense.UserId]){
          userAgggateExpense[expense.UserId] += expense.amount
        }else{
          userAgggateExpense[expense.UserId]=expense.amount
        }
        
      });
      const userLeaderBoardDetails = [];
      user.forEach(user => {
          const userId = user.id;
          const totalCost = userAgggateExpense[userId] || 0;

            if (user.username) {
              userLeaderBoardDetails.push({
                  name: user.username,
                  totalCost: totalCost
              });
          }
      });
      userLeaderBoardDetails.sort((a,b)=>{a.totalCost-b.totalCost})
      res.status(200).json({ userLeaderBoardDetails });
      }//else{
      //   return res.status(404).json({ success: false, message: "You are not prime user" });
      // }
    } catch (err) {
        console.error('Error fetching:', err);
        res.status(500).json({ error: 'Failed to fetch' });
    }
};
