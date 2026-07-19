// Auto_Grid_Arranger.jsx
// Takes all selected items and perfectly distributes them into a grid layout
// with customizable columns and spacing.

#target illustrator

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document.");
        return;
    }
    
    var doc = app.activeDocument;
    var sel = doc.selection;
    
    if (sel.length < 2) {
        alert("Please select at least 2 items to arrange into a grid.");
        return;
    }
    
    var columnsStr = prompt("How many columns?", "4");
    if (!columnsStr) return;
    var cols = parseInt(columnsStr, 10);
    
    var spacingStr = prompt("Spacing between items (pt)?", "20");
    if (!spacingStr) return;
    var spacing = parseFloat(spacingStr);
    
    var startX = sel[0].position[0];
    var startY = sel[0].position[1];
    
    var currentX = startX;
    var currentY = startY;
    var maxHeightInRow = 0;
    
    for (var i = 0; i < sel.length; i++) {
        var item = sel[i];
        
        if (i > 0 && i % cols === 0) {
            currentX = startX;
            currentY = currentY - maxHeightInRow - spacing;
            maxHeightInRow = 0;
        }
        
        item.position = [currentX, currentY];
        
        currentX += item.width + spacing;
        if (item.height > maxHeightInRow) {
            maxHeightInRow = item.height;
        }
    }
    
    alert("Grid arrangement complete!");
}

main();
