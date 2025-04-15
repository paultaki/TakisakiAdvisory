document.getElementById("mobile-toggle").addEventListener("click", function () {
  document
    .getElementById("navbar")
    .querySelector("ul")
    .classList.toggle("show");
});
document.addEventListener("DOMContentLoaded", function () {
  const url = encodeURIComponent(window.location.href);
  const shareHTML = `
      <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com/intent/tweet?url=${url}&text=Check%20this%20out!" target="_blank" rel="noopener">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://www.linkedin.com/shareArticle?mini=true&url=${url}" target="_blank" rel="noopener">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a href="mailto:?subject=You%20should%20read%20this&body=${url}">
        <i class="fas fa-envelope"></i>
      </a>
    `;
  document.getElementById("share-links").innerHTML = shareHTML;
});
