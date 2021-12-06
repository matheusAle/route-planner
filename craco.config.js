const { CracoAliasPlugin, configPaths } = require('react-app-rewire-alias');

module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: { alias: configPaths('./tsconfig.paths.json') },
          },
    ],
  }