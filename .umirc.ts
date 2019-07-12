import { IConfig } from 'umi-types';

const path = require('path');
const fs = require('fs');
const eslintFormatter = require('eslint-friendly-formatter');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: any) => path.resolve(appDirectory, relativePath);

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  // disableCSSSourceMap: true,
  hash: true,
  targets: {
    ie: 10
  },
  theme: './theme.js',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { immer: true, hmr: true },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/molecules/Loading/PageLoading.tsx'
        },
        title: 'new_project',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
            /constant\.(t|j)sx?$/ // 定义一些常量
          ]
        }
      }
    ]
  ],
  chainWebpack(config: any) {
    const eslintOptions = {
      formatter: eslintFormatter,
      baseConfig: {
        // extends: [require.resolve('eslint-config-umi')],
        extends: [require.resolve('@aimake/eslint-config')]
      },
      ignore: false,
      eslintPath: require.resolve('eslint'),
      useEslintrc: true,
      failOnError: true,
      failOnWarning: true,
      emitError: true,
      emitWarning: true,
      rules: {
        'jsx-a11y/anchor-is-valid': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0
      }
    };

    config.module
      .rule('lint')
      .test(/\.(js|jsx|tsx|ts)$/)
      .pre()
      .include.add(resolveApp('src'))
      .end()
      .exclude // .add(/node_modules/)
      // .add('/src/pages/.umi/*')
      .end()
      .enforce('pre')
      .use('eslint-loader')
      .loader(require.resolve('eslint-loader'))
      .options(eslintOptions);
  }
};

export default config;
