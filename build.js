const fs = require('fs');
const path = require('path');

const placeholders = {
  API_KEY: process.env.apiKey,
  APP_ID: process.env.appId,
  AUTH_DOMAIN: process.env.authDomain,
  DATABASE_URL: process.env.databaseURL,
  MSG_SENDER_ID: process.env.messagingSenderId,
  EMAIL: process.env.email,
  PASSWORD: process.env.password,
};

function replacePlaceholders(content, placeholders) {
  let result = content;
  for (const placeholder in placeholders) {
    const regex = new RegExp(`\\${placeholder}`, 'g');
    result = result.replace(regex, placeholders[placeholder]);
  }
  return result;
}

const indexHtmlPath = path.join(__dirname, 'index.html');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const outputHtml = replacePlaceholders(indexHtml, placeholders);

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const outputPath = path.join(distDir, 'index.html');
fs.writeFileSync(outputPath, outputHtml);