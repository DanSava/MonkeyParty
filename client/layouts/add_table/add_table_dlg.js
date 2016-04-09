Template.AddTableDialog.helpers({
    tableName: function(){
        var selTable = Session.get('selectedTable');
        if (selTable) {
            return Session.get('selectedTable').tableName;
        }
        return " ";
    }
});
Template.AddTableDialog.events({
    "click #submitBtn": function(evt, tmp){
         var tableName = tmp.$('#tblNameInput').val();
         if (tableName !== '') {
             var table =  Session.get('selectedTable');
             console.log(tableName);
             table.tableName = tableName;
             Meteor.call("updateTableName", table, function(error, result){
                 if(error){
                     console.log("error", error);
                 }
                 if(result){
                     $('#addTableDlg').modal('hide');
                 }
             });
         }
    }
});
