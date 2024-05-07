const Razorpay = require('razorpay');
const Order = require('../models/order')


exports.getTransactionStatus = async (req, res ) => {
    try {
        const isPremiumUser = req.user.ispremiumuser;
        res.status(200).json({ isPremiumUser });
    } catch (err) {
        console.error('Error in getTransactionStatus:', err)                                                                                                         
        res.status(500).json({ errpr: err, message: 'Sometghing went wrong' })
    }
}


exports.purchasepremium = async (req, res) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET 
        });

        const amount = 2500; 
        
        const order = await rzp.orders.create({ amount, currency: "INR" });

        await req.user.createOrder({ orderid: order.id, status: 'PENDING'});
        
        res.status(201).json({ order, key_id : rzp.key_id});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong', err: err });
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
      const { order_id } = req.body;
      const order = await Order.findOne({ where: { orderid: order_id } });
      await order.update({ status: 'FAILED' });
      res.status(200).json({ success: true, message: "Order status updated to FAILED." });
    } catch (err) {
      console.error('Error updating order status:', err);
      res.status(500).json({ error: err, message: 'Failed to update order status.' });
    }
  };
  

exports.updateTransactionStatus = async (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        const order  = await Order.findOne({where : {orderid : order_id}});
        const promise1 = await order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 = await req.user.update({ ispremiumuser: true }) 

        Promise.all([promise1,promise2])
            .then(()=>{
                res.status(202).json({sucess: true, message: "Transaction Successful"});
            })
            .catch((err)=>{
               console.log(err)
            })     
    } catch (err) {
        console.error('Error in updateTransactionStatus:', err)                                                                                                         
        res.status(500).json({ errpr: err, message: 'Sometghing went wrong' })
    }
}