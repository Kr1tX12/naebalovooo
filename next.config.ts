// НЕ ТРОГАТЬ!!!!
// DO NOT TOUCH!!!
// 别碰它!!
// అది తాకే లేదు!
// ריר עס נישט

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  pageExtensions: ["yopta", "tsx", "ts", "jsx", "js"],
  webpack: (config) => {
    config.resolve.extensions.push(".yopta");
    config.resolve.fullySpecified = false;
    config.module.rules.push({
      test: /\.yopta$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["next/babel", "@babel/preset-typescript"],
            plugins: [["@babel/plugin-transform-typescript", { isTSX: true }]],
          },
        },
        {
          loader: path.resolve(__dirname, "loaders/yopta-loader.js"),
        },
      ],
      type: "javascript/auto",
    });

    return config;
  },
};

export default nextConfig;
