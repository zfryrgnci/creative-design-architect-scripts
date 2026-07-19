// Export_Marker_Data.jsx
// Exports all sequence markers to a CSV file. Useful for creating YouTube chapters
// or passing feedback to clients.

#target premierepro

function main() {
    var project = app.project;
    if (!project) return;
    
    var seq = project.activeSequence;
    if (!seq) {
        alert("Open a sequence to export markers from.");
        return;
    }
    
    var markers = seq.markers;
    if (markers.numMarkers === 0) {
        alert("No markers found.");
        return;
    }
    
    var csvContent = "Timecode,Name,Comments\\n";
    var currentMarker = markers.getFirstMarker();
    
    while (currentMarker) {
        var tc = currentMarker.start.getFormatted(seq.videoDisplayFormat, project.videoDisplayFormat);
        var name = currentMarker.name;
        var comments = currentMarker.comments;
        
        csvContent += tc + "," + name + "," + comments + "\\n";
        currentMarker = markers.getNextMarker(currentMarker);
    }
    
    var saveFile = File.saveDialog("Save Markers CSV", "*.csv");
    if (saveFile) {
        saveFile.open("w");
        saveFile.write(csvContent);
        saveFile.close();
        alert("Successfully exported markers to CSV!");
    }
}

main();
