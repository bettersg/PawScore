import NodemonPlugin from "nodemon-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import nodeExternals from "webpack-node-externals";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    // bundling mode
    mode: "production",

    devtool: "source-map",

    // entry point for app
    entry: "./src/app.ts",

    // exclude node_modules
    externals: [nodeExternals({ importType: "module" })],
    externalsPresets: {
        node: true,
    },
    externalsType: "module",

    experiments: {
        outputModule: true,
    },

    // output bundles (location)
    output: {
        path: path.resolve(dirname, "dist"),
        filename: "app.js",
        environment: { module: true },
    },

    optimization: {
        minimize: false,
    },

    // file resolutions
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@contract": path.resolve(dirname, "../contract"),
        },
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.ts/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new NodemonPlugin({
            nodeArgs: [
                "--enable-source-maps",
                "--inspect",
                "--experimental-specifier-resolution=node",
            ],
        }),
    ],
};
