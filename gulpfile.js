'use_strict';
var
    // gulp and gulp-related
    gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    less        = require('gulp-less'),
    livereload  = require('gulp-livereload'),
    minifyCss   = require('gulp-minify-css'),
    shell       = require('gulp-shell'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),

    // misc (non-Gulp) dependencies
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),

    // path configuration
    paths = {
        scripts: {
            sources: [
                './js/**/*.js',
                './js/**/*.jsx'
            ],
            dest: './build/',
            entry: './js/app.jsx',
            exit: 'app.min.js',
            externals: [
                'react'
            ]
        },
        styles: {
            sources: [
                './css/**/*.less',
                './css/**/*.css'
            ],
            dest: './build/',
            entry: false,
            exit: 'app.min.css'
        }
    };

// our error handler; a standard error-object-to-text logger; expand this as
// needed with fancy logging, etc.
function handleError(err) {
    console.log('---> Error:' + err.toString());
    this.emit('end');
}

// a standardized task for concatenating and compiling LESS assets from the 
// given source to the given build file.
function lessTask(sources, buildFile) {
    return gulp.src(sources)
        .pipe(concat(buildFile))
        .pipe(less())
            .on('error', handleError)
        .pipe(livereload());
}

// a standardized task for handling browserify'ication of internal components
function browserifyTask(entry, fileName) {
    var bundler = browserify({
        entries: entry,
        transform: [reactify]
    });

    return bundler
        .external(paths.scripts.externals)
        .bundle()
            .on('error', handleError)
            .pipe(source(fileName))
            .pipe(buffer())
            .pipe(sourcemaps.init());
}


//
// ============================================================================
// LESS Compilation
//
gulp.task('less:dev', function() {
    return lessTask(paths.styles.sources, paths.styles.exit)
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('less:prod', function() {
    return lessTask(paths.styles.sources, paths.styles.exit)
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dest));
});


//
// ============================================================================
// Scripts Processing (Reactify -> Browserify)
//
gulp.task('browserify:dev', function() {
    console.log('\n>> Building:', paths.scripts.exit + '(dev)');
    return browserifyTask(paths.scripts.entry, paths.scripts.exit)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(livereload());
});

gulp.task('browserify:prod', function() {
    console.log('\n>> Building:', paths.scripts.exit + '(production)');
    return browserifyTask(paths.scripts.entry, paths.scripts.exit)
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest));
});

//
// ============================================================================
// Watching/Server Tasks
//
gulp.task('watch', function() {
    gulp.watch(paths.styles.sources, [
        'less:dev'
    ]);
    gulp.watch(paths.scripts.sources, [
        'browserify:dev'
    ]);

    livereload.listen();
});

gulp.task('default', ['less:dev','browserify:dev', 'watch'], shell.task([
    'node server.js'
]));
