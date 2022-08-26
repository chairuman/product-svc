const fs = require('fs');
const path = require('path');
const merge = require('lodash/merge');
const get = require('lodash/get');

const schemaDirPath = path.join(__dirname, 'schema');
const files = fs.readdirSync(schemaDirPath);

const schemas = {};
files
  .filter((file) => file.indexOf('.') > 0 && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line
    const schema = require(path.join(schemaDirPath, file));

    return merge(schemas, schema);
  });

const options = {
  stripUnknown: {
    arrays: false,
    objects: true,
  },
  abortEarly: false,
};

module.exports = async (req, schemaName) => {
  const input = {
    body: get(req, 'body', {}),
    query: get(req, 'query', {}),
    params: get(req, 'params', {}),
  };

  const schema = schemas[schemaName];

  return schema.validateAsync(input, options);
};
