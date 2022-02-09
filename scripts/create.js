const config = require("../settings/config.json");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// Define Paths
const base = process.cwd();
const buildBasePath = path.join(base, "/build");
const layersBasePath = path.join(base, "/layers");

// Define Rarity
let rarity;

const initialize = () => {
  try {
    // Determine if rarity.json exists
    rarity = require("../settings/rarity.json");
  } catch (error) {
    throw new Error("Missing rarity.json file");
  }

  if (fs.existsSync(buildBasePath)) {
    fs.rmdirSync(buildBasePath, { recursive: true });
  }

  fs.mkdirSync(buildBasePath);
  fs.mkdirSync(path.join(buildBasePath, "/json"));
  fs.mkdirSync(path.join(buildBasePath, "/images"));
};

// Define Canvas

const { createCanvas } = require("canvas");
const canvas = createCanvas(
  config.image_details.width,
  config.image_details.height
);
const ctx = canvas.getContext("2d");

// Save the image
const saveImage = (_imageCount) => {
  console.log(`Saving Image...\n`);

  fs.writeFileSync(
    `${buildBasePath}/images/${_imageCount}.png`,
    canvas.toBuffer("image/png")
  );
};

const main = () => {
  try {
    initialize();
    createImage();
  } catch (error) {
    console.log(error);
  }
};

main();
