({
    invoke : function(component, event, helper) {
        var workspaceAPI = component.find('workspace');
        var navService = component.find('navService');

        var recordId = component.get('v.recordId');
        var objectName = component.get('v.sObject');
        var mode = component.get('v.mode').toLowerCase();
        var focus = component.get('v.focus');

        // decide whether to use the workspace API or navigation API
        workspaceAPI.isConsoleNavigation().then(function(response) {
            var isConsole = response;

            if (isConsole) {
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
            } else {
                if (mode != 'edit' && mode != 'view') {
                    mode = 'view';
                }

                var pageReference = {
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: recordId,
                        objectApiName: objectName,
                        actionName: mode
                    }
                }
                navService.navigate(pageReference);
            }
        });
    }
})
