module.exports = {
  nameNormalizator: (name) => {
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    name = name.replace(/[,.!@#$%^&*()<>?:"':;}\-\[\]{=+]/g, '');
    name = name.split(' ').filter((char) => !!char);
    name = name.map((string) => string.toLowerCase());
    name = name.map((string) => string.charAt(0).toUpperCase() + string.slice(1));
    name = name.join(' ').trim();

    return name;
  },

  emailNormalizator: (email) => {
    email = email.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    email = email.trim();
    email = email.replace(/[,!#$%^&*()< >?:"':;}[\]{=+]/g, '');
    email = email.toLowerCase();

    return email;
  }
};
