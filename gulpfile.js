import gulp from 'gulp';
import tingpng from 'gulp-tinypng';
import postcss from 'gulp-postcss';
import imagemin from 'gulp-imagemin';
import jshint from 'gulp-jshint';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import watch from 'gulp-watch';
import fileinclude from 'gulp-file-include';
import size from 'gulp-size';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import gcmq from 'gulp-group-css-media-queries';
import babel from 'gulp-babel';
import newer from 'gulp-newer';
import filter from 'gulp-filter';
import fs from 'fs-extra';
import path from 'path';
import es from 'event-stream';

browserSync.create();
const plugins = [autoprefixer({ browsers: ['last 3 version', 'Safari 8'] })];

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

gulp.task('images', function () {
  gulp
    .src('src/resources/images/**/*')
    .pipe(newer('docs/resources/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('docs/resources/images'))
    .pipe(filter('**/*.png', { restore: true }))
    .pipe(tingpng('bL0oDgQc5kc58M6TeL3koOkKQFZGMd_6'))
    .pipe(gulp.dest('docs/resources/images'));
});

gulp.task('stylesheets', function () {
  return gulp
    .src('src/resources/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gcmq())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('docs/resources/css/'))
    .pipe(cleanCSS({ compatibility: 'ie10' }))
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(size({ title: 'css' }))
    .pipe(gulp.dest('docs/resources/css/'))
    .on('end', function () {
      browserSync.reload();
    });
});

gulp.task('html', function () {
  gulp
    .src(['src/*.html'])
    .pipe(fileinclude())
    .pipe(gulp.dest('docs'))
    .on('end', function () {
      browserSync.reload();
    });
});

gulp.task('javascript', function () {
  const folders = getFolders('src/resources/js/app/');

  var tasks = folders.map(function (folder) {
    return gulp
      .src(path.join('src/resources/js/app/', folder, '/*.js'))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(concat(folder + '.js'))
      .pipe(babel())
      .pipe(gulp.dest('docs/resources/js/'))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(size({ title: 'js' }))
      .pipe(gulp.dest('docs/resources/js/'))
      .on('end', function () {
        browserSync.reload();
      });
  });

  return es.concat.apply(null, tasks);
});

gulp.task('plugins', function () {
  return gulp
    .src('src/resources/js/plugins/*.js')
    .pipe(newer('docs/resources/js/plugins'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(size({ title: 'js' }))
    .pipe(gulp.dest('docs/resources/js/plugins'))
    .on('end', function () {
      browserSync.reload();
    });
});

gulp.task('default', function () {
  browserSync.init({
    server: {
      baseDir: './docs',
    },
  });

  gulp.watch('src/resources/images/**/*', gulp.series('images')).on('change', browserSync.reload);
  gulp.watch('src/resources/sass/**/*.scss', gulp.series('stylesheets')).on('change', browserSync.reload);
  gulp.watch('src/**/*.html', gulp.series('html')).on('change', browserSync.reload);
  gulp.watch('src/resources/js/app/**/*.js', gulp.series('javascript')).on('change', browserSync.reload);
  gulp.watch('src/resources/js/plugins/*.js', gulp.series('plugins')).on('change', browserSync.reload);
});
