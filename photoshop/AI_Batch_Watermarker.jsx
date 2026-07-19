// AI_Batch_Watermarker.jsx
// A smart Photoshop script that loops through a directory,
// intelligently scales a watermark based on image dimensions,
// places it in the optimal corner (bottom-right), and saves for web.

#target photoshop

function main() {
    var inputFolder = Folder.selectDialog("Select the folder with images to watermark:");
    if (!inputFolder) return;
    
    var watermarkFile = File.openDialog("Select your watermark file (PNG/PSD):");
    if (!watermarkFile) return;
    
    var outputFolder = Folder.selectDialog("Select the output folder:");
    if (!outputFolder) return;

    var files = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|psd)$/i);
    var originalRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;

    for (var i = 0; i < files.length; i++) {
        var doc = app.open(files[i]);
        
        // Place watermark
        placeWatermark(watermarkFile);
        var watermarkLayer = doc.activeLayer;
        
        // Scale watermark (10% of document width)
        var targetWidth = doc.width * 0.1;
        var bounds = watermarkLayer.bounds;
        var currentWidth = bounds[2] - bounds[0];
        var scaleRatio = (targetWidth / currentWidth) * 100;
        watermarkLayer.resize(scaleRatio, scaleRatio, AnchorPosition.TOPLEFT);
        
        // Position watermark (Bottom Right with 5% padding)
        var paddingX = doc.width * 0.05;
        var paddingY = doc.height * 0.05;
        
        var wBounds = watermarkLayer.bounds;
        var wWidth = wBounds[2] - wBounds[0];
        var wHeight = wBounds[3] - wBounds[1];
        
        var targetX = doc.width - wWidth - paddingX;
        var targetY = doc.height - wHeight - paddingY;
        
        watermarkLayer.translate(targetX - wBounds[0], targetY - wBounds[1]);
        
        // Export
        var saveFile = new File(outputFolder + "/" + doc.name.replace(/\.[^\.]+$/, '') + "_watermarked.jpg");
        var sfwOptions = new ExportOptionsSaveForWeb();
        sfwOptions.format = SaveDocumentType.JPEG;
        sfwOptions.quality = 80;
        doc.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);
        
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
    
    app.preferences.rulerUnits = originalRulerUnits;
    alert("Batch Watermarking Complete! Processed " + files.length + " files.");
}

function placeWatermark(file) {
    var idPlc = charIDToTypeID( "Plc " );
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    desc.putPath( idnull, new File( file ) );
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc.putEnumerated( idFTcs, idQCSt, idQcsa );
    executeAction( idPlc, desc, DialogModes.NO );
}

main();
