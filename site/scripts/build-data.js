const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(__dirname, '../../exercises');
const distDir = path.join(__dirname, '../../dist');
const outputFile = path.join(distDir, 'exercises.json');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const files = fs.readdirSync(exercisesDir).filter(f => f.endsWith('.json'));

const allExercises = [];

for (const file of files) {
  const filePath = path.join(exercisesDir, file);
  const data = fs.readFileSync(filePath, 'utf8');
  allExercises.push(JSON.parse(data));
}

fs.writeFileSync(outputFile, JSON.stringify(allExercises, null, 2), 'utf8');
console.log(`Successfully combined ${files.length} exercises into ${outputFile}`);
