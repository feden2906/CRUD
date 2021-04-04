const path = require('path');
const uuid = require('uuid').v1;

const { PUBLIC } = require('../constants/folderNames.enum');

module.exports = (docName, itemID, itemClass, itemType) => {
  const pathWithoutPublic = path.join(itemClass, itemID, itemType);
  const fullDirPath = path.join(process.cwd(), PUBLIC, pathWithoutPublic);
  const fileExtension = path.extname(docName);
  const fileName = uuid() + fileExtension;
  const finalPath = path.join(fullDirPath, fileName);
  const pathForDB = path.join(pathWithoutPublic, fileName);

  return { finalPath, pathForDB, fullDirPath };
};
