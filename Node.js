const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your-service-account-file.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const app = express();
app.use(bodyParser.json());

app.post('/sendBookingData', async (req, res) => {
    const { bookingData } = req.body;
    try {
        const authClient = await auth.getClient();
        const spreadsheetId = '13n3KtrXXr8XUjAZAd3IgPbZ2xBjumtuE5F7OBHn_e5Y';
        const range = 'Sheet1!A1:C1'; // عدّل النطاق حسب الملف
        
        const resource = {
            values: [bookingData],
        };
        
        await sheets.spreadsheets.values.append({
            auth: authClient,
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });
        
        res.json({ message: 'Booking data sent successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send booking data.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
