const Sib=require('sib-api-v3-sdk');
const client=Sib.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.API_KEY;
const tranEmailApi=new Sib.TransactionalEmailsApi()

exports.forgot= async (req, res) => {
    const { email } = req.body;
    try {       
        const sender={email:'dummy@gmail.com'};
        const receivers=[{email:email}];
        const response = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'how are you',
            textContent: 'hope you are fine'
        });
        console.log(response);
        res.status(200).json({ message: 'Reset email sent successfully' });
    } catch (error) {
        console.error('Failed to send reset email:', error);
        res.status(500).json({ error: 'Failed to send reset email' });
    }
};