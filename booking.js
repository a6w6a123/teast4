document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const clientName = document.getElementById('clientName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const bookingDate = document.getElementById('bookingDate').value;
    
    const bookingData = [clientName, phoneNumber, bookingDate];
    
    // إرسال البيانات إلى الخادم ليتم تحديث Google Sheets
    fetch('/sendBookingData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData }),
    })
    .then(response => response.json())
    .then(data => {
        alert('تم إرسال الحجز بنجاح');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
