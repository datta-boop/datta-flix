const path = require('path');

function resolveOptionalPlugin(pluginName) {
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(pluginName);
  } catch (error) {
    const isDirectMissingModuleError =
      error &&
      error.code === 'MODULE_NOT_FOUND' &&
      typeof error.message === 'string' &&
      error.message.includes(`'${pluginName}'`);

    if (isDirectMissingModuleError) return null;
    throw error;
  }
}

const tailwindPlugin = resolveOptionalPlugin('tailwindcss');
const autoprefixerPlugin = resolveOptionalPlugin('autoprefixer');
const isRepoRootBuild = path.resolve(process.cwd()) === path.resolve(__dirname);

if (isRepoRootBuild && (!tailwindPlugin || !autoprefixerPlugin)) {
  throw new Error(
    'postcss.config.js expected tailwindcss and autoprefixer to be installed for repo builds.',
  );
}

module.exports = {
  plugins: [tailwindPlugin && tailwindPlugin(), autoprefixerPlugin && autoprefixerPlugin()].filter(
    Boolean,
  ),
};
