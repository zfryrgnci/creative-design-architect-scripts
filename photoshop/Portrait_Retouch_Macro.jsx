// Portrait_Retouch_Macro.jsx
// Automates the complex setup for Frequency Separation
// splitting the image into Texture (High Frequency) and Color/Tone (Low Frequency) layers.

#target photoshop

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document.");
        return;
    }
    
    var doc = app.activeDocument;
    if (doc.activeLayer.isBackgroundLayer) {
        doc.activeLayer.name = "Original";
    }
    
    var baseLayer = doc.activeLayer;
    
    // Create Low Frequency Layer
    var lowFreq = baseLayer.duplicate();
    lowFreq.name = "Low Frequency (Color/Tone)";
    
    // Create High Frequency Layer
    var highFreq = baseLayer.duplicate();
    highFreq.name = "High Frequency (Texture)";
    highFreq.move(lowFreq, ElementPlacement.PLACEBEFORE);
    
    // Apply Gaussian Blur to Low Frequency
    doc.activeLayer = lowFreq;
    lowFreq.applyGaussianBlur(6.0); // Default blur radius
    
    // Apply Apply Image to High Frequency
    doc.activeLayer = highFreq;
    applyImageForFreqSeparation(lowFreq.name);
    
    // Set High Frequency Blend Mode to Linear Light
    highFreq.blendMode = BlendMode.LINEARLIGHT;
    
    // Group them
    var freqGroup = doc.layerSets.add();
    freqGroup.name = "Frequency Separation";
    highFreq.move(freqGroup, ElementPlacement.INSIDE);
    lowFreq.move(freqGroup, ElementPlacement.INSIDE);
    
    alert("Frequency Separation setup complete. Use Clone Stamp on High Freq, and Mixer Brush on Low Freq.");
}

function applyImageForFreqSeparation(sourceLayerName) {
    var idAply = charIDToTypeID( "Aply" );
    var desc = new ActionDescriptor();
    var idT = charIDToTypeID( "T   " );
    var desc2 = new ActionDescriptor();
    var idLyr = charIDToTypeID( "Lyr " );
    desc2.putString( idLyr, sourceLayerName );
    var idChnl = charIDToTypeID( "Chnl" );
    var idChnl2 = charIDToTypeID( "Chnl" );
    var idRGB = charIDToTypeID( "RGB " );
    desc2.putEnumerated( idChnl, idChnl2, idRGB );
    var idCmp = charIDToTypeID( "Cmp " );
    desc.putObject( idT, idCmp, desc2 );
    var idBlnd = charIDToTypeID( "Blnd" );
    var idBlnd2 = charIDToTypeID( "Blnd" );
    var idSbtr = charIDToTypeID( "Sbtr" ); // Subtract
    desc.putEnumerated( idBlnd, idBlnd2, idSbtr );
    var idOpct = charIDToTypeID( "Opct" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc.putUnitDouble( idOpct, idPrc, 100.000000 );
    var idScl = charIDToTypeID( "Scl " );
    desc.putDouble( idScl, 2.000000 ); // Scale 2
    var idOfst = charIDToTypeID( "Ofst" );
    desc.putInteger( idOfst, 128 ); // Offset 128
    executeAction( idAply, desc, DialogModes.NO );
}

main();
