
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      // Discord
      DISCORD_TOKEN: string
      DISCORD_APPLICATION_ID: string
    }
  }
}
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
