import "@styles/style.css";

async function getComponent() {
  const element = document.createElement("div");

  // element.innerHTML = _.join(["Hello", "webpack2"], " ");
  element.innerHTML = "Hello webpack2";
  // element.onclick = Print.bind(null, "Hello webpack!");

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
