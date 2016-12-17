var parse = require('csv-parse');

var heroImprovementCSV = require('../data/HelperImprovementsInfo.csv');

const HeroImprovementsInfo = {}
const HeroImprovementsTotals = {};

var MIN_LEVEL = 0;
var MAX_LEVEL = 10000;

var multiplier = 1.0;

parse(heroImprovementCSV, {delimiter: ',', columns: true}, function(err, data) {
  for (var row of data) {
    HeroImprovementsInfo[row.Level] = row.Amount;
  }
  console.log("Done loading HelperImprovementsInfo");
  MIN_LEVEL = Math.min.apply(null, Object.keys(HeroImprovementsInfo));
  MAX_LEVEL = Math.max.apply(null, Object.keys(HeroImprovementsInfo));

  var multiplier = 1.0;
  for (var level = 0; level <= MAX_LEVEL; level += 10) {
    if (level in HeroImprovementsInfo) {
      multiplier *= HeroImprovementsInfo[level];
      HeroImprovementsTotals[level] = multiplier;
    }
  }
  console.log("Done loading HeroImprovementsTotals");
});

export function getHeroImprovementBonus(cLevel) {
  if (cLevel < MIN_LEVEL) {
    return 1.0;
  } else if (cLevel > MAX_LEVEL) {
    return getImprovementBonus(MAX_LEVEL);
  } else {
    cLevel = Math.floor(cLevel / 10) * 10;
    while (!(cLevel in HeroImprovementsTotals)) {
      cLevel -= 10;
    }
    return HeroImprovementsTotals[cLevel];
  }
}