function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8081/api", {
    method: "POST",
    body: JSON.stringify({
      text: formText,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) =>
    res.json().then((data) => {
      console.log(data);
      // document.getElementById("results").innerHTML = JSON.stringify(data);
      document.getElementById("data-model").innerHTML = data.model;
      document.getElementById("data-score-tag").innerHTML = data.score_tag;
      document.getElementById("data-agreement").innerHTML = data.agreement;
      document.getElementById("data-subjectivity").innerHTML =
        data.subjectivity;
      document.getElementById("data-confidence").innerHTML = data.confidence;
      document.getElementById("data-irony").innerHTML = data.irony;
    })
  );
}

export { handleSubmit };
