import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  plugins: [
    {
      resolve: "@rsc-labs/medusa-documents-v2",
      options: {}
    },
    {
      resolve: "@tsc_tech/medusa-plugin-notification-template",
      options: {

      }
    },
    {
      resolve: "@tsc_tech/medusa-plugin-product-seo",
      options: {},
    },
  ]
})
