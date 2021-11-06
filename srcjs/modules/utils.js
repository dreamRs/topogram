export function removeElement(elementId) {
  var element = document.getElementById(elementId);
  if (element !== null)
    element.parentNode.removeChild(element);
}

export function setLabs(elementId, enabled, options) {
  if (!enabled) {
    document.getElementById(elementId + "-title").style.display = "none";
    document.getElementById(elementId + "-subtitle").style.display = "none";
    document.getElementById(elementId + "-caption").style.display = "none";
  } else {
    if (typeof options.title === "string" || options.title instanceof String) {
      document.getElementById(elementId + "-title").innerHTML = options.title;
      document.getElementById(elementId + "-title").style.display = "block";
    } else {
      document.getElementById(elementId + "-title").style.display = "none";
    }
    if (typeof options.subtitle === "string" || options.subtitle instanceof String) {
      document.getElementById(elementId + "-subtitle").innerHTML =
        options.subtitle;
      document.getElementById(elementId + "-subtitle").style.display = "block";
    } else {
      document.getElementById(elementId + "-subtitle").style.display = "none";
    }
    if (typeof options.caption === "string" || options.caption instanceof String) {
      document.getElementById(elementId + "-caption").innerHTML =
        options.caption;
      document.getElementById(elementId + "-caption").style.display = "block";
    } else {
      document.getElementById(elementId + "-caption").style.display = "none";
    }
  }
}

export function setLegend(elementId, content) {
  document.getElementById(elementId + "-legend").innerHTML = content;
}
