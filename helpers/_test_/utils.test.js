const { nameNormalizator, emailNormalizator, phoneNormalizator } = require('../utils');

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

const phoneNormalizatorData = [
  { input: ' 097 63 22 866 ', output: '+380976322866' },
  { input: '0976#3228% % 66', output: '+380976322866' },
  { input: 'A+3809763228A66', output: '+380976322866' },
  { input: '9 7 6 3 2 2866 ', output: '+380976322866' },
  { input: '09763 2 2 8 6 6', output: '+380976322866' },
  { input: '+38097&%6322866', output: '+380976322866' },
  { input: '   M a k s y m    ', output: '+380' }, // incorrect work with name
  { input: 'masym@gmail.com', output: '+380' }, // incorrect work with email
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

  test('Should return normalized phone', () => {
    phoneNormalizatorData.forEach((testObj) => {
      const phone = phoneNormalizator(testObj.input);

      expect(phone).toBe(testObj.output);
    });
  });
});
