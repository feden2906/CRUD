const { nameNormalizator, emailNormalizator } = require('../utils');

const nameNormalizatorData = [
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

const emailNormalizatorData = [
  { input: 'maksym@gmail.com', output: 'maksym@gmail.com' },
  { input: 'm a k s ym@gmail.com', output: 'maksym@gmail.com' },
  { input: 'maksym @$ gmail .com', output: 'maksym@gmail.com' },
  { input: 'MAKS#%YM@gm+ail.com ', output: 'maksym@gmail.com' },
  { input: 'mAkSym@gmail.com', output: 'maksym@gmail.com' },
  { input: ' Maksym@gmail.com ', output: 'maksym@gmail.com' },
  { input: '    feden  @   ', output: 'feden@' }, // incorrect work with name
  { input: '+380976322866', output: '380976322866' }, // incorrect work with phone
];

describe('Test utils.js', () => {
  test('Should return normalized name', () => {
    nameNormalizatorData.forEach((testObj) => {
      const name = nameNormalizator(testObj.input);

      expect(name).toBe(testObj.output);
    });
  });

  test('Should return normalized email', () => {
    emailNormalizatorData.forEach((testObj) => {
      const email = emailNormalizator(testObj.input);

      expect(email).toBe(testObj.output);
    });
  });
});
