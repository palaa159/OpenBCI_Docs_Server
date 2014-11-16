// Github.js
var GitHubApi = require('github'),
    fs = require('fs'),
    filePath = 'mdlist.json',
    _ = require('underscore'),
    https = require('https'),
    prefixUrl = 'https://raw.githubusercontent.com/palaa159/Docs/master/',
    MDLIST = [];

var gh = new GitHubApi({
    version: "3.0.0",
    // optional
    debug: false,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000
});

var fetch = function(cb) {
    gh.repos.getContent({
        // optional:
        user: "palaa159",
        repo: 'Docs',
        path: ''
    }, function(err, res) {
        // console.log(res); // array
        res.forEach(function(item) {
            if (item.name.indexOf('.md') > -1 && item.name !== 'README.md') {
                // Parse MD
                // Get first line
                https.get(prefixUrl + item.name, function(res) {
                    // match first line
                    res.on('data', function(raw) {
                        var d = raw.toString();
                        d = d.substr(d.indexOf('# ') + 2, d.indexOf('\n') - 2);
                        console.log(d);
                        MDLIST.push({
                            filename: item.name.substr(0, item.name.indexOf('.md')),
                            title: d
                        });
                        MDLIST = _.unique(MDLIST);
                        fs.writeFile(filePath, JSON.stringify(MDLIST), function(err) {
                            if (err) throw err;
                            console.log('It\'s saved!');
                            cb();
                        });
                    });
                });
            }
        });
    });
};

module.exports = {
    fetch: fetch,
    prefixUrl: prefixUrl
    // MDLIST: MDLIST
};