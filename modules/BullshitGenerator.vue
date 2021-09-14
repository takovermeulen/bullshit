<script>
const matrix = {
  consultant: [
    ['Het proces', 'De factor mens', 'Het management', 'De communicatie', 'De kerncompetentie', 'Human capital', 'De organisatieontwikkeling', 'De missie', 'Kennismanagement', 'De eerste aanzet'],
    ['moet meerwaarde leveren bij', 'stelt eisen aan', 'dient te faciliteren bij', 'is uitgangspunt bij', 'is onlosmakelijk verbonden met', 'schept voorwaarden voor', 'dient te focussen op', 'stuurt', 'hangt nauw samen met', 'moet een opstap bieden voor'],
    ['de implementatie van', 'de terugkoppeling van', 'het aftimmeren van', 'het aansturen van', 'de ontwikkeling van', 'de flexibilisering', 'de integratie van', 'de inventarisatie van', 'de definitie van', 'de insteek van'],
    ['complexe', 'optimale', 'in elkaar grijpende', 'eenduidige', 'onderling afhankelijke', 'van structurele', 'pro-actieve', 'resultaatgerichte', 'efficiënte', 'consistente'],
    ['supply chain processen', 'business architecture', 'mijlpalen', 'targets', 'business units', 'organisatie-onderdelen', 'scenario\'s', 'best practices', 'business models', 'conceptplannen'],
    ['waarbij het belang van', 'waarbij de feedback van', 'waarbij het kader voor', 'waarbij afstemming met', 'waarbij de structuur van', 'waarbij de synergie met', 'waarbij de interface met', 'waarbij input van', 'waarbij commitment van', 'waarbij klankborden met'],
    ['strategisch beleid', 'de taskforce', 'de communicatie', 'de werkgroepen', 'new business development', 'de systeemintegratie', 'de markt', 'de stakeholders', 'het management', 'de projectorganisatie'],
    ['moet uitkristalliseren.', 'voorop staat.', 'wordt aangestuurd.', 'leading is.', 'toegevoegde waarde levert.', 'win-win situaties creëert.', 'moet worden gemanaged.', 'voldoende draagvlak heeft.', 'doorslaggevend is.', 'cruciaal is.']
  ],
  ambtenaar: [
    ['Het proces', 'Het format', 'Het management', 'De communicatie', 'De nieuwe organisatie', 'Het ontwikkelpad', 'De organisatieontwikkeling', 'De missie', 'Kennismanagement', 'De eerste aanzet'],
    ['moet meerwaarde leveren bij', 'stelt eisen aan', 'dient te faciliteren bij', 'is uitgangspunt bij', 'is onlosmakelijk verbonden met', 'schept voorwaarden voor', 'dient te focussen op', 'stuurt', 'hangt nauw samen met', 'moet een opstap bieden voor'],
    ['de implementatie van', 'de terugkoppeling van', 'het aftimmeren van', 'het aansturen van', 'de ontwikkeling van', 'de flexibilisering van', 'de integratie van', 'de inventarisatie van', 'de definitie van', 'de insteek van'],
    ['complexe', 'optimale', 'met elkaar samenhangende', 'eenduidige', 'onderling afhankelijke', 'van structurele', 'probleemoplossende', 'resultaatgerichte', 'efficiënte', 'consistente'],
    ['beslissingen', 'besluitvorming', 'oplossingen', 'belangen', 'teams', 'organisatieonderdelen', 'oplossingsrichtingen', 'uitgangspunten', 'protocollen', 'memo\'s'],
    ['waarbij het belang van', 'waarbij de feedback van', 'waarbij het kader voor', 'waarbij afstemming met', 'waarbij de structuur van', 'waarbij de samenhang met', 'waarbij de uitkomst van', 'waarbij input van', 'waarbij commitment van', 'waarbij klankborden met'],
    ['strategisch beleid', 'de stuurgroep', 'de communicatie', 'de werkgroepen', 'het ministerie', 'de buitenwacht', 'de markt', 'de stakeholders', 'de directie', 'het beleid'],
    ['moet uitkristalliseren.', 'voorop staat.', 'wordt aangestuurd.', 'afgestemd moet worden.', 'toegevoegde waarde levert.', 'oplossingsgericht is.', 'moet worden besloten.', 'voldoende draagvlak heeft.', 'doorslaggevend is.', 'cruciaal is.']
  ]
}

function generateSequence (count = 1) {
  const sequences = []
  for (let m = 0; m < count; m++) {
    const sequence = []
    for (let m = 0; m < 8; m++) {
      // add to array
      sequence.push(Math.floor(Math.random() * 9))
    }
    sequences.push(sequence)
  }
  return sequences
}

function getSequenceFromBase64 (base64sequence) {
  const json = Buffer.from(base64sequence, 'base64').toString()
  return JSON.parse(json)
}

function getBase64FromSequence (sequence) {
  return Buffer.from(JSON.stringify(sequence)).toString('base64')
}

function getMessage (sequences, adviceType) {
  if (sequences == null || sequences.length === 0 || sequences[0].length === 0) {
    return ''
  } else {
    let message = ''
    sequences.forEach(function (sequence) {
      sequence.forEach(function (number, index) {
        const word = matrix[adviceType][index][number]
        message += word + ' '
      })
      // once in a while start a new paragraph
      if (Math.floor(Math.random() * 9) < 3) {
        message += '\n'
      }
    })
    return message
  }
}

export default {
  generateSequence,
  getMessage,
  getSequenceFromBase64,
  getBase64FromSequence,
  matrix

}
</script>
