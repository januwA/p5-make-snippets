let inputEle;
let outputEle;
let prefixEle;
let descriptionEle;

// editor
let inputMirror;
let outputMirror;

function setup() {
  noCanvas();
  inputEle = select("#input").value(inputText.trim());
  outputEle = select("#output");
  inputMirror = CodeMirror.fromTextArea(inputEle.elt, {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula",
  });

  outputMirror = CodeMirror.fromTextArea(outputEle.elt, {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula",
  });

  prefixEle = document.querySelector(".prefix");
  descriptionEle = document.querySelector(".description");
  prefixEle.addEventListener("input", transform);
  descriptionEle.addEventListener("input", transform);
  inputMirror.on("change", transform);
  transform();
}

function transform() {
  let iv = inputMirror.getValue().replace(/\$/g, "\\$");
  let prefix = prefixEle.value ?? "";
  let description = descriptionEle.value ?? "";
  outputMirror.setValue(
    JSON.stringify(
      {
        [description]: {
          prefix: prefix,
          body: iv.split(/\n/),
          description: description,
        },
      },
      null,
      "  "
    ).trim().replace(/^{|}$/g, '').trim()
  );
}
