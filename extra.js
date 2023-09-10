document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  
  document.onkeydown = function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'i') { 
      alert('This function is disabled');
      return false;
  }
  };
  
  setInterval(function() {
    debugger;
  }, 1000);
  
  function scrollToTop() {
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight; // Get the height of the header
  
    window.scrollTo({
      top: headerHeight,
      behavior: "smooth"
    });
  }