module.exports = {
  apps: [
    {
      name: 'booknaav',
      script: 'dist/index.js',
      instances: 'max',
      env_production: {
        NODE_ENV: 'production',
      },
      watch: '.',
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
