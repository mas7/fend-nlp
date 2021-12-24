const validUrl = require("valid-url");

// Handle the form submit.
function handleSubmit(event) {
  event.preventDefault();

  const formURL = document.getElementById("formURL").value;
  const errorMessage = document.getElementById("errorMessage");
  const resultsError = document.getElementById("resultsError");

  if (validUrl.isUri(formURL)) {
    fetch("http://localhost:8081/api", {
      method: "POST",
      body: JSON.stringify({
        url: formURL,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
        if (data.status.code === "0") {
          if (resultsError.innerHTML.length > 0) {
            resultsError.innerHTML = "";
          }
          document.getElementById("data-model").innerHTML = data.model;
          document.getElementById("data-score-tag").innerHTML = data.score_tag;
          document.getElementById("data-agreement").innerHTML = data.agreement;
          document.getElementById("data-subjectivity").innerHTML =
            data.subjectivity;
          document.getElementById("data-confidence").innerHTML =
            data.confidence;
          document.getElementById("data-irony").innerHTML = data.irony;
        } else {
          resultsError.innerHTML = "Service Response: " + data.status.msg;
        }
      })
    );

    if (errorMessage.innerHTML.length > 0) {
      errorMessage.innerHTML = "";
    }
  } else {
    errorMessage.innerHTML = "Not a valid URL";
  }
}

export { handleSubmit };
