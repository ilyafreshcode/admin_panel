var fs = require('fs');
var jsonfile = require('jsonfile');


exports.rewrite = function(activeVacancies){
    var vacancy = JSON.parse(fs.readFileSync('./freshcodeit.github.io/_data/cards_vacancy.json'));
    vacancy.first_section.card_type = [];
    for(var i = 0; i < activeVacancies.length; ++i){
        var temp = {
            developer: activeVacancies[i].name,
            status: activeVacancies[i].date,
            link_to: activeVacancies[i].linkTo
        };
        vacancy.first_section.card_type.push(temp);
    }

    jsonfile.writeFileSync('./freshcodeit.github.io/_data/cards_vacancy.json', vacancy);
};