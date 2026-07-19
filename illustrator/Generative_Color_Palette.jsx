// Generative_Color_Palette.jsx
// Analyzes the primary color of the selected path and automatically generates
// analogous and complementary color swatches in the Illustrator document.

#target illustrator

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document.");
        return;
    }
    
    var doc = app.activeDocument;
    if (doc.selection.length === 0) {
        alert("Please select a path item with a fill color to base the palette on.");
        return;
    }
    
    var selectedItem = doc.selection[0];
    if (selectedItem.typename !== "PathItem" || !selectedItem.filled) {
        alert("Please select a filled path item.");
        return;
    }
    
    var baseColor = selectedItem.fillColor;
    if (baseColor.typename !== "RGBColor") {
        alert("This script currently supports RGB color mode documents.");
        return;
    }
    
    // Generate Analogous Colors (+30 deg, -30 deg)
    var hsl = rgbToHsl(baseColor.red, baseColor.green, baseColor.blue);
    
    var an1Hsl = [(hsl[0] + 30) % 360, hsl[1], hsl[2]];
    var an2Hsl = [(hsl[0] - 30 + 360) % 360, hsl[1], hsl[2]];
    var compHsl = [(hsl[0] + 180) % 360, hsl[1], hsl[2]];
    
    var an1Rgb = hslToRgb(an1Hsl[0], an1Hsl[1], an1Hsl[2]);
    var an2Rgb = hslToRgb(an2Hsl[0], an2Hsl[1], an2Hsl[2]);
    var compRgb = hslToRgb(compHsl[0], compHsl[1], compHsl[2]);
    
    addSwatch("Gen: Base", baseColor.red, baseColor.green, baseColor.blue);
    addSwatch("Gen: Analogous 1", an1Rgb[0], an1Rgb[1], an1Rgb[2]);
    addSwatch("Gen: Analogous 2", an2Rgb[0], an2Rgb[1], an2Rgb[2]);
    addSwatch("Gen: Complementary", compRgb[0], compRgb[1], compRgb[2]);
    
    alert("Generative Color Palette created! Check your Swatches panel.");
}

function addSwatch(name, r, g, b) {
    var doc = app.activeDocument;
    var newColor = new RGBColor();
    newColor.red = r;
    newColor.green = g;
    newColor.blue = b;
    
    var newSwatch = doc.swatches.add();
    newSwatch.name = name;
    newSwatch.color = newColor;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0; 
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s, l];
}

function hslToRgb(h, s, l) {
    var r, g, b;
    h /= 360;
    if (s === 0) {
        r = g = b = l; 
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

main();
