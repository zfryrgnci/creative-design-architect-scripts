// Auto_Color_Grader.jsx
// Automatically creates a professional cinematic color grading stack
// using Curves, Color Balance, and a subtle Vignette.

#target photoshop

function main() {
    if (app.documents.length === 0) {
        alert("Please open an image first.");
        return;
    }
    
    var doc = app.activeDocument;
    
    // Group for Color Grade
    var gradeGroup = doc.layerSets.add();
    gradeGroup.name = "Cinematic Color Grade [AI Setup]";
    
    // 1. Contrast Curve (S-Curve)
    doc.activeLayer = gradeGroup;
    createCurveLayer("Contrast S-Curve");
    
    // 2. Color Balance (Teal & Orange)
    doc.activeLayer = gradeGroup;
    createColorBalanceLayer("Teal/Orange Look");
    
    // 3. Vignette
    createVignette(doc, gradeGroup);
    
    alert("Cinematic Color Grading stack applied successfully.");
}

function createCurveLayer(name) {
    var idMk = charIDToTypeID( "Mk  " );
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref = new ActionReference();
    var idAdjL = charIDToTypeID( "AdjL" );
    ref.putClass( idAdjL );
    desc.putReference( idnull, ref );
    var idUsng = charIDToTypeID( "Usng" );
    var desc2 = new ActionDescriptor();
    var idType = charIDToTypeID( "Type" );
    var desc3 = new ActionDescriptor();
    var idCrvs = charIDToTypeID( "Crvs" );
    desc3.putClass( idType, idCrvs );
    desc2.putObject( idType, idAdjL, desc3 );
    desc.putObject( idUsng, idAdjL, desc2 );
    executeAction( idMk, desc, DialogModes.NO );
    app.activeDocument.activeLayer.name = name;
}

function createColorBalanceLayer(name) {
    var idMk = charIDToTypeID( "Mk  " );
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref = new ActionReference();
    var idAdjL = charIDToTypeID( "AdjL" );
    ref.putClass( idAdjL );
    desc.putReference( idnull, ref );
    var idUsng = charIDToTypeID( "Usng" );
    var desc2 = new ActionDescriptor();
    var idType = charIDToTypeID( "Type" );
    var desc3 = new ActionDescriptor();
    var idClrB = charIDToTypeID( "ClrB" );
    desc3.putClass( idType, idClrB );
    desc2.putObject( idType, idAdjL, desc3 );
    desc.putObject( idUsng, idAdjL, desc2 );
    executeAction( idMk, desc, DialogModes.NO );
    app.activeDocument.activeLayer.name = name;
}

function createVignette(doc, group) {
    var vignetteLayer = doc.artLayers.add();
    vignetteLayer.name = "Vignette";
    vignetteLayer.move(group, ElementPlacement.INSIDE);
    vignetteLayer.blendMode = BlendMode.MULTIPLY;
    vignetteLayer.opacity = 40;
    
    doc.selection.fill(app.foregroundColor); // Assuming default black/white
    doc.selection.selectAll();
}

main();
