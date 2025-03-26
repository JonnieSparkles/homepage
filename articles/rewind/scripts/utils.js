// utils.js - Contains utility functions for the app

// Detects the gateway domain dynamically
function detectGatewayDomain() {
    const hostname = window.location.hostname;

    // Split the hostname into parts
    const parts = hostname.split(".");

    // Determine gateway domain (everything after the first dot)
    let gateway = parts.length > 1
        ? `${window.location.protocol}//${parts.slice(1).join(".")}`
        : window.location.origin;

    // Exception: If gateway is "ar.io", default to "arweave.net"
    if (gateway.includes("ar.io")) {
        gateway = "https://arweave.net";
    }

    return gateway;
}

// Device detection utility
function isMobileDevice() {
    // Check if device has touch AND small screen
    const hasTouchAndSmallScreen = (
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        window.innerWidth <= 768
    );
    
    // Check for common mobile user agents
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
    
    return hasTouchAndSmallScreen || isMobileUA;
}

// Replace all arweave.net links with the current gateway
function replaceArweaveLinks() {
    document.addEventListener('DOMContentLoaded', function() {
        // Get current gateway domain
        const gatewayDomain = detectGatewayDomain();
        
        // Replace arweave.net links in content
        const contentLinks = document.querySelectorAll('.markdown-preview a');
        
        contentLinks.forEach(link => {
            if (link.href.includes('arweave.net')) {
                // Replace arweave.net with current gateway
                link.href = link.href.replace('https://arweave.net', gatewayDomain);
                
                // Also replace it in the displayed text if it contains arweave.net
                if (link.textContent.includes('arweave.net')) {
                    link.textContent = link.textContent.replace('arweave.net', 
                        gatewayDomain.replace('https://', ''));
                }
            }
        });
    });
}

// Immediately invoke the replaceArweaveLinks function
replaceArweaveLinks();
