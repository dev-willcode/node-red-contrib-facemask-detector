module.exports = function (RED) {
  const lib = require("./src/libs");

  // load the model
  async function loadModel(node) {
    node.model = await lib.loadModel();
  }

  // configuración inicial del nodo (init process)
  function tfjsFaceMaskDetector(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    // cargar el modelo a evaluar de face mask
    loadModel(node);

    // al recibir una entrada
    node.on("input", async function (msg) {
      const predictions = await lib.evaluateImage(node.model, msg.payload);
      const predictionsResult = lib.processPredictions(predictions, {
        threshold: 0.5,
      });

      msg.payload = {
        results: predictionsResult,
        detected: lib.evaluateDetected(predictionsResult),
        quantity: lib.evaluateQuantity(predictionsResult),
      };
      // enviar respuesta
      node.send(msg);
    });
  }

  // register the node with the runtime
  RED.nodes.registerType("tfjs-facemask-detector", tfjsFaceMaskDetector);
};
