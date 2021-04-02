const { nameNormalizator } = require('../utils');

const nameNormalizatorData = [ // масив перевірки
  { input: '---maksym**', output: 'Maksym' },
  { input: '  maKsYm   ', output: 'Maksym' },
  { input: ' { Maksym ]', output: 'Maksym' },
  { input: '@Maks#$ym] ', output: 'Maksym' },
  { input: '   Maksym Fedenko   ', output: 'Maksym Fedenko' },
  { input: '$Ma$ksym $Feden$ko$-', output: 'Maksym Fedenko' },
  { input: 'Maksym       Fedenko', output: 'Maksym Fedenko' },
  { input: 'feden@gmail.com', output: 'Fedengmailcom' }, // incorrect work with email
  { input: '  +380976322866 ', output: '380976322866' }, // incorrect work with phone
];

describe('Test utils.js', () => {
  test('Should return normalized name', () => {
    nameNormalizatorData.forEach((testObj) => {
      const name = nameNormalizator(testObj.input);

      expect(name).toBe(testObj.output);
    });
  });
});
