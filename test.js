const selector = require('./index');
var fs = require('fs');
const jsdom = require("jsdom");

test('adds 1 + 2 to equal 3', () => {
  expected_data = { name: 'Bulbasaur',
      price: '£63.00',
      stock: '45 in stock',
      tags: 'bulbasaur',
      short_description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.',
      description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.',
      attributes: [ { name: 'Weight', value: '15.2 kg' } ],
      related_products: 
       [ { name: 'Fearow',
           url: 'https://scrapeme.live/shop/Fearow/',
           price: '£95.00',
           sku: '9127' },
         { name: 'Blastoise',
           url: 'https://scrapeme.live/shop/Blastoise/',
           price: '£76.00',
           sku: '5212' },
         { name: 'Arbok',
           url: 'https://scrapeme.live/shop/Arbok/',
           price: '£182.00',
           sku: '9230' } ] }
  const file = fs.readFileSync("test_data/Bulbasaur-ScrapeMe.html", 'utf8');
  extractor = new selector.Extractor('test_data/input.yml');
  const dom = new jsdom.JSDOM(file)
  extracted_data = extractor.extract(dom.window.document)
  expect(extracted_data).toStrictEqual(expected_data);
});