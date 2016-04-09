Template.Test.helpers({
  formValue: function () {
    return Session.get("formValue");
  }
});

Template.Test.events({
    'click .openModal': function () {
        $('#modalView')
          .modal({
            onDeny    : function(){
              return false;
            },
            onApprove : function() {
              var modalInputValue = $('#modalInputValue').val();
              Session.set("formValue", modalInputValue);
            }
          }).modal('show');
      },
      'click .cashmere': function () {
          console.log("click registered!");
      }
});
Template.Test.rendered = function(){
  this.$('.test').popup({
      inline   : true,
      hoverable: true,
      position : 'top left',
      delay: {
        show: 300,
        hide: 800
      }
  });
  this.$('.ui.embed').embed();
};
