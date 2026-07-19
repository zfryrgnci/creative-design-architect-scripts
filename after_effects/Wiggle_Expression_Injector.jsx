// Wiggle_Expression_Injector.jsx
// Injects a procedural wiggle expression into the Position and Rotation
// properties of all selected layers to instantly add organic movement.

{
    app.beginUndoGroup("Wiggle Injector");
    
    var comp = app.project.activeItem;
    if (comp == null || !(comp instanceof CompItem)) {
        alert("Please open a composition.");
    } else {
        var sel = comp.selectedLayers;
        if (sel.length === 0) {
            alert("Select layers to add organic wiggle to.");
        } else {
            var freq = prompt("Wiggle Frequency (times per second):", "2");
            var ampPos = prompt("Position Amplitude (pixels):", "30");
            var ampRot = prompt("Rotation Amplitude (degrees):", "5");
            
            if (freq && ampPos && ampRot) {
                var expPos = "wiggle(" + freq + ", " + ampPos + ");";
                var expRot = "wiggle(" + freq + ", " + ampRot + ");";
                
                for (var i = 0; i < sel.length; i++) {
                    var layer = sel[i];
                    if (layer.property("Position").canSetExpression) {
                        layer.property("Position").expression = expPos;
                    }
                    if (layer.property("Rotation").canSetExpression) {
                        layer.property("Rotation").expression = expRot;
                    }
                }
                alert("Wiggle injected successfully!");
            }
        }
    }
    
    app.endUndoGroup();
}
