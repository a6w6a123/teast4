// server.js
const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const filePath = './شاليه.xlsx';

// قراءة البيانات من ملف Excel
const readData = () => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
};

// كتابة البيانات إلى ملف Excel
const writeData = (data) => {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'ورقة1');
  xlsx.writeFile(workbook, filePath);
};

// عرض الشاليهات المتاحة
app.get('/chalets', (req, res) => {
  const data = readData();
  res.json(data);
});

// حجز شاليه
app.post('/book', (req, res) => {
  const { name, phone, chaletName, date } = req.body;
  const data = readData();

  // التحقق من توفر الشاليه في التاريخ المطلوب
  const isAvailable = !data.find(chalet => chalet['اسم الشالية'] === chaletName && chalet['التاريخ'] === date);

  if (isAvailable) {
    data.push({ 'اسم الشالية': chaletName, 'السعر': '---', 'التاريخ': date, 'الاسم': name, 'الهاتف': phone });
    writeData(data);
    res.json({ message: 'تم الحجز بنجاح!' });
  } else {
    res.status(400).json({ message: 'الشاليه غير متاح في هذا التاريخ.' });
  }
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
