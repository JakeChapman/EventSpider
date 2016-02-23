PDFButton = React.createClass({
  createPDF() {
    let doc = new jsPDF();
    let canvas = document.createElement("CANVAS");
    let img = new Image();//document.getElementById("code");
      img.src = "/qrcode.png";

      canvas.height = img.height;
      canvas.width = img.width;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0,0);


    let dataURL = canvas.toDataURL("image/png", 0.5);

    //dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/,"data:image/jpeg;base64,/");
    let imgData = dataURL;

    console.log(imgData);
    console.log(img.height);
      console.log(img.width);
    doc.addImage(imgData, 'PNG', 0,0,150,300);

      //doc.output('datauri');
      //doc.save('/Register.pdf');
      let pdfOutput = doc.output();

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
          writer.write(pdfOutput);
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
          <img id="code" src="/qrcode.png"></img>
      </div>
    );
  }
});
