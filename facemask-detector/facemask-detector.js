module.exports = function (RED) {
  const lib = require("../lib/libs");

  async function loadModel(node) {
    node.model = await lib.loadModel();
  }

  // initial configuration (init process)
  function faceMaskDetector(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    // load model
    loadModel(node);

    // when node receives an image input
    node.on("input", async function (msg) {
      const predictions = await lib.evaluateImage(node.model, msg.payload);
      const predictionsResult = lib.processPredictions(predictions, {
        threshold: config.threshold,
      });

      msg.payload = {
        predictions: predictionsResult,
        image: msg.payload,
        detected: lib.evaluateDetected(predictionsResult),
        quantity: lib.evaluateQuantity(predictionsResult),
        threshold: config.threshold,
      };
      // send response
      node.send(msg);
    });
  }

  // register the node with the runtime
  RED.nodes.registerType("facemask-detector", faceMaskDetector);
};
