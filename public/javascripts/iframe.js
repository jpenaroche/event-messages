const token = "basic_token";

window.parent.postMessage({
  passTo: "parent",
  eventId: token,
});

window.parent.addEventListener("message", (event) => {
  const {
    data: { passTo, auth_token, eventId },
  } = event;
  if (passTo === "child" && eventId && eventId === token) {
    console.log("it enters in iframe with auth token", auth_token);
  }
});
