"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
var express = require("express");
var app = express();
var multer = require('multer');
var gm = require('gm');
var fs = require('fs');
var ejs = require('ejs');
function getPics() {
    return fs.readdirSync('./files/');
}
// @ts-ignore
var storage = multer.diskStorage({
    destination: __dirname + "/not_processed_files/",
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
app.use("/files", express.static(__dirname + "/files"));
app.set('view engine', 'ejs');
app.use("/files", express.static(__dirname + "/files"));
app.post('/api/file', upload.single('file'), function (req, res, next) {
    gm('not_processed_files/' + req.file.filename)
        .resize(720, null).noProfile()
        .write(__dirname + "/files/" + "sm_" + req.file.originalname, function (err) {
        if (!err)
            console.log('done');
        else
            console.log(err);
    });
    gm('not_processed_files/' + req.file.filename).resize(1200, null).noProfile().write(__dirname + "/files/" + "med_" + req.file.originalname, function (err) {
        if (!err)
            console.log('done');
        else
            console.log(err);
    });
    gm('not_processed_files/' + req.file.filename).resize(1920, null).noProfile().write(__dirname + "/files/" + "big_" + req.file.originalname, function (err) {
        if (!err)
            console.log('done');
        else
            console.log(err);
    });
    gm('not_processed_files/' + req.file.filename).resize(null, null).noProfile().write(__dirname + "/files/" + "ori_" + req.file.originalname, function (err) {
        if (!err)
            console.log('done');
        else
            console.log(err);
    });
    res.status(200).send("ok");
});
app.post('/api/files', upload.array('files'), function (req, res, next) {
    for (var i = 0; i < req.files.length; i++) {
        gm('not_processed_files/' + req.files[i].filename)
            .resize(720, null).noProfile()
            .write(__dirname + "/files/" + "sm_" + req.files[i].originalname, function (err) {
            if (!err)
                console.log('done');
            else
                console.log(err);
        });
        gm('not_processed_files/' + req.files[i].filename).resize(1200, null).noProfile().write(__dirname + "/files/" + "med_" + req.files[i].originalname, function (err) {
            if (!err)
                console.log('done');
            else
                console.log(err);
        });
        gm('not_processed_files/' + req.files[i].filename).resize(1920, null).noProfile().write(__dirname + "/files/" + "big_" + req.files[i].originalname, function (err) {
            if (!err)
                console.log('done');
            else
                console.log(err);
        });
        gm('not_processed_files/' + req.files[i].filename).resize(null, null).noProfile().write(__dirname + "/files/" + "ori_" + req.files[i].originalname, function (err) {
            if (!err)
                console.log('done');
            else
                console.log(err);
        });
    }
    res.status(200).send("ok");
});
app.get('/gallery/image', function (req, res) { return res.render('./galery.ejs', { data: getPics() }); });
//
app.get('/', function (req, res) {
    res.render("index");
});
// filename = image-gallery.html
//
// // Siehe NPMJS Repo
// str  Gerendertes File vom Server.
// res.send(str);
app.listen(process.env.PORT || 80, function () { return console.log("Server started on port " + process.env.PORT); });
//# sourceMappingURL=server.js.map