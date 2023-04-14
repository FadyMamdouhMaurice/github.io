// Get a reference to the "signup" button element
const signupButton = document.querySelector('#signup');

// Add a click event listener to the "signup" button
signupButton.addEventListener('click', () => {

  gapi.client.sheets.spreadsheets.values.append({
  spreadsheetId: '1hAPDte1UbSfyXh9vVJpvG6lCh80Hr3x2WzMUCS6YplE',
  range: 'Sheet1!A1:B2',
  valueInputOption: 'USER_ENTERED',
  insertDataOption: 'OVERWRITE',
  responseDateTimeRenderOption: 'SERIAL_NUMBER',
  responseValueRenderOption: 'FORMATTED_VALUE',
  resource: {
    values: [
      ['John', 25],
      ['Jane', 30]
    ]
  }
}).then(function(response) {
  console.log(response);
}, function(reason) {
  console.error('Error: ' + reason.result.error.message);
});

  
  // Navigate to the signup page
//  window.location.href = 'signup.html';
});

