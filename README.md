<section align="center">

[![Maintenance](https://img.shields.io/badge/make%20with-love%20%E2%99%A5-red?style=for-the-badge)]() [![issues](https://img.shields.io/github/issues/dev-willcode/node-red-contrib-facemask-detector?style=for-the-badge)](https://github.com/dev-willcode/node-red-contrib-facemask-detector/issues) [![forks](https://img.shields.io/github/forks/dev-willcode/node-red-contrib-facemask-detector?style=for-the-badge)](https://github.com/dev-willcode/node-red-contrib-facemask-detector/network) [![stars](https://img.shields.io/github/stars/dev-willcode/node-red-contrib-facemask-detector?style=for-the-badge)](https://github.com/dev-willcode/node-red-contrib-facemask-detector/stargazers)

</section>
<h1 align="center">
  Face mask detector 😷
</h1>

A custom node from node-red to detect face masks from an input image.

## 🚧 Requirements

- **On windows**, You need the Visual Studio Build Tools because _node-gyp_ requires to run correctly, You can read more about it [here.](https://github.com/nodejs/node-gyp#on-windows)

You can install the Build tools (2017) 👉 [Official Build Tools 2017.](https://visualstudio.microsoft.com/es/thank-you-downloading-visual-studio/?sku=BuildTools&rel=15)

You need check and install these packages:

<section align="center">  
    <img alt="Build tools install" src="https://github.com/dev-willcode/node-red-contrib-facemask-detector/blob/master/example/images/build-tools.png" />
</section>

An alternative to installing the build tools is using the next command suggested [here](https://stackoverflow.com/a/39648550/14742402) running a Powershell terminal in administrator mode.

```bash
npm install --global --production windows-build-tools
```

## 🔧 Install

This node requires `@microsoft/customvision-tfjs-node` and `@tensorflow/tfjs-node` as peer dependencies, you need installing them manually.

Go to **.node red** folder (usually located at `C:\Users\{YOUR_USER}\.node-red`) and execute:

```bash
npm install @microsoft/customvision-tfjs-node
```

```bash
npm install @tensorflow/tfjs-node
```

and then, install the node using:

```bash
npm install -S node-red-contrib-facemask-detector
```

or search it on **Manage Pallete** from node-red.

## 🔧 Usage

Pass an image (_array buffer_) to the input of node, and receive:

- The prediction model, that includes: bbox array, prediction array, and label array (_0 = mask object_)
- Original image processed.
- Boolean value (_detected_) any mask on the picture.
- Quantity of mask detected
- threshold configurated to evaluate that picture.

You can configure the threshold value to detect with more or less precision.

<section align="center">
    <img alt="configuration node" src="https://github.com/dev-willcode/node-red-contrib-facemask-detector/blob/master/example/images/facemask-node.png" />
</section>

## 🎯 Purpose

This project was done for educational purposes, using [Custom Vision](https://www.customvision.ai/projects/) to train the model with 629 facemask examples and node-red programming tool. You can test it using:

- [Basic flow using an input file.](https://github.com/dev-willcode/node-red-contrib-facemask-detector/blob/master/example/basic.json)

- [Advanced usage with sp32-cam and RPI how Gateway (IoT Implementation).](https://github.com/dev-willcode/node-red-contrib-facemask-detector/blob/master/example/iot-example)
