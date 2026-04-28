const path = require('path');

const repoRoot = __dirname;
const cwd = process.cwd();
const isRepoBuild = path.resolve(cwd) === path.resolve(repoRoot);

module.exports = {
  // During git-hosted dependency prepare steps (e.g. pnpm temp directories),
  // Vite can accidentally pick up this root config while dependencies like
  // tailwindcss are unavailable in that isolated environment.
  plugins: isRepoBuild
    ? {
        tailwindcss: {},
        autoprefixer: {},
      }
    : {},
};
