const fs = require('fs');
const path = require('path');

// Define placeholders object
const placeholders = {
  API_KEY: process.env.apiKey,
  APP_ID: process.env.appId,
};

// Helper function to replace placeholders with their values
function replacePlaceholders(content, placeholders) {
  let result = content;
  for (const placeholder in placeholders) {
    const regex = new RegExp(`\\${placeholder}`, 'g');
    result = result.replace(regex, placeholders[placeholder]);
  }
  return result;
}

// Read the index.html file from the root directory
const indexHtmlPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace placeholders in the HTML content
const outputHtml = replacePlaceholders(indexHtml, placeholders);

// Create the 'dist' directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Write the modified HTML content to dist/index.html
const outputPath = path.join(distDir, 'index.html');
fs.writeFileSync(outputPath, outputHtml);