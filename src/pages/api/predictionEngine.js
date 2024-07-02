// pages/api/predictions.js

import nodemailer from 'nodemailer';
import schedule from 'node-schedule';

const receivers = {
    firstReceiver: "bellokingdavidibukun03@gmail.com",
    secondReceiver: "nomira31@gmail.com",
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bellokingdavidibukun03@gmail.com',
        pass: 'agff dlzw bkam uleq', // Use environment variables to store sensitive data
    },
});

// Function to send email
async function sendEmail(predictions) {
    try {
        const mailOptions = {
            from: 'FootBall Tip <bellokingdavidibukun03@gmail.com>',
            to: `${receivers.firstReceiver}, ${receivers.secondReceiver}`,
            subject: 'Sports Predictions Update',
            text: 'Here is your daily sports predictions update.',
            html: `<h1>Sports Predictions</h1><pre>${JSON.stringify(predictions, null, 2)}</pre>`, // You can format the predictions as HTML
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Schedule email to be sent at 12 AM daily
schedule.scheduleJob('0 0 * * *', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/predictionEngine');
        const data = await response.json();
        await sendEmail(data.data);
    } catch (error) {
        console.error('Error fetching predictions for email:', error);
    }
});

export default async function handler(req, res) {
    try {
        const url = 'https://football-prediction-api.p.rapidapi.com/api/v2/predictions';
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const market = 'classic';
        const federation = 'UEFA';
 console.log("Todays Date",today);
        const headers = {
            'x-rapidapi-host': 'football-prediction-api.p.rapidapi.com',
            'x-rapidapi-key': '31d0de31c9msheaa7eb6ded1c63ap185e5fjsned1e4f17678c',
        };

        const response = await fetch(`${url}?market=${market}&iso_date=${today}&federation=${federation}`, {
            headers,
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch predictions');
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching predictions:', error);
        res.status(500).json({ message: 'Error fetching predictions' });
    }
}
