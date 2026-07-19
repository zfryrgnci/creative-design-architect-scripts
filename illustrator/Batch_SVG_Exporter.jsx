// Batch_SVG_Exporter.jsx
// Exports every artboard in the document as an individual SVG file.
// Perfect for icon libraries and UI component exports.

#target illustrator

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document.");
        return;
    }
    
    var doc = app.activeDocument;
    var outputFolder = Folder.selectDialog("Select Output Folder for SVGs");
    if (!outputFolder) return;
    
    var prefix = prompt("Enter a prefix for the files (e.g., 'icon_'):", "export_");
    if (prefix === null) return;
    
    var numArtboards = doc.artboards.length;
    var exportedCount = 0;
    
    for (var i = 0; i < numArtboards; i++) {
        var artboard = doc.artboards[i];
        doc.artboards.setActiveArtboardIndex(i);
        
        var artboardName = artboard.name;
        if (artboardName.indexOf("Artboard") !== -1) {
            artboardName = i + 1; // Fallback if unnamed
        }
        
        var file = new File(outputFolder + "/" + prefix + artboardName + ".svg");
        
        var exportOptions = new ExportOptionsSVG();
        exportOptions.embedRasterImages = true;
        exportOptions.embedAllFonts = false;
        exportOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
        
        // Setup artboard range string (e.g. "1")
        var type = ExportType.SVG;
        
        // Since ExportOptionsSVG doesn't have artboard range, we use Document.exportFile with save multiple artboards
        // Actually, Document.exportFile doesn't support saveMultipleArtboards for SVG in standard DOM.
        // We will just use SaveOptions
        
        var saveOpts = new ExportOptionsSVG();
        saveOpts.saveMultipleArtboards = true;
        saveOpts.artboardRange = (i + 1).toString();
        
        doc.exportFile(file, ExportType.SVG, saveOpts);
        exportedCount++;
    }
    
    alert("Exported " + exportedCount + " artboards as SVGs successfully.");
}

main();
