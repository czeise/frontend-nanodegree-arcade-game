var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  css_src: ['css/style.css'],
  css_docs: 'docs/css',
  js_src: ['js/*.js'],
  js_docs: 'docs/js',
  images_src: ['images/*.png'],
  images_docs: 'docs/images',
  content: 'index.html',
  docs: 'docs'
};

gulp.task('clean-css', function() {
  gulp.src(paths.css_src)
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(paths.css_docs));
});

gulp.task('minify-html', function() {
  gulp.src(paths.content)
    .pipe(plugins.minifyHtml({
      empty: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.docs));
});

gulp.task('minify-js', function() {
  gulp.src(paths.js_src)
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.js_docs));
});

gulp.task('prep-images', function() {
  gulp.src(paths.images_src)
    .pipe(gulp.dest(paths.images_docs));
});

gulp.task('watch', function() {
  gulp.watch(paths.css_src, ['clean-css']);
  gulp.watch(paths.content, ['minify-html']);
  gulp.watch(paths.js_src, ['minify-js']);
  gulp.watch(paths.images_src, ['prep-images']);
});

gulp.task('default', ['clean-css', 'minify-html', 'minify-js', 'prep-images',
  'watch'
]);
