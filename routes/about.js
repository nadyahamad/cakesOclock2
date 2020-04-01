/*
 * GET about us page.
 */

exports.about = function(req, res){
  res.render('/about', { page_title: 'about' });

};

