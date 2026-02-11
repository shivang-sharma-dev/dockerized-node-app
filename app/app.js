const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.appendFileSync('visits.txt', 'New visit\n');
  res.end("Visit recorded 🚀");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
