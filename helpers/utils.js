const nameNormalizator = (name = '') => {
  if (!name) {
    return '';
  }

  name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  name = name.replace(/[,.!@#$%^&*()<>?:"':;}\-\[\]{=+]/g, ''); // Jon#%Doe => Jon Doe
  name = name.split(' ').filter((char) => !!char); // Jon    Doe => [Jon,Doe]
  name = name.map((string) => string.toLowerCase());
  name = name.map((string) => string.charAt(0).toUpperCase() + string.slice(1));
  name = name.join(' ').trim(); // [Jon,Doe] => Jon Doe

  return name;
};

module.exports = {
  nameNormalizator
};
