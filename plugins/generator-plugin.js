module.exports = function(generator) {

  var u = generator.util;
  var opts = generator.opts;
  var hb = generator.handlebars;

  // you know, the big bleeding photo at the top...
  hb.registerHelper('title-style', function(frame) {
    var src = this.image ||
      opts.defaultImage ||
      '/images/default.jpg';

    return bgImageStyle(src);
  });

  hb.registerHelper('style', function(frame) {
    return bgImageStyle(this['background-image']);
  });

  function bgImageStyle(src) {
    if (src) {
      return 'style=\'background-image:url("' +
        hb.fixPath(src) + '");\'';
    }
  }

  hb.registerHelper('navIcon', function(frame) {

    return hb.defaultFragmentHtml('/#navicon',
      '_!arrow-circle-o-down fw lg_',
      '<span class="icon">=</span>',
      frame);
  });

  hb.registerHelper('docTitle', function(frame) {
    var title = opts.docTitle || opts.pkgName || 'pub-server';
    var subTitle = opts.docSubTitle || '';

    return hb.defaultFragmentHtml('/#doctitle',
      '# [' + title + '](/)\n' + subTitle,
      '<h1><a href="/">' + u.escape(title) + '</a></h1>' + subTitle,
      frame);
  });

  hb.registerHelper('topMenu', function(frame) {
    var url = opts.github || hb.githubUrl();

    return hb.defaultFragmentHtml('/#topmenu',
      url ? '- [_!github 2x fw_](' + url + ' "github")' : '',
      url ? '<ul><li><a href="' + url + '">github</a></li></ul>' : '',
      frame);
  });

}
