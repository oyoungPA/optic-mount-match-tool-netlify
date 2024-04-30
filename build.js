const fetchData = async () => {
  try {
    const response = await fetch('/.netlify/functions/getFirebaseData');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const outputPath = path.join(distDir, 'index.html');
fs.writeFileSync(outputPath, outputHtml);

fetchData();
