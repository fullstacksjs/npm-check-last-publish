import { defineConfig } from "@fullstacksjs/eslint-config";

export default defineConfig({
  typescript: { tsconfigRootDir: import.meta.dirname },
  node: true,
  strict: true,
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
  },
});
