let inputEle;
let outputEle;
let toButton;

// editor
let inputMirror;
let outputMirror;

function setup() {
  noCanvas();
  inputEle = select('#input').value(inputText.trim());
  outputEle = select('#output');
  toButton = select('#to');
  inputMirror = CodeMirror.fromTextArea(inputEle.elt, {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'dracula',
  });

  outputMirror = CodeMirror.fromTextArea(outputEle.elt, {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'dracula',
  });
  transform();
  toButton.mouseClicked(transform);
}

function transform() {
  let iv = inputMirror.getValue();
  let iva = iv.split(/\n/).map(line => `"${line.replace(/\"/g, '\\"')}"`);
  let outputText = iva.join(',\r\n');
  outputMirror.setValue(outputText);
}
