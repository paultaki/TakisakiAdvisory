document.addEventListener('DOMContentLoaded', function() {
  // Data for the rotating value props
  const valueProps = [
    {
      text: "Transform strategic thinking with <span class='relative inline-block text-accent'><span>pattern recognition</span><span class='absolute bottom-0 left-0 w-full h-px bg-accent/30'></span></span>",
      stat: "19×",
      label: "client acquisition increase"
    },
    {
      text: "Build resilient teams through <span class='relative inline-block text-accent'><span>system engineering</span><span class='absolute bottom-0 left-0 w-full h-px bg-accent/30'></span></span>",
      stat: "72%",
      label: "higher launch success"
    },
    {
      text: "Lead with authentic <span class='relative inline-block text-accent'><span>quiet power</span><span class='absolute bottom-0 left-0 w-full h-px bg-accent/30'></span></span> that inspires",
      stat: "50%",
      label: "reduction in customer churn"
    }
  ];
  
  // Get the DOM elements
  const valuePropElement = document.getElementById('valueProp');
  const statNumberElement = document.getElementById('statNumber');
  const statLabelElement = document.getElementById('statLabel');
  const statDisplayElement = document.getElementById('statDisplay');
  
  if (!valuePropElement || !statNumberElement) {
    console.error('Required elements not found in the DOM');
    return;
  }
  
  let currentIndex = 0;
  
  // Function to update the content
  function updateContent() {
    // Start fade out animation
    valuePropElement.classList.remove('opacity-100');
    valuePropElement.classList.add('opacity-0');
    
    statDisplayElement.classList.remove('opacity-100');
    statDisplayElement.classList.add('opacity-0');
    
    // Wait for fade out to complete
    setTimeout(() => {
      // Update the next index
      currentIndex = (currentIndex + 1) % valueProps.length;
      
      // Update content
      valuePropElement.innerHTML = "A meticulously engineered system for strategic outliers based on " + 
                                  valueProps[currentIndex].text + 
                                  ".";
      
      statNumberElement.textContent = valueProps[currentIndex].stat;
      statLabelElement.textContent = valueProps[currentIndex].label;
      
      // Start fade in animation
      valuePropElement.classList.remove('opacity-0');
      valuePropElement.classList.add('opacity-100');
      
      statDisplayElement.classList.remove('opacity-0');
      statDisplayElement.classList.add('opacity-100');
    }, 500); // Match this with the CSS transition duration
  }
  
  // Set interval for rotation (every 4 seconds)
  setInterval(updateContent, 4000);
});