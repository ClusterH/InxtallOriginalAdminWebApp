importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': 'BCYqjb1g5LSZGPaJiKqFDLXhl5R0T8iyPVhknFNO1wtp6_cWg3PAv66rinzqyMjgScLhRFnyAyKfuS-Te_SlDbA'
});

const messaging = firebase.messaging();
