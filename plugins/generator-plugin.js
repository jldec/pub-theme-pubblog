module.exports = function(generator) {

  var u = generator.util;
  var opts = generator.opts;
  var log = opts.log;
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
      '_!arrow-circle-o-down fw 2x_',
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

  hb.registerHelper('permaLink', function(frame) {
    return this.permalink_full ?
    '<a class="permalink_full" href="' + hb.relPath() + this._href + '" title="Link to this post.">' + opts.appUrl + this._href + '</a>' :
    '<a class="permalink" href="' + hb.relPath() + this._href + '" title="Link to this post.">&#xf0c1;</a>';
  });

  // block helper over posts
  hb.registerHelper('eachPost', function(frame) {
    return u.map(posts(), frame.fn).join('');
  })

  function posts() {
    return u(generator.contentPages).reject(function(page) {
      return page.multipage;
    }).sortBy(function(page) {
      return page.date || ' '; // sort non-dated entries after
    }).reverse().value();
  }

  // block helper applies headers for values with pattern meta-<name>: <value>
  hb.registerHelper('eachMetaSemi', function(frame) {
    var metakeys = u.filter(u.keys(this), function(key) { return /^meta-/.test(key); });
    return u.map(u.pick(this, metakeys), function(val, key) {
      return frame.fn({ name:key.slice(5).replace(/;/g,':'), content:val }); }).join('');
  });

  // block helper applies headers for values with pattern metap-<property>: <value>
  hb.registerHelper('eachMetaProp', function(frame) {
    var metakeys = u.filter(u.keys(this), function(key) { return /^metap-/.test(key); });
    return u.map(u.pick(this, metakeys), function(val, key) {
      return frame.fn({ property:key.slice(6).replace(/;/g,':'), content:val }); }).join('');
  });

}
