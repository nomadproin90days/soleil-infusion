import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Explicitly ignore non-source and generated directories
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "drive-download-20260219T013431Z-1-001/**",
    "site/**",
    "scripts/**",
    "workflows/**",
    "report/**",
    "research/**",
    "docs/**",
    "node_modules/**"
  ]),
]);

export default eslintConfig;
