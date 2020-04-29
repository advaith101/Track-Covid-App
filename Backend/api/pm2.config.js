module.exports = {
  apps : [
      {
        name: "absencetracker",
        script: "./bin/www",
        watch: false,
        "log_date_format" : "YYYY-MM-DD HH:mm Z",
        env: {
            "NODE_ENV": "development"
        },
        env_staging: {
            "NODE_ENV": "staging"
        },
        env_production: {
            "NODE_ENV": "production"
        },
        env_demo: {
            "NODE_ENV": "demo"
        }
      }
  ]
}
