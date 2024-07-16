import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import { defineConfig } from "rollup"

const rollupConfig = defineConfig({
  input: {
    content: "src/content.ts",
    background: "src/background.ts",
    popup: "src/popup.tsx",
  },
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these (like relative imports)
    }), // Resolve modules in node_modules

    commonjs(), // Convert CommonJS modules to ES6

    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Process files with these extensions
      babelHelpers: "bundled", // Use bundled Babel helpers
      presets: [
        "@babel/preset-typescript", // Process TypeScript
        "solid", // Process SolidJS
      ],
    }),
  ],
})
export default rollupConfig
