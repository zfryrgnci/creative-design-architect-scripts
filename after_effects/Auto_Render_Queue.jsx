// Auto_Render_Queue.jsx
// Adds all selected compositions in the Project panel to the Render Queue
// and automatically assigns them to a specific output folder and preset.

{
    app.beginUndoGroup("Auto Render Queue");
    
    var proj = app.project;
    var selItems = proj.selection;
    var compsToAdd = [];
    
    for (var i = 0; i < selItems.length; i++) {
        if (selItems[i] instanceof CompItem) {
            compsToAdd.push(selItems[i]);
        }
    }
    
    if (compsToAdd.length === 0) {
        alert("Please select at least one Composition in the Project panel.");
    } else {
        var outputFolder = Folder.selectDialog("Select Render Output Folder");
        if (outputFolder) {
            for (var j = 0; j < compsToAdd.length; j++) {
                var rqItem = proj.renderQueue.items.add(compsToAdd[j]);
                var omItem = rqItem.outputModule(1);
                
                // Assuming "Lossless" or "High Quality" preset exists
                try {
                    omItem.applyTemplate("Lossless");
                } catch(e) {
                    // Fallback to default
                }
                
                var outPath = new File(outputFolder.fsName + "/" + compsToAdd[j].name + ".avi");
                omItem.file = outPath;
            }
            alert("Added " + compsToAdd.length + " comps to the Render Queue.");
        }
    }
    
    app.endUndoGroup();
}
