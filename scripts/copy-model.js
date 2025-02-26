const fs = require('fs-extra');
const path = require('path');

async function copyModelToPublic() {
  const sourceModelDir = path.join(__dirname, '..', 'models', 'virality-predictor-model');
  const sourceStatsFile = path.join(__dirname, '..', 'models', 'feature_stats.json');
  const targetModelDir = path.join(__dirname, '..', 'public', 'models', 'virality-predictor-model');
  const targetStatsFile = path.join(__dirname, '..', 'public', 'models', 'feature_stats.json');

  try {
    // Ensure target directories exist
    await fs.ensureDir(path.join(__dirname, '..', 'public', 'models'));
    await fs.ensureDir(targetModelDir);

    // Copy model files
    await fs.copy(sourceModelDir, targetModelDir);
    console.log('✓ Model files copied successfully');

    // Copy feature statistics
    await fs.copy(sourceStatsFile, targetStatsFile);
    console.log('✓ Feature statistics copied successfully');

    console.log('Model and statistics are ready for production!');
  } catch (error) {
    console.error('Error copying model files:', error);
    process.exit(1);
  }
}

copyModelToPublic(); 