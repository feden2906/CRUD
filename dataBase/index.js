const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const { DB_DIALECT, DB_LOGIN, DB_PASSWORD, DB_SCHEMA } = require('../configs/configs');

module.exports = (() => {
  let instance;

  const initConnection = () => {
    const client = new Sequelize(DB_SCHEMA, DB_LOGIN, DB_PASSWORD, { dialect: DB_DIALECT });

    const models = {};
    const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

    const getModels = () => {
      fs.readdir(modelsPath, ((err, files) => {
        files.forEach((file) => {
          const { name } = path.parse(file);

          const modelFile = require(path.join(modelsPath, name));

          models[name] = modelFile(client);
        });
      }));
    };

    return {
      setModels: () => getModels(),
      getModel: (modelName) => models[modelName],
      instanceTransaction: () => client.transaction()
    };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = initConnection();
      }

      return instance;
    }
  };
})();
