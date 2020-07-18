const api = require('./app.js');

test();

async function test(){
    let tst = await api.getCasesByCountry('brazil');

    console.log(' -------------------------- ');
    console.log(tst.total);
}