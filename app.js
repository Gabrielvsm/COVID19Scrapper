const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.worldometers.info/coronavirus/country/';
let cases = {};
let $;

async function getCasesByCountry(country){
    let html = await getHtml(country);
    $ = cheerio.load(html);
    cases = {};

    let panels = $('.row').children('.col-md-6');

    let activeCasesPanel = panels.first().find( $('.panel-body') );
    let closedCasesPanel = panels.eq(1).find( $('.panel-body') );

    cases = {
        'total': getPrimary(activeCasesPanel) + getPrimary(closedCasesPanel),
        'activeCases': {
            'totalActiveCases': getPrimary(activeCasesPanel),
            'mildConditionCases': getFloatLeft(activeCasesPanel),
            'criticalCases': getFloatRight(activeCasesPanel)
        },
        'closedCases': {
            'totalClosedCases': getPrimary(closedCasesPanel),
            'recoveredCases': getFloatLeft(closedCasesPanel),
            'deathCases': getFloatRight(closedCasesPanel)
        }
    };

    return cases;
}

function getPrimary(panel){
    let total = panel.find( $('.panel_front') ).children().first().text().trim().replace(",", "").replace(",", "");
    return parseInt(total);
}

function getFloatLeft(panel){
    let leftDiv = panel.find( $('.panel_front') ).children().eq(2).children().first();
    let leftValue = leftDiv.find( $('.number-table') ).text().trim().replace(",", "").replace(",", "");
    return parseInt(leftValue);
}

function getFloatRight(panel){
    let rightDiv = panel.find( $('.panel_front') ).children().eq(2).children().eq(1);
    let rightValue = rightDiv.find( $('.number-table') ).text().trim().replace(",", "").replace(",", "");
    return parseInt(rightValue);
}

async function getHtml(country){
    let finalUrl = url.concat(country);
    let html;

    await axios(finalUrl).then(res => {
        html = res.data;
    }).catch( console.error );

    return html;
}

module.exports = {
    getCasesByCountry
}