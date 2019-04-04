"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
var express = require("express");
var app = express();
var multer = require('multer');
var gm = require('gm');
var fs = require('fs');
var ejs = require('ejs');
var FfmpegCommand = require('fluent-ffmpeg');
var ffmpeg = require('fluent-ffmpeg');
function getPics() {
    return fs.readdirSync('./files/');
}
// @ts-ignore
var storageFile = multer.diskStorage({
    destination: __dirname + "/not_processed_files/",
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var storageVideo = multer.diskStorage({
    destination: __dirname + "/in_work_videos/",
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var storageAudio = multer.diskStorage({
    destination: __dirname + "/audio/",
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var storageVtt = multer.diskStorage({
    destination: __dirname + "/vtt/",
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadFile = multer({ storage: storageFile });
var uploadVideo = multer({ storage: storageVideo });
var uploadAudio = multer({ storage: storageAudio });
var uploadVtt = multer({ storage: storageVtt });
app.set('view engine', 'ejs');
app.use("/files", express.static(__dirname + "/files"));
app.use("/videos", express.static(__dirname + "/videos"));
app.use("/audio", express.static(__dirname + "/audio"));
app.use("/files", express.static(__dirname + "/files"));
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/css", express.static(__dirname + "/css"));
app.post('/api/file', uploadFile.single('file'), function (req, res, next) {
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
    res.redirect("/");
});
app.post('/api/files', uploadFile.array('files'), function (req, res, next) {
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
    res.redirect("/");
});
app.get('/gallery/image', function (req, res) {
    res.render('./galery.ejs', { data: getPics() });
});
//*********************************************************************************************************************************************************************************************************************************************
app.post('/api/videos', uploadVideo.array('videos'), function (req, res, next) {
    var command = ffmpeg();
    for (var i = 0; i < req.files.length; i++) {
        command = command.format("mp4").addInput("./in_work_videos/" + req.files[i].filename);
    }
    console.log(req.body);
    command.mergeToFile("./videos/" + req.body.name + ".mp4", './tmp/')
        .on('error', function (err) {
        console.log('Error ' + err.message);
    })
        .on('end', function () {
        console.log('Finished!');
    });
    res.redirect("/video_manager");
});
app.get('/video_manager', function (req, res) {
    res.render("video_manager1");
});
app.get('/video-player' +
    '', function (req, res) {
    console.log(req.query.videoName);
    res.render("video-player", { data: req.query.videoName });
});
//-------------------------------------------------------------------
app.post('/api/audio', uploadAudio.array('audio'), function (req, res, next) {
    fs.rename("./audio/" + req.files[0].filename, "./audio/" + req.body.name + "." + req.files[0].filename.split(".").pop(), function (err) {
        if (err)
            throw err;
    });
    fs.rename("./audio/" + req.files[1].filename, "./vtt/" + req.body.name + ".vtt", function (err) {
        if (err)
            throw err;
    });
    res.redirect("/audio_manager");
});
app.get('/audio_manager', function (req, res) {
    res.render("audio_manager1");
});
app.get('/audio-player', function (req, res) {
    console.log(req.query.videoName);
    res.render("audio-player1", { audio: req.query.audioName, vtt: fs.readdirSync('./vtt/').find(function (vtt) { return vtt === +req.query.audioName.slice(0, -4) + ".vtt"; }) });
});
// "------------------------------------------------------------------------------------------------------"
//
app.get('/', function (req, res) {
    res.render("index");
});
app.get('*', function (req, res) {
    res.render("index");
});
app.listen(process.env.PORT || 80, function () { return console.log("Server started on port " + process.env.PORT); });
//# sourceMappingURL=server.js.map