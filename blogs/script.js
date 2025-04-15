document.getElementById("mobile-toggle").addEventListener("click", function () {
  document
    .getElementById("navbar")
    .querySelector("ul")
    .classList.toggle("show");
});

// Social share links

document.addEventListener("DOMContentLoaded", function () {
  // Grab current URL and page title
  const url = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  // Optional: custom share text
  const tweetText = encodeURIComponent("🔥 Leadership read worth sharing");
  const emailSubject = encodeURIComponent(
    "Thought you'd like this post by Paul Takisaki"
  );
  const emailBody = encodeURIComponent(
    `Check this out: ${window.location.href}`
  );

  /* 
    Inject dynamic share links into the share-links container
    This enables the blog to auto-populate sharing buttons
  */
  const shareHTML = `
    <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener">
      <i class="fab fa-facebook-f"></i>
    </a>
    <a href="https://twitter.com/intent/tweet?url=${url}&text=${tweetText}" target="_blank" rel="noopener">
      <i class="fab fa-twitter"></i>
    </a>
    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${pageTitle}" target="_blank" rel="noopener">
      <i class="fab fa-linkedin-in"></i>
    </a>
    <a href="mailto:?subject=${emailSubject}&body=${emailBody}">
      <i class="fas fa-envelope"></i>
    </a>
  `;

  // Add to DOM
  const container = document.getElementById("share-links");
  if (container) container.innerHTML = shareHTML;
});
