QrCodeGenerator = React.createClass({

  componentDidMount(){
    $('#qr-code').qrcode({
      size: 300,
      text: "http://www.uc.edu"
    });
  },

  render(){

    return (
      <div id="qr-code"></div>
    );
  }
});

QrScanner = React.createClass({
  render() {
    return (
      <div id="qr-code-scanner-wrapper">
        <button className="btn btn-primary" id="qr-code-scanner">Scan Code</button>
      </div>
    );
  }
});
