// Magic imports to load via webpack, but no need to use in script
import "htmx.org";
import hyperscript from "hyperscript.org";
import test from "../node_modules/hyperscript.org/dist/lib/plugin/hdb.js";
import "./index.css";
import "./index.html";

window.hyperscript = hyperscript;

function component() {
    const element = document.createElement('div');

    element.innerHTML = "Hello world!"
    element.setAttribute("hx-put","/test")
    element.setAttribute(
        "_",
        `init put 'Hyperscript loaded!' into my innerHTML then
            on click alert('hi')`)
    element.setAttribute("class", "text-gray-500 underline");
    return element;
}

// document.body.appendChild(component());
