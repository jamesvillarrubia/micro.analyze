var TS = require('text-statistics');
var ts = TS()
var n = require('natural')
var micro = require('micro')
const dotenv = require('dotenv')

function service(text = '', context = '') {
  //Call service on object
  // console.log('TEXT: ' + text)
  // console.log('CONTEXT' + context)
  if (typeof text === 'object') {
    let data = parse(text)
    text = data.text
    context = data.context
  }
  //shortcut response
  if (text === '') {
    return Promise.resolve(analysis)
  }
  let analysis = {
    textLength: ts.textLength(text) - 1,
    letterCount: ts.letterCount(text),
    wordCount: ts.wordCount(text),
    sentenceCount: ts.sentenceCount(text),
    syllableCount: ts.syllableCount(text),
    averageSyllablesPerWord: ts.averageSyllablesPerWord(text),
    percentageWordsWithThreeSyllables: ts.percentageWordsWithThreeSyllables(text),
    averageWordsPerSentence: ts.averageWordsPerSentence(text),
    fleschKincaidReadingEase: ts.fleschKincaidReadingEase(text),
    fleschKincaidGradeLevel: ts.fleschKincaidGradeLevel(text),
    gunningFogScore: ts.gunningFogScore(text),
    colemanLiauIndex: ts.colemanLiauIndex(text),
    smogIndex: ts.smogIndex(text),
    automatedReadabilityIndex: ts.automatedReadabilityIndex(text)
  }

  //console.log(context)
  if (context !== '') {

    analysis.jaroWinkler = n.JaroWinklerDistance(text, context)
    analysis.levenshteinDistance = n.LevenshteinDistance(text, context)
    analysis.diceCoefficient = n.DiceCoefficient(text, context)
    analysis.indexStart = context.toLowerCase().indexOf(text.toLowerCase())
  }
  return Promise.resolve(analysis)
}


function parse(data) {
  const text = data.text || ''
  const context = data.context || ''
  return {text, context}
}


function handler(event, context, callback) {
  try {
    let data = parse(event)
    let analysis = service(data)
    callback(null, {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: analysis
    });
  } catch (err) {
    callback(err)
  }
}


module.exports = {service, handler, parse}




