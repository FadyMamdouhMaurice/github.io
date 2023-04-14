/*// Get a reference to the "submit" button element
const submitButton = document.querySelector('#submit');

// Add a click event listener to the "submit" button
submitButton.addEventListener('click', () => {

  // Navigate to the welcome page
  window.location.href = 'welcome.html';
});
*/
/*
// Load the Service Account key
var key = require('sb-training-software-ef47713af26e.json');

// Set up the Google API client library
var {google} = require('googleapis');
var sheets = google.sheets('v4');

// Authenticate your requests
var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  // Make API requests using the Google API client library
  sheets.spreadsheets.get({
    auth: jwtClient,
    spreadsheetId: '1hAPDte1UbSfyXh9vVJpvG6lCh80Hr3x2WzMUCS6YplE',
    range: 'Sheet1'
  }, function(err, response) {
    if (err) {
      console.log(err);
      alert(err);

      return;
    }

    console.log(response.data);
    alert(response.data);
  });
});

*/
// Load the Google API client library
document.addEventListener('DOMContentLoaded', function() {
  gapi.load('client', initClient);
});

// Function to initialize the Google Sheets API client
function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyCENIO16UoNC3fcllPbAp-lnz0AFrOkTYU',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    clientId: '1096778665619-6hc6k2ork2l76bjkn4q5ao5n0q63v9ul.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    plugin_name: 'streamy',
    cookiepolicy: 'none' // add this line
  }).then(function () {
    alert('b');
    // Add event listener to submit button
    var submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', addData);
  });
}

// Function to add user data to the Google Sheets spreadsheet
function addData(event) {
  alert('c');
  event.preventDefault();

  // Get form data
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    alert('Password and Confirm Password do not match!');
    return;
  }

  // Get the Google Sheets spreadsheet ID
  var spreadsheetId = '1hAPDte1UbSfyXh9vVJpvG6lCh80Hr3x2WzMUCS6YplE';

  // Get the active sheet
  var sheet = gapi.client.sheets.spreadsheets.get({
    spreadsheetId: spreadsheetId,
    range: 'Sheet1'
  }).then(function(response) {
    var sheetName = response.result.sheets[0].properties.title;
    var sheetId = response.result.sheets[0].properties.sheetId;
    var lastRow = response.result.sheets[0].properties.gridProperties.rowCount;
    var lastColumn = response.result.sheets[0].properties.gridProperties.columnCount;

    // Define the range to write to
    var range = sheetName + '!A' + (lastRow + 1) + ':D' + (lastColumn);

  // Do something with the range, such as getting values or setting values


  // Define the values to write
  var values = [[username, email, password, confirmPassword]];

  // Call the Google Sheets API to append the values to the spreadsheet
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: values,
    },
  }).then(function(response) {
    console.log(response.result);
    alert('Signup Successful!');
    // Clear form data
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
    alert('Signup Failed!');
  });
  });
}
