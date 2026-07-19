// Randomize_Properties.jsx
// Adds organic randomness to the selected vectors by randomly tweaking
// their size, rotation, and opacity based on user-defined limits.

#target illustrator

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document.");
        return;
    }
    
    var doc = app.activeDocument;
    var sel = doc.selection;
    
    if (sel.length === 0) {
        alert("Select elements to randomize.");
        return;
    }
    
    var scaleRange = prompt("Scale randomness variation % (e.g., 20 means +/- 20%)", "20");
    if (!scaleRange) return;
    
    var rotationRange = prompt("Rotation randomness variation degrees (e.g., 45 means +/- 45 deg)", "45");
    if (!rotationRange) return;
    
    var opacityRange = prompt("Opacity randomness variation % (e.g., 30 means +/- 30%)", "30");
    if (!opacityRange) return;
    
    var sr = parseFloat(scaleRange);
    var rr = parseFloat(rotationRange);
    var or = parseFloat(opacityRange);
    
    for (var i = 0; i < sel.length; i++) {
        var item = sel[i];
        
        // Randomize Scale
        var randScale = 100 + ((Math.random() * sr * 2) - sr);
        item.resize(randScale, randScale, true, true, true, true, randScale);
        
        // Randomize Rotation
        var randRot = (Math.random() * rr * 2) - rr;
        item.rotate(randRot);
        
        // Randomize Opacity
        if (item.opacity !== undefined) {
            var newOp = item.opacity + ((Math.random() * or * 2) - or);
            if (newOp > 100) newOp = 100;
            if (newOp < 0) newOp = 0;
            item.opacity = newOp;
        }
    }
    
    alert("Organic randomization applied to " + sel.length + " items!");
}

main();
