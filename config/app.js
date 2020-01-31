import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: 3000,
    api_version: process.env.API_VERSION
  },
  db: {
    mongo_connection_string: process.env.MONGO_CONNECTION_STRING
  },
  jwt: {
    token_secret: 'DRXqa9r4UsjO5F0wMybN2BdTiKGmzAoL',
    token_life: 2592000, // in seconds -  30 Days 
    refresh_token_secret: 'wXyjKZpuoDsmg1MLP8CaHkfO2bUhrF6W',
    refresh_token_life: 7776000 // in seconds - 7 Days
  },
  sentry: {
    dns: process.env.SENTRY_DNS
  },
  sms: {
    endpoint: process.env.SMS_SERVICE_ENDPONT,
    sender_id: process.env.SMS_SERVICE_SENDER_ID,
    api_key: process.env.SMS_SERVICE_API_KEY,
    otp_sms_template: process.env.OTP_SMS_TEMPLATE
  },
  aws: {
    s3_access_key_id: process.env.AWS_S3_ACCESS_KEY_ID,
    s3_secret_access_key: process.env.AWS_S3_SECRET_ACCESS_KEY,
    s3_bucket: process.env.AWS_S3_BUCKET,
  },
}
const prod = {
  app: {
    port: 3000
  },
  db: {
    mongo_connection_string: process.env.MONGO_CONNECTION_STRING
  }
}

const config = {
  dev,
  prod
}

export default config[env]