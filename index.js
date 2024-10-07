const { google } = require('googleapis');
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your/json/credentials.json', // مسار ملف JSON
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

async function appendData() {
    const client = await auth.getClient();
    const spreadsheetId = '13n3KtrXXr8XUjAZAd3IgPbZ2xBjumtuE5F7OBHn_e5Y';
    const range = 'Sheet1!A1:C1'; // استبدل بـ A1:C1 ليشمل البيانات المطلوبة حسب التصميم
    const values = [
        ['اسم العميل', 'رقم الهاتف', 'كود الحجز'] // استبدل القيم هنا حسب المدخلات
    ];

    const resource = { values };

    try {
        await sheets.spreadsheets.values.append({
            auth: client,
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });
        console.log('تم إرسال البيانات بنجاح!');
    } catch (err) {
        console.error('خطأ في إرسال البيانات:', err);
    }
}

appendData();
