const config = require("../settings/config.json");
const path = require("path");
const fs = require("fs");

const base = process.cwd();
const layersBasePath = path.join(base, "/layers");

const getLayers = async (_layerType = null) => {
  return fs
    .readdirSync(`${layersBasePath}/${_layerType}/`)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((name) => {
      return {
        name,
      };
    });
};

const main = async () => {
  await generateConfig();
};

main();
