({
    invoke : function(component, event, helper) {
        var workspaceAPI = component.find("workspace");
        var recordId = component.get('v.recordId');
        var focus = component.get('v.focus');

        workspaceAPI.openTab({
            recordId: recordId,
            focus: focus
        }).then(function(response) {
            workspaceAPI.getTabInfo({
                tabId: response
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
})