UI.registerHelper("visibility", function () {
  var currentRoute = Iron.Location.get().path;
  if (currentRoute && currentRoute === '/') {
    return 'hidden';
  } else {
    return 'visible';
  }
});