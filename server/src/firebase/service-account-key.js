import dotenv from 'dotenv'

dotenv.config()

const serviceKey = {
  type: 'service_account',
  project_id: 'recipe-manager-ed948',
  private_key_id: process.env.SERVICE_KEY_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_KEY_PRIVATE_KEY,
  client_email: process.env.SERVICE_KEY_CLIENT_EMAIL,
  client_id: process.env.SERVICE_KEY_CLIENT_ID,
  auth_uri: process.env.SERVICE_KEY_AUTH_URI,
  token_uri: process.env.SERVICE_KEY_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SERVICE_KEY_AUTH_PROVIDER,
  client_x509_cert_url: process.env.SERVICE_KEY_CLIENT_CERT
}

export default serviceKey
