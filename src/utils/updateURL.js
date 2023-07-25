export function updateURL(pageNumber) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set("page", pageNumber);
  const newURL = `${window.location.pathname}?${urlSearchParams.toString()}`;
  window.history.pushState({ path: newURL }, "", newURL);
}
