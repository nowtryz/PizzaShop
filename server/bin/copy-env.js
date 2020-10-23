const fs = require('fs')
const chalk = require('chalk')

fs.access('.env', err => {
    if (!err) {
        console.info(chalk.blue('ℹ `.env` file already exists, skipping'))
    } else {
        fs.copyFile('.env.example', '.env', err => {
            if (err) {
                console.error(chalk.red('❌ Unable to create `.env` file!'))
                console.error(chalk.red(err))
            } else {
                console.log(chalk.green('✔ `.env` file successfully created!'))
            }
        })
    }
})
