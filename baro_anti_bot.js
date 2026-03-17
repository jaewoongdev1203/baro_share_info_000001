(function() {
  // Default configuration
  const defaultConfig = {
    position: "top-left", // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    margin: "10px",
    alphaChannel: "90%"
  };

  // Merge user configuration if exists
  const config = (typeof baro_anti_bot !== 'undefined') ? {
    position: baro_anti_bot.position || defaultConfig.position,
    margin: baro_anti_bot.margin || defaultConfig.margin,
    alphaChannel: baro_anti_bot.alphaChannel || defaultConfig.alphaChannel
  } : defaultConfig;

  // Create container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.zIndex = '999999';
  container.style.opacity = config.alphaChannel;

  // Set position based on config
  const margin = config.margin;
  switch (config.position) {
    case 'top-right':
      container.style.top = margin;
      container.style.right = margin;
      break;
    case 'bottom-left':
      container.style.bottom = margin;
      container.style.left = margin;
      break;
    case 'bottom-right':
      container.style.bottom = margin;
      container.style.right = margin;
      break;
    case 'top-left':
    default:
      container.style.top = margin;
      container.style.left = margin;
      break;
  }

  // Create link
  const link = document.createElement('a');
  link.href = 'https://www.baromk.com';
  link.target = '_blank';
  link.style.display = 'block';

  // Create logo image
  const img = document.createElement('img');
  img.src = 'https://jaewoongdev1203.github.io/baro_share_info_000001/baro_logo.png';
  img.alt = 'Baro Anti Bot';
  img.style.width = '100px'; 
  img.style.height = 'auto';
  img.style.display = 'block';
  img.style.border = 'none';

  link.appendChild(img);
  container.appendChild(link);

  // Append to body
  const appendToBody = () => {
    if (document.body) {
      document.body.appendChild(container);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendToBody);
  } else {
    appendToBody();
  }
})();
