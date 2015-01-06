(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, "\n		", HTML.DIV({
    "class": "header"
  }, "\n			", HTML.Raw('<div class="col-md-9">\n				<h2>ShortenedURL.com</h2>\n				<h4>Simple url is the best!</h4>\n				<ul class="nav nav-tabs">\n				  <li role="presentation" class="active"><a href="#">Home</a></li>\n				  <li role="presentation"><a href="#">Example</a></li>\n				  <li role="presentation"><a href="#">Term of use</a></li>\n				  <li role="presentation"><a href="#">Contact us</a></li>\n				</ul>\n			</div>'), "\n			", HTML.DIV({
    "class": "col-md-3"
  }, "\n				", Blaze._TemplateWith(function() {
    return {
      align: Spacebars.call("right")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("loginButtons"));
  }), "\n			"), "\n			", HTML.DIV({
    "class": "col-md-12"
  }, "\n				\n				", HTML.FORM({
    "class": "col-md-5"
  }, "\n				  ", HTML.DIV({
    "class": "form-group"
  }, "\n				    ", HTML.Raw("<label>Enter a long URL to make shortened</label>"), "\n				    ", HTML.TEXTAREA({
    "class": "form-control",
    rows: "1"
  }), "\n				  "), "\n				  ", HTML.Raw('<button class="btn btn-danger">Make short URL!</button>'), "\n				  ", HTML.Raw("<p>Custom your url</p>"), "\n				  ", HTML.P("http://shortenedurl.com/", HTML.TEXTAREA({
    "class": "form-control",
    rows: "1"
  })), "\n				  ", HTML.Raw("<p>May contain letters, numbers, and dashes.</p>"), "\n				"), "\n			"), "\n		"), "\n	");
}));
Meteor.startup(Template.body.renderToDocument);

})();
