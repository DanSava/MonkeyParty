FlowRouter.route("/", {
    name:"home",
    action () {
        BlazeLayout.render('HomeLayout');
    }

});

FlowRouter.route("/test", {
    name:"test",
    action (params) {
        console.log(params);
        BlazeLayout.render('MainLayout');
    }
});
