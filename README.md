<!-- PROJECT SHIELDS -->
[![lerna][lerma-shield]](https://lerna.js.org)
[![Codacy Badge][codacy-shield]][codacy-url]
[![Build Status][travis-shield]][travis-url]
[![Heroku App Status][heroku-shield]][heroku-url]
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]


<br />
<h3 align="center">Pizza Shop</h3>

<p align="center">
An order and presentation web application for an hypothetical pizzeria
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents
* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Authors](#Authors)
* [License](#license)
___


<!-- ABOUT THE PROJECT -->
## About The Project

This is a school project made at Polytech Annecy-Chambéry as part of the FullStack course


### Built With

* [Express](https://expressjs.com/)
* [Lerna](https://lerna.js.org)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

The following softwares are needed to run the projet
- Node 12
- yarn (npm may cause issues)
- MongoDB

### Installation

1. Clone the repo
```sh
git clone https://github.com/nowtryz/PizzaShop.git
```
2. Install packages
```sh
yarn            # downloads dependencies for the root project
yarn bootstrap  # links packages with common
```
3. Update `.env` files with your values

<!-- USAGE EXAMPLES -->
## Usage

- Run the project
```shell script
yarn dev:start
```
- Or build the prod version
```shell script
yarn build
yarn start
```


<!-- ROADMAP -->
## Roadmap

See the [Roadmap on Notion](https://www.notion.so/0e53151b8e1a401ea7aa16a596d8db44?v=dd6932c297ed43f0b691378488f19240)
for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- Authors -->
## Authors
- **Damien Djomby** - *[Nowtryz](https://github.com/nowtryz)*
- **Adrien Simard** - *[adrien-simard](https://github.com/adrien-simard)*

Project Link: [https://github.com/nowtryz/PizzaShop](https://github.com/nowtryz/PizzaShop)


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/nowtryz/PizzaShop.svg?style=for-the-badge
[contributors-url]: https://github.com/nowtryz/PizzaShop/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/nowtryz/PizzaShop.svg?style=for-the-badge&label=⭐%20stars
[stars-url]: https://github.com/nowtryz/PizzaShop/stargazers
[license-shield]: https://img.shields.io/github/license/nowtryz/PizzaShop.svg?style=for-the-badge
[license-url]: https://github.com/nowtryz/PizzaShop/blob/master/LICENSE.md
[lerma-shield]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=for-the-badge
[travis-shield]: https://img.shields.io/travis/nowtryz/PizzaShop?logo=travis&style=for-the-badge
[travis-url]: https://travis-ci.org/nowtryz/PizzaShop
[heroku-shield]: http://heroku-shields.herokuapp.com/mamapizza??style=for-the-badge&logo=heroku
[heroku-url]: https://mamapizza.herokuapp.com
[codacy-shield]: https://img.shields.io/codacy/grade/54d5b64bec0e483f9e20e1a2b49e674d?logo=codacy&style=for-the-badge
[codacy-url]: https://www.codacy.com/gh/nowtryz/PizzaShop/dashboard
