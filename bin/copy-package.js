const fs = require('fs')
const chalk = require('chalk')

const newPackage = {
    main: "index.js",
    types: "index.d.ts",
}

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
            ...package
        } = JSON.parse(packageData)

        const builtPackage = {
            ...package,
            ...newPackage
        }

        fs.writeFile('dist/package.json', JSON.stringify(builtPackage, null, 2), err => {
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
