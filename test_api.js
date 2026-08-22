import http from 'http';

const data = JSON.stringify({
  videos: [
    { title: "Test", url: "https://www.youtube.com/watch?v=abcdefghijk" }
  ]
});

const req = http.request({
  hostname: 'localhost',
  port: 5100,
  path: '/api/cms/doctors/6682b137d7a5b3a82a0b2326', // An arbitrary ID, might return 404, but that's fine to see what fails
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
