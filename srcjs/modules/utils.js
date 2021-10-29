export function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

export function setLabs(elementId, enabled, options) {
  if (!enabled) {
    removeElement(elementId + "-title");
    removeElement(elementId + "-subtitle");
    removeElement(elementId + "-caption");
  } else {
    if (options.title !== null) {
      document.getElementById(elementId + "-title").innerHTML = options.title;
    } else {
      removeElement(elementId + "-title");
    }
    if (options.subtitle !== null) {
      document.getElementById(elementId + "-subtitle").innerHTML =
        options.subtitle;
    } else {
      removeElement(elementId + "-subtitle");
    }
    if (options.caption !== null) {
      document.getElementById(elementId + "-caption").innerHTML =
        options.caption;
    } else {
      removeElement(elementId + "-caption");
    }
  }
}

