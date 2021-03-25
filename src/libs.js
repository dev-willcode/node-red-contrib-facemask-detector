const cv = require("@microsoft/customvision-tfjs-node");
const tfnode = require("@tensorflow/tfjs-node");

// loading object detection model
const loadModel = async function () {
  const file = tfnode.io.fileSystem("model/model.json");
  const model = new cv.ObjectDetectionModel();
  await model.loadModelAsync(file);
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
  console.log("post-processed predictions", predictions[1]);
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
