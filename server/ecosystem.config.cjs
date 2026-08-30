// PM2 process definition for the contact-form API backend.
// Usage:
//   pm2 start ecosystem.config.cjs --env staging
//   pm2 start ecosystem.config.cjs --env production
//
// PM2 loads env vars from server/.env automatically via dotenv inside index.js,
// so PORT/BREVO_API_KEY/etc. still come from that file — the "env" blocks below
// only set NODE_ENV per environment.
module.exports = {
  apps: [
    {
      name: 'decircle-solar-api',
      script: 'index.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
