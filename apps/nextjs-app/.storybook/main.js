module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
    '@storybook/addon-interactions',
    'storybook-xstate-addon/preset',
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
    options: {
      appDirectory: true,
    },
  },
  docs: {
    autodocs: true,
  },
};
