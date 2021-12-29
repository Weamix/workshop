const algoliasearch = require("algoliasearch");

const client = algoliasearch("2CSWU3EMWB", "3f18090ed889ad12e199818ab428b36d");
// dbf0d699c2c6a9a017f1fb7ccff1e1dd
const index = client.initIndex("products");

const records = require('./datasets/ecommerce.json');

index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });