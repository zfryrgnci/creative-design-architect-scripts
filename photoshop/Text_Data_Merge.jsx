// Text_Data_Merge.jsx
// Automates the creation of multiple document variations by injecting 
// CSV data into a target text layer and saving out JPGs.

#target photoshop

function main() {
    if (app.documents.length === 0) {
        alert("Open a template document first.");
        return;
    }
    
    var doc = app.activeDocument;
    
    // Mock CSV Data (In reality, this would read from a File dialog)
    var csvData = [
        "John Doe, CEO",
        "Jane Smith, CTO",
        "Alan Turing, Lead AI Engineer",
        "Ada Lovelace, Head of Architecture"
    ];
    
    var targetLayerName = prompt("Enter the exact name of the Text Layer to replace:", "NameLayer");
    if (!targetLayerName) return;
    
    var targetLayer;
    try {
        targetLayer = doc.artLayers.getByName(targetLayerName);
    } catch(e) {
        alert("Text layer '" + targetLayerName + "' not found!");
        return;
    }
    
    if (targetLayer.kind !== LayerKind.TEXT) {
        alert("Target layer must be a Text layer.");
        return;
    }
    
    var outputFolder = Folder.selectDialog("Select Output Folder for Data Merge:");
    if (!outputFolder) return;
    
    for (var i = 0; i < csvData.length; i++) {
        var rowData = csvData[i].split(",");
        var name = rowData[0];
        var title = rowData[1];
        
        // Update Text
        targetLayer.textItem.contents = name + " - " + title;
        
        // Save JPEG
        var saveFile = new File(outputFolder + "/Badge_" + name.replace(/\s+/g, '_') + ".jpg");
        var jpegOptions = new JPEGSaveOptions();
        jpegOptions.quality = 10;
        doc.saveAs(saveFile, jpegOptions, true, Extension.LOWERCASE);
    }
    
    alert("Data merge complete! Exported " + csvData.length + " files.");
}

main();
