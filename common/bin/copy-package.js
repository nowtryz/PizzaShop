const fs = require('fs')
const chalk = require('chalk')

const run = () =>  {
    console.log(chalk.blue('\nCopying `package.json`...'))
    fs.readFile('./package.json', copy)
}

const copy = (err, packageData) => {
    if (err) {
        console.error(chalk.red("❌ Unable to read content from `package.json`"))
        console.error(chalk.red(err))
    } else {
        const {
            scripts,
            devDependencies,
            ...newPackage
        } = JSON.parse(packageData)

        fs.writeFile('dist/package.json', JSON.stringify(newPackage, null, 2), err => {
            if (err) {
                console.error(chalk.red('❌ Unable to copy `package.json` file!'))
                console.error(chalk.red(err))
            } else {
                console.log(chalk.green('✔ `package.json` file successfully copied!'))
            }
        })
    }
}

run()
