module.exports = {
  apps : [{
    name: "swish-script"
    script: 'dist/index.js',
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'pnpm build',
      'pre-setup': ''
    }
  }
};
