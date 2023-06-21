document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('fileInput');
    var openFileButton = document.getElementById('openFileButton');
    var sendRequestButton = document.getElementById('sendRequestButton');
    var selectedFileName = document.getElementById('selectedFileName');
    var resultTable = document.getElementById('resultTable');
  
    openFileButton.addEventListener('click', function() {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', function() {
      var file = this.files[0];
      if (file) {
        sendRequestButton.disabled = false;
        selectedFileName.textContent = 'Fichier sélectionné : ' + file.name;
      }
    });
  
    sendRequestButton.addEventListener('click', function() {
      var file = fileInput.files[0];
      if (file) {
        var url = 'https://mazuproject2023cv-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/e3c4ed53-3a0b-4544-b101-2a186aeaa6bd/classify/iterations/Iteration2/image';
        var predictionKey = '314f3cd135f2435eac5e5011897c4669';
  
        var formData = new FormData();
        formData.append('image', file);
  
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Prediction-Key', predictionKey);
        request.onload = function() {
          if (request.status === 200) {
            var response = JSON.parse(request.responseText);
            displayProbabilities(response.predictions);
          }
        };
        request.send(formData);
      }
    });
  
    function displayProbabilities(predictions) {
      resultTable.innerHTML = '';
  
      var headerRow = document.createElement('tr');
      var headerCell1 = document.createElement('th');
      headerCell1.textContent = 'Tag Name';
      var headerCell2 = document.createElement('th');
      headerCell2.textContent = 'Probability';
      headerRow.appendChild(headerCell1);
      headerRow.appendChild(headerCell2);
      resultTable.appendChild(headerRow);
  
      for (var i = 0; i < predictions.length; i++) {
        var row = document.createElement('tr');
  
        var tagNameCell = document.createElement('td');
        tagNameCell.textContent = predictions[i].tagName;
        row.appendChild(tagNameCell);
  
        var probabilityCell = document.createElement('td');
        probabilityCell.textContent = predictions[i].probability.toFixed(6);
        row.appendChild(probabilityCell);
  
        resultTable.appendChild(row);
      }
    }
  });
  