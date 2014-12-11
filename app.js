// Express
// Ejs
// HTTP
// Populate
// Get all .md
// raw
// https://raw.githubusercontent.com/OpenBCI/Docs/master/src/content/8bitstart.md\

// https://api.github.com/repos/izuzak/pmrpc/git/refs/heads/master

var express = require('express'),
    app = express(),
    github = require('./modules/github.js'),
    jsonPath = 'mdlist.json',
    fs = require('fs'),
    mdList = [],
    _ = require('underscore'),
    port = 80;

// =====

// update list
// get list
app.updateMDList = function() {
    fs.readFile(jsonPath, function(err, data) {
        if (err) throw err;
        // mdList = JSON.parse(data.toString());
        var string = data.toString();
        mdList = JSON.parse(string);
        // mdList = _.unique(mdList);
    });
};

app.renderPage = function(res, page) {
    // read all mds and get title, order
    console.log('sending');
    console.log(mdList);
    res.render('index', {
        title: app.locals.title,
        mdList: JSON.stringify(mdList),
        prefixUrl: github.prefixUrl,
        mdUrl: page + '.md'
    });
};

// =====

app.set('view engine', 'ejs');
app.locals.title = 'OpenBCI Docs';
app.use('/public', express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);
    next();
});

app.updateMDList();
app.all('/updateMDList', function() {
    // wait for like 20 secs
    // setTimeout(function() {
    github.fetch(app.updateMDList);
    // }, 20 * 1000);
});

app.get('*', function(req, res) {
    // validate path and feed content via ejs
    var page = req.originalUrl.substr(1, req.originalUrl.length);
    if (_.findWhere(mdList, {
        filename: page
    })) {
        app.renderPage(res, page);
        // print page
    } else {
        // redirect to start
        res.redirect('/01-8bitstart');
    }
});

app.listen(port, function() {
    console.log('running on port ' + port);
});