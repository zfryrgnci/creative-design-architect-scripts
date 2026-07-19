// Smart_Export_Assets.jsx
// Exports all visible layers in a Photoshop document to multiple resolutions
// (1x, 2x, 3x) for UI/UX app development.

#target photoshop

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }
    
    var doc = app.activeDocument;
    var outputFolder = Folder.selectDialog("Select destination for UI assets:");
    if (!outputFolder) return;
    
    var originalRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    
    var layers = doc.layers;
    var exportedCount = 0;
    
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.visible && layer.kind !== LayerKind.GROUP) {
            // Hide all other layers
            hideAllLayers(doc);
            layer.visible = true;
            
            // Trim transparent pixels
            doc.trim(TrimType.TRANSPARENT, true, true, true, true);
            
            // Export scales
            var scales = [
                { suffix: "@1x", multiplier: 1 },
                { suffix: "@2x", multiplier: 2 },
                { suffix: "@3x", multiplier: 3 }
            ];
            
            var originalWidth = doc.width;
            var originalHeight = doc.height;
            
            for (var s = 0; s < scales.length; s++) {
                doc.resizeImage(originalWidth * scales[s].multiplier, originalHeight * scales[s].multiplier, null, ResampleMethod.BICUBICSHARPER);
                
                var saveFile = new File(outputFolder + "/" + layer.name + scales[s].suffix + ".png");
                var pngOpts = new PNGSaveOptions();
                pngOpts.compression = 9;
                doc.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE);
                
                // Revert size
                doc.resizeImage(originalWidth, originalHeight, null, ResampleMethod.BICUBICSHARPER);
            }
            
            app.activeDocument.activeHistoryState = app.activeDocument.historyStates[app.activeDocument.historyStates.length - 1 - (scales.length * 2) - 1]; // Undo trim
            exportedCount++;
        }
    }
    
    app.preferences.rulerUnits = originalRulerUnits;
    alert("Exported " + exportedCount + " layers at 1x, 2x, and 3x scales!");
}

function hideAllLayers(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        doc.layers[i].visible = false;
    }
}

main();
