/*function showLoader() {
	  const loader = document.querySelector('.loader');
	  loader.hidden = false;
	}
	
	function hideLoader() {
	  const loader = document.querySelector('.loader');
	  loader.hidden = true;
	}
	
	export default { show: showLoader, hide: hideLoader };*/
	

export function showLoader(loaderElement, containerElement) {
    loaderElement.style.display = "block";
    containerElement.style.display = "none";
}

export function hideLoader(loaderElement, containerElement) {
    loaderElement.style.display = "none";
    containerElement.style.display = "grid";
}