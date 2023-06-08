import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../docs/**/Introduction.mdx', '../docs/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
    '@storybook/addon-mdx-gfm',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });
    return config;
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
