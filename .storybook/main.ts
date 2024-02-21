import type { StorybookConfig } from '@storybook/react-webpack5';
import { Configuration, RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  // ...
  typescript: {
    // Removes babel-loader from webpack config
    skipBabel: true,
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-webpack5',
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: Configuration) => {
    // Custom rule for ts files
    const tsRule: RuleSetRule = {
      test: /\.(tsx?|jsx?)$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    };

    return {
      ...config,
      module: {
        ...config.module,
        rules: [...(config.module?.rules || []), tsRule],
      },
    };
  },
};

export default config;
