const fs = require('fs');
const path = require('path');

// Placeholder content for outputHtml
const outputHtml = '<html><head><title>My Page</title></head><body><h1>Hello, world!</h1></body></html>';

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const outputPath = path.join(distDir, 'index.html');
fs.writeFileSync(outputPath, outputHtml);

// Your fetchData function
const fetchData = async () => {
  try {
    const response = await fetch('/.netlify/functions/getFirebaseData');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
