module.exports = {
  emailNormalizator: (email) => {
    email = email.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    email = email.trim();
    email = email.replace(/[,!#$%^&*()< >?:"':;}[\]{=+]/g, '');
    email = email.toLowerCase();

    return email;
  },

  nameNormalizator: (name) => {
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    name = name.replace(/[,.!@#$%^&*()<>?:"':;}\-\[\]{=+]/g, '');
    name = name.split(' ').filter((char) => !!char);
    name = name.map((string) => string.toLowerCase());
    name = name.map((string) => string.charAt(0).toUpperCase() + string.slice(1));
    name = name.join(' ').trim();

    return name;
  },

  phoneNormalizator: (phone) => {
    phone = phone.replace(/[,.!@#$%^&*QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm()< >?:"'|:;}\-\[\]{=+]/g, '');
    phone = phone.slice(-9);
    phone = phone.split('');
    phone.unshift('+380');
    phone = phone.join('');

    return phone;
  }
};
