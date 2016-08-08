var fs = require('fs'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  del = require('del'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  minifier = require('gulp-uglify/minifier'),
  uglify = require('uglify-js-harmony'),
  stylus = require('gulp-stylus'),
  replace = require('gulp-replace'),
  preprocess = require('gulp-preprocess'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  through = require('through'),
  opn = require('opn'),
  ghpages = require('gh-pages'),
  changed = require('gulp-changed'),
  path = require('path'),
  merge = require('merge-stream'),
  isDist = process.argv.indexOf('dev') === -1;

gulp.task('js', function() {
  return browserify({
    entries: 'scripts/main',
    extensions: ['.js', '.json'],
    debug: !isDist
  })
    .bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(isDist ? minifier({}, uglify) : through())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src('html/index.html')
    .pipe(preprocess({context: { NODE_ENV: isDist ?
      'production' : 'development', DEBUG: true}}))
    .pipe(isDist ? through() : plumber())
    .pipe(replace('{path-to-root}', '.'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('md', function() {
  var tasks = [];
  tasks.push(gulp.src('README.md')
    .pipe(changed('dist'))
    .pipe(isDist ? through() : plumber())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload()));
  tasks.push(gulp.src('classes/**/*.md')
    .pipe(changed('dist/classes'))
    .pipe(isDist ? through() : plumber())
    .pipe(gulp.dest('dist/classes'))
    .pipe(connect.reload()));
  return merge(tasks);
});

gulp.task('css', function() {
  return gulp.src('styles/main.styl')
    .pipe(changed('dist/build'))
    .pipe(isDist ? through() : plumber())
    .pipe(stylus({
      // Allow CSS to be imported from node_modules and bower_components
      'include css': true,
      'paths': ['./node_modules', './bower_components']
    }))
    .pipe(autoprefixer('last 2 versions', { map: false }))
    .pipe(isDist ? csso() : through())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('css-classes', function() {
  var destination = 'dist/styles/classes';
  return gulp.src(['styles/classes/**/*.css'])
    .pipe(changed(destination))
    .pipe(gulp.dest(destination))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(changed('dist/images'))
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('attachments', function() {
  return gulp.src('attachments/**/*')
    .pipe(changed('dist/attachments'))
    .pipe(gulp.dest('dist/attachments'))
    .pipe(connect.reload());
});

gulp.task('favicon', function() {
  var destination = 'dist/favicon';
  return gulp.src('favicon/**/*')
    .pipe(changed(destination))
    .pipe(gulp.dest(destination))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  return del('dist');
});

function getFolders(cwd, dir) {
  var targetDirectory = path.join(cwd, dir);
  return fs.readdirSync(targetDirectory)
    .filter(function(file) {
      return fs.statSync(path.join(targetDirectory, file)).isDirectory();
    })
    .map(function(filePath) {
      return path.join(dir, filePath);
    });
}

gulp.task('build', ['js', 'html', 'md', 'css', 'css-classes', 'images',
  'attachments', 'favicon'], function() {
    var folders = getFolders('.', 'classes')
      .concat(getFolders('.', 'assignments')),
      tasks = folders.map(function(folder) {
        var t = [];
        t.push(gulp.src(['html/index.html'])
          .pipe(preprocess({context: { NODE_ENV: isDist ?
            'production' : 'development', DEBUG: true}}))
          .pipe(replace('{path-to-root}', '../..'))
          .pipe(gulp.dest(path.join('dist', folder))));
        t.push(gulp.src([
          'node_modules/bespoke-math/node_modules/katex-build/fonts/**/*'
        ]).pipe(gulp.dest(path.join('dist', folder, 'fonts'))));
        return merge(t);
      });
    return merge(tasks);
  }
);

gulp.task('deploy', function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log }, done);
});

gulp.task('dev', ['watch', 'build'], function(done) {
  const port = 8082;
  connect.server({
    root: ['dist'],
    port: port,
    livereload: true
  });

  opn(`http://localhost:${port}`, done);
});

gulp.task('watch', function() {
  gulp.watch('html/**/*.html', ['html']);
  gulp.watch('classes/**/*.md', ['md']);
  gulp.watch('assignments/**/*.md', ['md']);
  gulp.watch('README.md', ['md']);
  gulp.watch('styles/**/*.styl', ['css']);
  gulp.watch('styles/classes/*.css', ['css-classes']);
  gulp.watch('images/**/*', ['images']);
  gulp.watch(['scripts/**/*.js', 'scripts/**/*.js.es6'], ['js']);
});
