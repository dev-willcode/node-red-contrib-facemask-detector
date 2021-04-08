const cv = require("@microsoft/customvision-tfjs-node");
const tfnode = require("@tensorflow/tfjs-node");
const path = require("path");

// loading object detection model
const loadModel = async function () {
  let model = null;
  let pathModel = path
    .resolve(__dirname, "..", "model", "model.json")
    .replace(/\\/g, "/");

  try {
    const file = tfnode.io.fileSystem(pathModel);
    model = new cv.ObjectDetectionModel();
    await model.loadModelAsync(file);
  } catch (error) {
    console.log("No se encontro el archivo de modelo");
    console.log("path", pathModel);
    console.log(error);
  }

  return model;
};

// evaluate model with image and return predictions
const evaluateImage = async function (model, data) {
  return await model.executeAsync(data);
};

const filterIterator = function (array, index, filter) {
  return array[index].filter((predicted) => predicted >= filter).keys();
};

const filterFunc = function (indexFilter, index) {
  return indexFilter.includes(index);
};

const processPredictions = function (predictions, { threshold = 0.3 }) {
  const [bbox, probabilities, mask] = [0, 1, 2];
  const predictionIndex = [
    ...filterIterator(predictions, probabilities, threshold),
  ];

  const bboxResult = predictions[bbox].filter((_, index) =>
    filterFunc(predictionIndex, index)
  );
  const probabilitiesResult = predictions[probabilities].filter((_, index) =>
    filterFunc(predictionIndex, index)
  );
  const maskResult = predictions[mask].filter((_, index) =>
    filterFunc(predictionIndex, index)
  );

  return [bboxResult, probabilitiesResult, maskResult];
};

const evaluateDetected = function (results) {
  return results[1] && results[1].length > 0;
};
const evaluateQuantity = function (results) {
  if (results[1].length) return results[1].length;
  return 0;
};

module.exports = {
  loadModel,
  evaluateImage,
  processPredictions,
  evaluateDetected,
  evaluateQuantity,
};
