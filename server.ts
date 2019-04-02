// server.ts
import * as express from "express";

const app = express();
const multer = require('multer');
const gm = require('gm')
const fs = require('fs');
const ejs = require('ejs')
var FfmpegCommand = require('fluent-ffmpeg');
var ffmpeg = require('fluent-ffmpeg');

function getPics() {
    return fs.readdirSync('./files/')
}



// @ts-ignore
const storageFile = multer.diskStorage({
    destination: __dirname + "/not_processed_files/",
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const storageVideo = multer.diskStorage({
    destination: __dirname + "/in_work_videos/",
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const uploadFile = multer({storage: storageFile});
const uploadVideo = multer({storage: storageVideo});

app.use("/files", express.static(__dirname + "/files"));
app.set('view engine', 'ejs');
app.use("/videos", express.static(__dirname + "/videos"));
app.use("/files", express.static(__dirname + "/files"));
app.use("/scripts",express.static(__dirname+"/scripts"));
app.use("/css",express.static(__dirname+"/css"))
app.post('/api/file', uploadFile.single('file'), function (req, res, next) {

    gm('not_processed_files/' + req.file.filename)
        .resize(720, null).noProfile()
        .write(__dirname + "/files/" + "sm_" + req.file.originalname, function (err) {
        if (!err) console.log('done'); else console.log(err);
    });

    gm('not_processed_files/' + req.file.filename).resize(1200, null).noProfile().write(__dirname + "/files/" + "med_" + req.file.originalname, function (err) {
        if (!err) console.log('done'); else console.log(err);
    });

    gm('not_processed_files/' + req.file.filename).resize(1920, null).noProfile().write(__dirname + "/files/" + "big_" + req.file.originalname, function (err) {
        if (!err) console.log('done'); else console.log(err);
    });

    gm('not_processed_files/' + req.file.filename).resize(null, null).noProfile().write(__dirname + "/files/" + "ori_" + req.file.originalname, function (err) {
        if (!err) console.log('done'); else console.log(err);
    });
    res.redirect("/");
});

app.post('/api/files', uploadFile.array('files'), function (req, res, next) {

    for(var i =0; i<req.files.length;i++){

        gm('not_processed_files/' + req.files[i].filename)
            .resize(720, null).noProfile()
            .write(__dirname + "/files/" + "sm_" + req.files[i].originalname, function (err) {
                if (!err) console.log('done'); else console.log(err);
            });

        gm('not_processed_files/' + req.files[i].filename).resize(1200, null).noProfile().write(__dirname + "/files/" + "med_" + req.files[i].originalname, function (err) {
            if (!err) console.log('done'); else console.log(err);
        });

        gm('not_processed_files/' + req.files[i].filename).resize(1920, null).noProfile().write(__dirname + "/files/" + "big_" + req.files[i].originalname, function (err) {
            if (!err) console.log('done'); else console.log(err);
        });

        gm('not_processed_files/' + req.files[i].filename).resize(null, null).noProfile().write(__dirname + "/files/" + "ori_" + req.files[i].originalname, function (err) {
            if (!err) console.log('done'); else console.log(err);
        });
    }

    res.redirect("/");

});

// "------------------------------------------------------------------------------------------------------"

app.post('/api/videos', uploadVideo.array('videos'), function (req, res, next) {

    var command = ffmpeg();
    for(var i =0; i<req.files.length;i++) {


        command = command.format("mp4").addInput("./in_work_videos/" + req.files[i].filename);

    }
    console.log(req.body);
        command.mergeToFile("./videos/"+req.body.name+"."+req.body.type, './tmp/')
            .on('error', function(err) {
                console.log('Error ' + err.message);
            })
            .on('end', function() {


                console.log('Finished!');            })
            ;




    res.redirect("/video_manager");

});

app.get('/gallery/image', (req, res) => {
    res.render('./galery.ejs', {data: getPics()})

});

app.get('/video_manager', function (req: express.Request, res: express.Response) {
    res.render("video_manager1");
});
//
app.get('/play_video', function (req: express.Request, res: express.Response) {
    console.log(req.query.videoName);
    res.render("player",{data: req.query.videoName});
});




app.get('/', function (req: express.Request, res: express.Response) {
    res.render("index");
});
app.get('*', function (req: express.Request, res: express.Response) {
    res.render("index");
});


app.listen(process.env.PORT || 80, () => console.log(`Server started on port ` + process.env.PORT));
