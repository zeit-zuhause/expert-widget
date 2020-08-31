//Include required modules
var gulp = require("gulp"),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    rename = require("gulp-rename");

//Default task. This will be run when no task is passed in arguments to gulp
gulp.task("default", gulp.series(copyCss, copyAndPopulateStyle, bundleJs, copyIndex));

function bundleJs() {
    return gulp.src(['./build/static/js/runtime*.js', './build/static/js/main*.js', './build/static/js/2.*.chunk.js', './dist/generated/style.js'])
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('./dist/js/'));
}

function copyAndPopulateStyle() {
    return gulp.src("./style.js")
        .pipe(replace("STYLESTRING", function(s) {
            return fs.readFileSync('./dist/css/style.css', 'utf8');
        }))
        .pipe(gulp.dest("./dist/generated/"));
}

function copyCss() {
    return gulp.src("./build/static/css/main*.css")
        .pipe(replace(/\n\/\*.+\*\//, function (s) {
            return "";
        }))
        /*# sourceMappingURL=main.5f361e03.chunk.css.map */
        .pipe(rename("style.css"))
        .pipe(gulp.dest("./dist/css"));
}

//Copy static files from html folder to build folder
function copyIndex() {
    return gulp.src("./index.html")
        .pipe(gulp.dest("./dist/"));
}
