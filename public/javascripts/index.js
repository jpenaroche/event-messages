const init = () => {
  fetch("/data").then((response) => {
    response.json().then(({ data: { url, token } }) => {
      buildIframe(url);
      window.addEventListener("message", (event) => {
        const {
          data: { passTo, eventId },
        } = event;
        if (passTo === "parent" && eventId && eventId === token) {
          console.log("it enters in parent with token ", eventId);
          window.postMessage({
            eventId,
            passTo: "child",
            auth_token:
              localStorage.getItem("auth_token") || "default_jwt_token",
          });
        }
      });
    });
  });
};

const buildIframe = (url) => {
  const containerId = document.querySelector(
    'script[src="/javascripts/index.js"]'
  ).dataset.container;

  if (containerId) {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "relative";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "9999";
    iframe.style.backgroundColor = "transparent";
    iframe.style.pointerEvents = "none";
    document.getElementById(containerId).appendChild(iframe);
  }
};

init();
