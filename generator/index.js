const packageJson = require('sass-boilerplate/package');

module.exports = api => {
  api.extendPackage({
    devDependencies: {
      'normalize.css': packageJson.devDependencies['normalize.css'],
      'breakpoint-sass': packageJson.devDependencies['breakpoint-sass'],
    },
    vue: {
      css: {
        loaderOptions: { scss: { data: '@import "@/scss/lib/_lib.scss";' } },
      },
    },
  });

  api.render('./template');

  api.injectImports(api.entryFile, [
    `import 'normalize.css';`,
    `import '@/scss/main.scss';`,
  ]);
};
