const devClientId = 'f0e5577313a549cd9d74313715bcae5e';
const prodClientId = 'd71d679e1ffe4043a78c27d2681a3327';
const documentUrl = 'https://firebasestorage.googleapis.com/v0/b/rei-imagining-loyalty.appspot.com/o/Documents%2F' + fileName + '?alt=media';

document.title = documentName;
document.addEventListener("adobe_dc_view_sdk.ready", function () {
  var adobeDCView = new AdobeDC.View({clientId: devClientId, divId: "adobe-dc-view"});
  adobeDCView.previewFile({
      content: {
        location: {url: documentUrl}
      },
      metaData: {fileName: documentName}
    },
    {
      showDownloadPDF: false,
      showPageControls: true,
      showAnnotationTools: false
    });
});
