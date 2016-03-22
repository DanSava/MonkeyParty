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
              console.log('canceled');
              return false;
            },
            onApprove : function() {
              var modalInputValue = $('#modalInputValue').val();
              Session.set("formValue", modalInputValue);
              console.log(modalInputValue);
            }
          }).modal('show');
      },
      'click .browse': function () {
          console.log("click registered!");
      }
});
Template.Test.rendered = function(){
  this.$('.test').popup({
      inline   : true,
      hoverable: true,
      position : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
  });
};
