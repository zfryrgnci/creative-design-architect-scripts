// Procedural_Glitch_Generator.jsx
// Automatically generates a "Cyberpunk Glitch" composition setup by creating
// adjustment layers, applying fractal noise, and wiring a displacement map.

{
    app.beginUndoGroup("Procedural Glitch Generator");
    
    var comp = app.project.activeItem;
    if (comp == null || !(comp instanceof CompItem)) {
        alert("Please open a composition first.");
    } else {
        // Create Glitch Map Comp
        var glitchMap = app.project.items.addComp("Glitch_Map_Source", comp.width, comp.height, comp.pixelAspect, comp.duration, comp.frameRate);
        var solid = glitchMap.layers.addSolid([1,1,1], "Noise", comp.width, comp.height, comp.pixelAspect);
        
        // Add Fractal Noise
        var noiseFX = solid.Effects.addProperty("ADBE Fractal Noise");
        noiseFX.property("Noise Type").setValue(2); // Block
        noiseFX.property("Contrast").setValue(400);
        noiseFX.property("Complexity").setValue(3);
        noiseFX.property("Transform").property("Uniform Scaling").setValue(0);
        noiseFX.property("Transform").property("Scale Width").setValue(3000);
        noiseFX.property("Transform").property("Scale Height").setValue(50);
        noiseFX.property("Evolution").expression = "time * 1500";
        
        // Add Map to Main Comp
        var mapLayer = comp.layers.add(glitchMap);
        mapLayer.enabled = false; // Hide it
        
        // Create Adjustment Layer
        var adjLayer = comp.layers.addSolid([1,1,1], "Glitch Displacement", comp.width, comp.height, comp.pixelAspect);
        adjLayer.adjustmentLayer = true;
        
        // Add Displacement Map
        var dispFX = adjLayer.Effects.addProperty("ADBE Displacement Map");
        dispFX.property("Displacement Map Layer").setValue(mapLayer.index);
        dispFX.property("Use For Horizontal Displacement").setValue(1); // Red
        dispFX.property("Max Horizontal Displacement").setValue(150);
        dispFX.property("Use For Vertical Displacement").setValue(2); // Green
        dispFX.property("Max Vertical Displacement").setValue(0);
        dispFX.property("Edge Behavior").setValue(2); // Wrap
        
        alert("Glitch rig created successfully! Tweak 'Max Horizontal Displacement' to animate.");
    }
    
    app.endUndoGroup();
}
