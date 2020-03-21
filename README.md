# COVID-19 Simple Scrapper
Simple scrapper to gather data about COVID-19 virus on a determined country. Was made for study and integration on my [personal project](https://github.com/Gabrielvsm/COVID19BrUpdate_Twitterbot) purposes, so its expected to have a feel bugs and to be pretty simple.

## Installation
Install via NPM:

```bash
npm install covid19-gatherer

```

## Usage

#### javascript

```javascript

var myApp = require("covid19-gatherer");

myApp.getCasesByCountry( country );

```