var dir = new Folder('/Users/arein/Code/dereks.angels.dao/artwork')
var files = dir.getFiles("template.psd");

var intentions = new File("/Users/arein/Code/dereks.angels.dao/artwork/intentions.csv");
intentions.encoding = 'UTF8';
intentions.open("r");
var fileContentsString = intentions.read();
intentions.close();
var lines = fileContentsString.split("\n");

for (var i = 0; i < files.length; i++) {
    var doc = app.open(files[i]);
    var currentLayer;

    for (var j= 0; j < doc.artLayers.length; j++) {
        var lyr = doc.artLayers[j];

        if (lyr.kind == LayerKind.TEXT) {
            var lyr = doc.artLayers[j];
            currentLayer = lyr;
        }
    }

    for (var j = 0; j < lines.length; j++) {
        var line = lines[j];
        var word = line.split(",")[0];

        if (word === '') continue;
        
        currentLayer.textItem.contents = currentLayer.textItem.contents.replace("Love", word);
        var pngFile = new File("/Users/arein/Code/dereks.angels.dao/artwork/output/" + word + ".png");
        var sfw = new ExportOptionsSaveForWeb();
        sfw.format = SaveDocumentType.PNG;
        sfw.PNG8 = false; // use PNG-24
        sfw.transparency = true;   

        doc.exportDocument(pngFile, ExportType.SAVEFORWEB, sfw);
        currentLayer.textItem.contents = currentLayer.textItem.contents.replace(word, "Love");
    }
    doc.close(SaveOptions.DONOTSAVECHANGES);
}