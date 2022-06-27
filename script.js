chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  let fetchRes = fetch(
    `https://phishing-url-detection-backend.herokuapp.com/api/?url=${url}/`
  );
  const resultData = document.getElementById("result");

  fetchRes
    .then((res) => res.json())
    .then((d) => {
      var result = `
      <p>URL: <b id="url-name">${d.url}</b></p>
      <p>Predicted Result: <b id="predicted-result">${
        d.predictionMade === 0 ? "Legitimate" : "Phishing"
      }</b></p>
      <p>Legitimate Rate: <b id="legitimate-rate">${d.successRate}</b>%</p>
      <p>Phishing Rate: <b id="phishing-rate">${d.phishRate}</b>%</p>
    `;
      resultData.innerHTML = result;
    });
});
