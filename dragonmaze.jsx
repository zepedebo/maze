if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Meteor.startup(function () {
      // Use Meteor.startup to render the component after the page is ready
      React.render(<Maze />, document.getElementById("maze"));
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
