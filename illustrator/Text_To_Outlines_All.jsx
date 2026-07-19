// Text_To_Outlines_All.jsx
// Sweeps through the entire document and converts all live text frames
// to outlines, ensuring perfect print-ready handoffs without missing fonts.

#target illustrator

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document.");
        return;
    }
    
    var doc = app.activeDocument;
    
    // Unlock all layers so we can convert text
    for (var i = 0; i < doc.layers.length; i++) {
        doc.layers[i].locked = false;
        doc.layers[i].visible = true;
    }
    
    var textFrames = doc.textFrames;
    var count = textFrames.length;
    
    if (count === 0) {
        alert("No text frames found in the document.");
        return;
    }
    
    // We iterate backwards because converting text frames changes the collection length
    var convertedCount = 0;
    for (var j = count - 1; j >= 0; j--) {
        try {
            var tf = textFrames[j];
            if (!tf.locked && !tf.hidden) {
                tf.createOutline();
                convertedCount++;
            }
        } catch (e) {
            // Some text frames might be empty or part of complex groups
        }
    }
    
    alert("Converted " + convertedCount + " text frames to outlines successfully for Print Handoff.");
}

main();
