PDFButton = React.createClass({
  createPDF() {
    let doc = new jsPDF();
    let canvas;
    let img = document.createElement('canvas');
    img.src = "qrcode.png";

    let dataURL = img.toDataURL("image/png");

    dataURL.replace("data:image/png;base64","/");
    let imgData = dataURL;

    console.log(imgData);

    doc.addImage(imgData, 'PNG', 10,10, 50,50);

    console.log("file system....");

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
      console.log(fileSystem.name);
      console.log(fileSystem.root.name);
      console.log(fileSystem.root.fullPath);

      fileSystem.root.getFile("test.pdf", {
        create: true
      }, function(entry) {
        var fileEntry = entry;
        console.log(entry);

        entry.createWriter(function(writer) {
          writer.onwrite = function(evt) {
            console.log("write success");
          };

          console.log("writing to file");
          writer.write(doc.output());
        }, function(error) {
          console.log(error);
        });

      }, function(error) {
        console.log(error);
      });
    }, function(event) {
      console.log(evt.target.error.code);
    });
  },

  render() {
    return (
      <div id="eventPDF-creator">
        <button className="btn btn-primary" id="pdf-generator" onClick={this.createPDF}>Create Check-in PDF</button>
      </div>
    );
  }
});
