import { TrainingDataGenerator } from '../services/TrainingDataGenerator';

const NICHES = [
  'Бизнес и Финансы',
  'Технологии',
  'Образование',
  'Развлечения',
  'Спорт',
  'Путешествия',
  'Мода и Красота',
  'Еда и Кулинария',
  'Здоровье и Фитнес',
  'Музыка'
];

async function collectData() {
  console.log('Starting training data collection...');
  
  const generator = new TrainingDataGenerator();
  
  // Clear old training data (older than 30 days)
  await generator.clearOldTrainingData(30);
  console.log('Cleared old training data');
  
  // Collect new training data
  await generator.collectTrainingData(NICHES);
  console.log('Training data collection completed');
  
  // Get statistics about collected data
  const data = await generator.getStoredTrainingData();
  const viralCount = data.filter(d => d.isViral).length;
  
  console.log(`
Collection Statistics:
- Total samples: ${data.length}
- Viral samples: ${viralCount}
- Non-viral samples: ${data.length - viralCount}
- Viral ratio: ${(viralCount / data.length * 100).toFixed(2)}%
`);
}

// Execute collection
collectData().catch(console.error); 