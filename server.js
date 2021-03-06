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
var http = require("http");
var WebSocket = require("ws");
var server = http.createServer(app);
var wss = new WebSocket.Server({ server: server });
server.listen(process.env.PORT || 8999, function () {
    console.log("Server started on port " + server.address().port + " :)");
});
wss.on('connection', function (ws) {
    ws.isAlive = true;
    ws.on('pong', function () {
        ws.isAlive = true;
    });
    setInterval(function () {
        wss.clients.forEach(function (ws) {
            if (!ws.isAlive)
                return ws.terminate();
            ws.isAlive = false;
            ws.ping(null, false, true);
        });
    }, 15000);
    ws.on('message', function (message) {
        if (JSON.parse(message).user !== "identifyer=?989()") {
            //log the received message and send it back to the client
            console.log('received: %s', message);
            //send back the message to the other clients
            ws.send(" " + message);
            wss.clients.forEach(function (client) {
                if (client != ws) {
                    console.log(wss.clients.length);
                    client.send("" + message);
                }
                ;
            });
        }
        else {
            console.log(JSON.parse(message).msg);
        }
        ;
    });
    //send immediatly a feedback to the incoming connection
    console.log(wss.clients.length);
    var message = { user: "Server", msg: "Server connection established" };
    ws.send('Server connection established');
});
app.get('/chat', function (req, res) {
    res.render('./chat.ejs', { data: getPics() });
});
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
app.use("/vtt", express.static(__dirname + "/vtt"));
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
//-----------------------------------------------
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
app.get('/video_player' +
    '', function (req, res) {
    console.log(req.query.videoName);
    res.render("video_player", { data: req.query.videoName });
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
    res.render("audio_player", { audio: req.query.audioName.slice(0, -4) });
});
// "------------------------------------------------------------------------------------------------------"audio: req.query.audioName,vtt: fs.readdirSync('./vtt/').find(vtt => vtt === +req.query.audioName.replace(/\.[^/.]+$/,".vtt"))
app.get('/', function (req, res) {
    res.render("index");
});
app.get('*', function (req, res) {
    res.render("index");
});
//-----------------------------------------------------------------------------------------------------------------------------
//# sourceMappingURL=server.js.map