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
          loadingComponent: './components/molecules/Loading/PageLoading/'
        },
        title: '电竞鹰眼玩家服务平台',
        dll: false,
        locale: {
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use navigator.language overwrite default
          antd: true // use antd, default is true
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
            /constants\.(t|j)sx?$/ // 定义一些常量
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

    // 按需引入lodash
    // https://github.com/lodash/lodash-webpack-plugin#readme
    // TODO:待测试是否成功按需引入
    // ts tsx文件会有冲突，不知道能否按需引入
    // 安装的依赖 @babel/core @babel/preset-env babel-plugin-lodash lodash-webpack-plugin
    config.module
      .rule('lodash')
      .test(/\.(js|jsx)$/)
      // .pre()
      .exclude.add(/node_modules/)
      .add(resolveApp('src//pages/.umi/'))
      .end()
      .include.add(resolveApp('src'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        plugins: ['lodash'],
        presets: [['@babel/preset-env', { modules: false, targets: { node: 4 } }]]
      });
    config.plugin('lodash').use(require('lodash-webpack-plugin'), [
      {
        collections: true,
        paths: true
      }
    ]);
  }
};

export default config;
