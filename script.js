// Music player functionality
let musicPlaying = false;
let audioLoaded = false;

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const button = document.getElementById('musicButton');
    const status = document.getElementById('musicStatus');
    
    if (!audio) {
        console.error('Audio element not found');
        status.textContent = 'Audio element missing';
        return;
    }
    
    // Set volume to maximum for better audibility
    audio.volume = 1.0;
    
    // Check if audio is loaded
    if (audio.readyState === 0) {
        console.log('Audio file not loaded yet. Loading now...');
        status.textContent = 'Loading...';
        audio.load();
    }
    
    const musicIcon = button.querySelector('.music-icon');
    
    if (musicPlaying) {
        audio.pause();
        musicIcon.classList.remove('playing');
        musicPlaying = false;
        status.textContent = 'Paused';
    } else {
        // Ensure volume is set before playing
        audio.volume = 1.0;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicIcon.classList.add('playing');
                musicPlaying = true;
                audioLoaded = true;
                status.textContent = 'Playing...';
                console.log('Music playing successfully');
            }).catch(error => {
                console.error('Error playing audio:', error);
                musicIcon.classList.remove('playing');
                status.textContent = 'Error: ' + error.message;
                alert('Cannot play music.\n\nCommon issues:\n1. File permissions (file:// URL)\n2. Browser autoplay policy\n3. Audio format not supported\n\nTry: Open via file explorer → right-click index.html → Open with Chrome');
            });
        }
    }
}

// Audio will be loaded in the main window load event

// Create realistic fireflies with wings
function createFireflies() {
    const starsContainer = document.getElementById('stars');
    const numFireflies = 12;

    for (let i = 0; i < numFireflies; i++) {
        const fireflyContainer = document.createElement('div');
        fireflyContainer.className = 'firefly-container';
        
        // Firefly body (glowing part)
        const fireflyBody = document.createElement('div');
        fireflyBody.className = 'firefly-body';
        
        // Firefly wings (two wings)
        const wing1 = document.createElement('div');
        wing1.className = 'firefly-wing wing-left';
        
        const wing2 = document.createElement('div');
        wing2.className = 'firefly-wing wing-right';
        
        fireflyContainer.appendChild(wing1);
        fireflyContainer.appendChild(wing2);
        fireflyContainer.appendChild(fireflyBody);
        
        // Random starting position
        fireflyContainer.style.left = Math.random() * 100 + '%';
        fireflyContainer.style.top = Math.random() * 100 + '%';
        fireflyContainer.style.animationDelay = Math.random() * 20 + 's';
        fireflyContainer.style.animationDuration = (Math.random() * 20 + 25) + 's';
        
        starsContainer.appendChild(fireflyContainer);
        
        // Add individual glow animation
        fireflyBody.style.animationDelay = Math.random() * 2 + 's';
    }
}

// Fireworks function with romantic messages
function createFireworks() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworkColors = [
        '#ff6b9d', '#ffa5d8', '#ffb3e6', '#ffc2d6', '#ffd1e8',
        '#ffa5c8', '#ff8cc8', '#ffb5d8', '#d98ba3', '#ffccd5',
        '#ff9ec8', '#ffbdd4', '#ffd1e6'
    ];

    // Personal appreciation messages - genuine and heartfelt
    const messages = [
        "Happiest Birthday Cutes!",
        "Your laughter carries light, it changes the energy around you.",
        "You are allowed to take your time to heal, to choose yourself, and to grow.",
        "You are enough, even when you feel like you're not doing enough.",
        "I'm grateful for every version of you that trusted me with a little part of her heart.",
        "I see the woman you're becoming, more powerful, wise, and soft.",
        "You have the rare ability to make ordinary moments feel special.",
        "I wish for your heart to find peace in places that once brought pain.",
        "You are magic, not because of how you look, but because of how you make people feel.",
        "I hope you never doubt your worth again, it's infinite.",
        "You've made me understand love beyond words, beyond mistakes.",
        "You are deserving of a love that never makes you question your value.",
        "I'm proud of your journey, even the parts I wasn't there for.",
        "You are my reminder that love isn't perfect, but it can still be pure.",
        "May this new year of your life bring you calm mornings and fearless nights.",
        "No matter where life takes us, a part of my heart will always wish you peace, happiness, and love.",
        "Thank you for everything my cutest kid, adu will always be proud of you!"
    ];

    const particles = []; // Main firework particles
    const messageElements = [];
    let animationId;
    let fireworkCount = 0;

    // New: for a minimal and feminine twinkling starfield background
    const starParticles = [];
    const numStars = 150;
    const starColors = ['rgba(255, 192, 203, 0.8)', 'rgba(255, 240, 245, 0.7)', 'rgba(255, 182, 193, 0.6)'];
    for (let i = 0; i < numStars; i++) {
        starParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5, // Tiny stars
            color: starColors[Math.floor(Math.random() * starColors.length)],
            // For twinkling effect
            opacity: Math.random() * 0.5 + 0.2,
            opacityDirection: Math.random() > 0.5 ? 0.005 : -0.005, // How fast it twinkles
            minOpacity: 0.1,
            maxOpacity: Math.random() * 0.6 + 0.2
        });
    }

    // New: for a space theme with planets and comets
    const planetParticles = [];
    const numPlanets = 3;
    const planetColors = ['rgba(173, 216, 230, 0.05)', 'rgba(255, 200, 220, 0.04)', 'rgba(216, 191, 216, 0.06)'];
    for (let i = 0; i < numPlanets; i++) {
        planetParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 150 + 100, // Very large, soft planets
            color: planetColors[i % planetColors.length],
            vx: (Math.random() - 0.5) * 0.05, // Extremely slow drift
            vy: (Math.random() - 0.5) * 0.05
        });
    }

    const cometParticles = [];
    function createComet() {
        if (cometParticles.length < 3) { // Limit number of comets on screen
            cometParticles.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 6 + 3, // Fast diagonal speed
                vy: Math.random() * 4 + 4,
                size: Math.random() * 1.5 + 1,
                color: 'rgba(255, 255, 224, 0.7)',
                life: 100 // Lifetime in frames
            });
        }
    }
    setInterval(createComet, 3000); // Create a new comet every 3 seconds

    // Create multiple fireworks - one for each message
    const numFireworks = messages.length; // Show all messages
    
    function createFirework(fireworkIndex) {
        // Use center-upper area for better visibility
        const startX = canvas.width / 2 + (Math.random() - 0.5) * (canvas.width * 0.3);
        const startY = canvas.height * 0.3 + (Math.random() - 0.5) * (canvas.height * 0.15); // Slightly higher


        // Launch rocket
        let rocketY = canvas.height;
        const rocketSpeed = 5; // Increased speed for faster launch
        const targetY = startY;
        
        function launchRocket() {
            if (rocketY > targetY) {
                // The main animate() loop will handle clearing the canvas.
                // We just draw the rocket here.
                const trailLength = canvas.height - rocketY;
                for (let t = 0; t < trailLength; t += 3) {
                    const trailY = canvas.height - t;
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255, ${200 - t * 0.5}, ${100 - t * 0.3}, ${1 - t / trailLength * 0.7})`;
                    ctx.arc(startX + (Math.random() - 0.5) * 2, trailY, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Draw rocket with orange/yellow tip
                ctx.beginPath();
                ctx.fillStyle = '#ffffff';
                ctx.arc(startX, rocketY, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = '#ffa500';
                ctx.arc(startX, rocketY - 3, 1, 0, Math.PI * 2);
                ctx.fill();
                
                rocketY -= rocketSpeed;
                requestAnimationFrame(launchRocket);
            } else {
                // Explode (but only show message, no particles)
                explode(startX, targetY, fireworkIndex);
            }
        }

        function explode(x, y, msgIndex) {
            // Create message element - ensure it stays on screen
            const messageDiv = document.createElement('div');
            messageDiv.className = 'firework-message';
            messageDiv.textContent = messages[msgIndex];
            messageDiv.style.position = 'fixed';
            
            // Ensure message stays within screen bounds
            const maxWidth = Math.min(600, window.innerWidth * 0.75); // Max width, responsive
            const padding = 40;
            
            // Calculate safe X position (ensure it doesn't go off screen)
            let safeX = x;
            if (safeX < padding + maxWidth / 2) {
                safeX = padding + maxWidth / 2;
            } else if (safeX > window.innerWidth - padding - maxWidth / 2) {
                safeX = window.innerWidth - padding - maxWidth / 2;
            }
            
            // Calculate safe Y position (ensure it doesn't go off screen)
            let safeY = y;
            const estimatedHeight = messages[msgIndex].length > 80 ? 120 : 80; // Estimate based on length
            if (safeY < padding + estimatedHeight / 2) {
                safeY = padding + estimatedHeight / 2;
            } else if (safeY > window.innerHeight - padding - estimatedHeight / 2) {
                safeY = window.innerHeight - padding - estimatedHeight / 2;
            }
            
            messageDiv.style.left = safeX + 'px';
            messageDiv.style.top = safeY + 'px';
            messageDiv.style.transform = 'translate(-50%, -50%)';
            messageDiv.style.opacity = '0';
            messageDiv.style.fontSize = 'clamp(1.2rem, 3vw, 2rem)';
            messageDiv.style.fontWeight = '600';
            messageDiv.style.color = '#ffa5d8';
            messageDiv.style.maxWidth = maxWidth + 'px';
            messageDiv.style.textAlign = 'center';
            messageDiv.style.padding = '0';
            messageDiv.style.background = 'transparent';
            messageDiv.style.borderRadius = '0';
            messageDiv.style.pointerEvents = 'none';
            messageDiv.style.zIndex = '10000';
            messageDiv.style.transition = 'all 0.6s ease-out';
            messageDiv.style.wordWrap = 'break-word';
            messageDiv.style.lineHeight = '1.6';
            messageDiv.style.boxShadow = 'none';
            messageDiv.style.textShadow = 'none';
            document.body.appendChild(messageDiv);

            // Animate message appearance
            setTimeout(() => {
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translate(-50%, -50%) scale(1.05)';
            }, 150);

            // Remove message after reading (faster timing)
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                messageDiv.style.transform = 'translate(-50%, -50%) scale(0.9)';
                setTimeout(() => {
                    messageDiv.remove();
                }, 600);
            }, 4000); // Message stays visible for 4 seconds
        }

        launchRocket();
    }

    function animate() {
        // Clear canvas with a slightly stronger fade to prevent dull imprints
        ctx.fillStyle = 'rgba(20, 20, 30, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the moon
        ctx.save();
        ctx.beginPath();
        // Main moon circle
        ctx.arc(canvas.width - 100, 100, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 245, 230, 0.8)';
        ctx.shadowColor = 'rgba(255, 245, 230, 0.5)';
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(canvas.width - 90, 95, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Update and draw distant planets
        for (let i = planetParticles.length - 1; i >= 0; i--) {
            const p = planetParticles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Reset if it drifts too far
            if (p.x > canvas.width + p.size || p.x < -p.size || p.y > canvas.height + p.size || p.y < -p.size) {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        }

        // Update and draw comets
        for (let i = cometParticles.length - 1; i >= 0; i--) {
            const p = cometParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            // Draw trail
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 10, p.y - p.vy * 10);
            ctx.strokeStyle = p.color.replace(/[\d.]+\)$/g, `${(p.life / 100) * 0.3})`);
            ctx.lineWidth = p.size;
            ctx.stroke();
            ctx.restore();

            if (p.life <= 0) {
                cometParticles.splice(i, 1);
            }
        }

        // Update and draw twinkling starfield background
        for (let i = starParticles.length - 1; i >= 0; i--) {
            const p = starParticles[i];

            // Twinkle effect by changing opacity
            p.opacity += p.opacityDirection;
            if (p.opacity > p.maxOpacity || p.opacity < p.minOpacity) {
                p.opacityDirection *= -1;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            // Use the calculated twinkling opacity
            ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, `${p.opacity})`);
            ctx.shadowBlur = p.size * 2; // Add a soft glow
            ctx.shadowColor = p.color.replace(/[\d.]+\)$/g, `${p.opacity * 0.5})`);
            ctx.fill();
            ctx.restore();
        }
        
        // The animation loop continues as long as there are stars.
        // The rocket has its own animation frame request.
        if (starParticles.length > 0 || planetParticles.length > 0 || cometParticles.length > 0) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // Launch fireworks sequentially - faster timing for better experience
    // Each message displays for 4 seconds + 0.6s fade = 4.6s total per message
    // Wait 5 seconds between each for faster rhythm
    for (let f = 0; f < numFireworks; f++) {
        setTimeout(() => {
            createFirework(f);
            if (f === 0) {
                animate();
            }
        }, f * 5000); // 5 seconds between each firework - faster rhythm
    }
    
    // Stop animation after all fireworks
    setTimeout(() => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Remove blur effect and return to normal
            document.body.classList.remove('celebration-mode');
        }, 3000);
    }, numFireworks * 5000 + 5000); // Adjusted for faster timing
}

// Celebration function
function celebrate() {
    // Add blur effect to entire page
    document.body.classList.add('celebration-mode');
    
    // Start the music automatically if not already playing
    if (!musicPlaying) {
        const audio = document.getElementById('backgroundMusic');
        const button = document.getElementById('musicButton');
        const status = document.getElementById('musicStatus');
        
        if (audio) {
            // Set volume to maximum before playing
            audio.volume = 1.0;
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    const musicIcon = button.querySelector('.music-icon');
                    if (musicIcon) musicIcon.classList.add('playing');
                    musicPlaying = true;
                    audioLoaded = true;
                    status.textContent = 'Playing...';
                    console.log('Music started with celebration!');
                }).catch(error => {
                    console.error('Could not auto-play music:', error);
                    alert('Music couldn\'t start automatically due to browser policy. Please use the 🎵 button to play it!');
                });
            }
        }
    }
    
    // Trigger fireworks
    createFireworks();

    // Play celebration animation
    const birthdayIcon = document.querySelector('.birthday-icon');
    birthdayIcon.style.animation = 'none';
    setTimeout(() => {
        birthdayIcon.style.animation = 'bounce 0.5s ease';
    }, 10);
}

// Countdown timer
function updateCountdown() {
    // Set countdown to Manya's birthday: November 1st
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextBirthday = new Date(currentYear, 10, 1); // Month 10 = November
    
    // If birthday has already passed this year, set it for next year
    if (now > nextBirthday) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const diff = nextBirthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease-in, transform 1s ease-in';
        observer.observe(section);
    });

    // Observe memory cards for staggered animation
    document.querySelectorAll('.memory-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        cardObserver.observe(card);
    });
}

// Enhanced parallax and scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for stars background
    const stars = document.querySelector('.stars');
    if (stars) {
        stars.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Hero section fade and blur effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        // Calculate scroll percentage for hero section
        const heroScrollPercent = Math.min(scrolled / (windowHeight * 0.5), 1);
        
        // Apply parallax effect to hero content
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        // Add blur and fade when scrolling past hero
        if (scrolled > windowHeight * 0.2) {
            hero.classList.add('scrolled');
        } else {
            hero.classList.remove('scrolled');
        }
        
        // Smooth opacity transition
        const opacity = 1 - (heroScrollPercent * 0.7);
        hero.style.opacity = opacity;
    }
    
    // Parallax effect for floating hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        const speed = (index % 2 === 0 ? 0.3 : 0.5);
        heart.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = windowHeight - 150;
        
        if (sectionTop < sectionVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Video tab switching functionality
function switchVideo(index) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTabs = document.querySelectorAll('.video-tab');
    
    if (!videoPlayer) return;
    
    // Get video source from the clicked tab
    const clickedTab = videoTabs[index];
    const videoSrc = clickedTab.getAttribute('data-video');
    
    // Update active tab
    videoTabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Save current time and volume if needed
    const wasPlaying = !videoPlayer.paused;
    const currentTime = videoPlayer.currentTime;
    const currentVolume = videoPlayer.volume;
    
    // Load new video
    videoPlayer.src = videoSrc;
    videoPlayer.load();
    
    // Set volume to maximum or keep user's volume if higher
    videoPlayer.volume = Math.max(currentVolume, 1.0);
    
    // Auto-play if the previous video was playing
    if (wasPlaying) {
        videoPlayer.play().catch(error => {
            console.log('Auto-play prevented:', error);
        });
    }
}

// Fullscreen slideshow functionality
let currentVideoIndex = 0;
let isSlideshowActive = false;
const videoSources = ['/videos/1.mp4', '/videos/2.mp4', '/videos/3.mp4'];

function startFullscreenSlideshow() {
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    const fullscreenPlayer = document.getElementById('fullscreenVideoPlayer');
    const regularPlayer = document.getElementById('videoPlayer');
    
    if (!fullscreenContainer || !fullscreenPlayer) return;
    
    // Reset to first video
    currentVideoIndex = 0;
    isSlideshowActive = true;
    
    // Hide the regular player's controls during slideshow
    if (regularPlayer) {
        regularPlayer.pause();
    }
    
    // Show fullscreen container
    fullscreenContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Request fullscreen
    if (fullscreenContainer.requestFullscreen) {
        fullscreenContainer.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    } else if (fullscreenContainer.webkitRequestFullscreen) {
        fullscreenContainer.webkitRequestFullscreen();
    } else if (fullscreenContainer.msRequestFullscreen) {
        fullscreenContainer.msRequestFullscreen();
    }
    
    // Start playing first video
    playNextVideo();
    
    // Handle video end event
    fullscreenPlayer.addEventListener('ended', handleVideoEnd);
    
    // Handle fullscreen exit
    document.addEventListener('fullscreenchange', handleFullscreenExit);
    document.addEventListener('webkitfullscreenchange', handleFullscreenExit);
    document.addEventListener('msfullscreenchange', handleFullscreenExit);
}

function playNextVideo() {
    const fullscreenPlayer = document.getElementById('fullscreenVideoPlayer');
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    const videoWrapper = fullscreenContainer?.querySelector('.video-wrapper');
    
    if (!fullscreenPlayer || !isSlideshowActive) return;
    
    if (currentVideoIndex >= videoSources.length) {
        // All videos played, exit slideshow
        exitFullscreenSlideshow();
        return;
    }
    
    // Load and play current video
    fullscreenPlayer.src = videoSources[currentVideoIndex];
    fullscreenPlayer.volume = 1.0;
    fullscreenPlayer.load();
    
    const playPromise = fullscreenPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Auto-play prevented:', error);
            // Try to play manually or show controls
            fullscreenPlayer.controls = true;
        });
    }
}

function handleVideoEnd() {
    // Move to next video
    currentVideoIndex++;
    if (isSlideshowActive) {
        // Small delay before next video
        setTimeout(() => {
            playNextVideo();
        }, 500);
    }
}

function handleFullscreenExit() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        exitFullscreenSlideshow();
    }
}

function exitFullscreenSlideshow() {
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    const fullscreenPlayer = document.getElementById('fullscreenVideoPlayer');
    
    if (!fullscreenContainer) return;
    
    isSlideshowActive = false;
    
    // Exit fullscreen
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    // Hide container
    fullscreenContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Stop video
    if (fullscreenPlayer) {
        fullscreenPlayer.pause();
        fullscreenPlayer.src = '';
        fullscreenPlayer.removeEventListener('ended', handleVideoEnd);
    }
    
    // Remove event listeners
    document.removeEventListener('fullscreenchange', handleFullscreenExit);
    document.removeEventListener('webkitfullscreenchange', handleFullscreenExit);
    document.removeEventListener('msfullscreenchange', handleFullscreenExit);
    
    // Reset index
    currentVideoIndex = 0;
}

// Allow clicking on fullscreen container to exit
document.addEventListener('DOMContentLoaded', function() {
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    if (fullscreenContainer) {
        fullscreenContainer.addEventListener('click', function(e) {
            // Only exit if clicking on the container itself, not the video
            if (e.target === fullscreenContainer) {
                exitFullscreenSlideshow();
            }
        });
        
        // Allow escape key to exit
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isSlideshowActive) {
                exitFullscreenSlideshow();
            }
        });
    }
});

// Initialize everything when page loads
window.addEventListener('load', () => {
    createFireflies();
    updateCountdown();
    setupScrollAnimations();
    
    // Initialize video player with volume
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.volume = 1.0;
    }
    
    // Load audio and set volume
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        // Set audio volume to maximum (1.0) for better audibility
        audio.volume = 1.0;
        audio.load();
        console.log('Audio element ready');
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Update confetti canvas on resize
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function openMemoryStory(storyId) {
    const modal = document.getElementById('memoryModal');
    const container = document.getElementById('slideshowContainer');
    
    currentStory = stories[storyId];
    currentSlideIndex = 0;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create slides
    currentStory.slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide' + (index === 0 ? ' active' : '');
        
        let content = `<div class="slide-content">
            <h2 class="slide-title">${slide.title}</h2>
            <p class="slide-text">${slide.text}</p>`;
        
        // Add image if it exists
        if (slide.image) {
            content += `<img src="${slide.image}" class="slide-image" alt="${slide.title}" onerror="this.style.display='none'">`;
        }
        
        content += '</div>';
        slideDiv.innerHTML = content;
        container.appendChild(slideDiv);
    });
    
    // Update counter
    updateSlideCounter();
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMemoryStory() {
    const modal = document.getElementById('memoryModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    if (!currentStory) return;
    
    const slides = document.querySelectorAll('.slide');
    slides[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    } else if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    
    slides[currentSlideIndex].classList.add('active');
    updateSlideCounter();
}

function updateSlideCounter() {
    const counter = document.getElementById('slideCounter');
    if (counter && currentStory) {
        counter.textContent = `${currentSlideIndex + 1} / ${currentStory.slides.length}`;
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const memoryModal = document.getElementById('memoryModal');
    const surpriseModal = document.getElementById('surpriseModal');
    const flashcardsModal = document.getElementById('flashcardsModal');
    
    if (event.target === memoryModal) {
        // This modal is no longer used
    }
    if (event.target === surpriseModal) {
        closeSurpriseBox();
    }
    if (event.target === flashcardsModal) {
        closeFlashcards();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('memoryModal');
    if (modal && modal.classList.contains('show')) {
        // This modal is no longer used
    }
    
    // Keyboard navigation for flashcards
    const flashcardsModal = document.getElementById('flashcardsModal');
    if (flashcardsModal && flashcardsModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeFlashcards();
        } else if (e.key === 'ArrowLeft') {
            previousFlashcard();
        } else if (e.key === 'ArrowRight') {
            nextFlashcard();
        }
    }
    
    // Keyboard navigation for surprise modal
    const surpriseModal = document.getElementById('surpriseModal');
    if (surpriseModal && surpriseModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeSurpriseBox();
        }
    }
});

// Surprise Box Data
const surpriseBoxData = {
    'first-date': {
        image: '/images/our-first-date.jpg',
        text: 'The day we met still feels like a quiet memory that glows differently in my heart. I didn\'t know then that a random plan would turn into something so meaningful.',
        flashcards: [
            'Your smile that day, I still remember it like the first light after a long night. Maybe that\'s where everything truly began, with a moment that felt both ordinary and unforgettable.',
            'I can still picture that day! the colors, the laughter, the nervous pauses. Two people who barely knew each other, yet something already felt familiar. It wasn\'t just a meet, it was the beginning of a story I didn\'t know would change me. If I could relive a day, it would be that one, just to feel that spark again.',
            'We didn\'t know what we were stepping into that day, just two people meeting without expectations. You looked beautiful, not just because of how you looked, but because of the energy you carried. I remember being quiet sometimes, just looking at you, thinking how easy it felt to be around you. I didn\'t say it then, but I knew something about you would stay with me for a long time.'
        ]
    },
    'adventure': {
        image: '/images/adventure-together.jpg',
        text: 'Every adventure with you felt like time paused, like the world allowed us a few days just to breathe and be us.',
        flashcards: [
            'Bir was where it all began- my birthday, the mountains, the wind, the peace in your presence, and you beside me. You made that day more than just another birthday, you made it mine in a way that felt alive and unforgettable. The laughter, the little moments, the way you looked at me mid-journey, it all felt like a dream I never wanted to end.',
            'Then came Rishikesh, a trip that carried both peace and weight. We could feel something shifting, like we were holding on tighter because our hearts already knew change was coming. It wasn\'t easy, but even in that silence, there was love. Even in the distance, there was effort. That trip taught me that love isn\'t always about forever, sometimes it\'s about giving your best even when the end is near.',
            'Both trips, one full of beginnings, one full of lessons, will always stay close to me. They remind me that we didn\'t just travel to places, we travelled through emotions, through growth, through each other\'s worlds.'
        ]
    },
    'laughing': {
        image: '/images/laughing-together.jpg',
        text: 'If there\'s one thing that could silence every worry between us, it was laughter and slight humour. The kind that came out of nowhere- silly, loud, sometimes over the dumbest things like JUST BECAUSE but it always felt real.',
        flashcards: [
            'I still remember how your face changed when you laughed, eyes half closed, that small pause before you caught your breath again. Those moments made everything feel lighter, even when life wasn\'t.',
            'We had our share of fights and silence, but laughter always found its way back to us. It was our language, our way of saying we\'re okay without words.',
            'No matter where life takes us, those moments of uncontrollable laughter will always stay with me. They remind me that beyond everything- love, pain and confusion, we were two people who genuinely enjoyed being together.'
        ]
    },
    'special': {
        image: '/images/special-moments.jpg',
        text: 'Some moments don\'t need pictures. They live in the heart, quietly replaying when everything else fades. The way you\'d look at me mid-conversation, the way your voice softened when you were half asleep, those little smiles when we caught each other\'s eyes, they\'re all etched in my memory.',
        flashcards: [
            {
                text: 'It wasn\'t always about grand gestures or perfect plans. It was about sitting together doing nothing, and still feeling like everything was right. About the small texts that made the day better, the hugs that said what words couldn\'t, and the silences that felt like peace, not distance.'
            },
            {
                text: 'Those moments: raw, simple, and real, became the heartbeat of our story. They made me realise that love isn\'t built on time, but on the moments that make you feel truly seen. Wherever life flows from here, I\'ll always carry those moments as quiet reminders of what it felt like to love deeply and honestly.'
            },
            {
                text: 'If I still have to capture a special moment in a picture, then it will be this one.',
                image: '/images/special-moments.jpg'
            }
        ]
    }
};

let currentFlashcardIndex = 0;
let currentFlashcards = [];

// Open surprise box
function openSurpriseBox(boxId) {
    const box = event.currentTarget;
    const data = surpriseBoxData[boxId];
    
    if (!data) return;
    
    // Add opening animation
    box.classList.add('opening');
    
    // Open modal after animation
    setTimeout(() => {
        const modal = document.getElementById('surpriseModal');
        const image = document.getElementById('surpriseImage');
        const imageContainer = document.getElementById('surpriseImageContainer');
        const text = document.getElementById('surpriseText');
        
        // For special moments box, hide image and show only text
        if (boxId === 'special') {
            imageContainer.style.display = 'none';
            text.textContent = data.text;
            text.style.cursor = 'pointer';
            currentFlashcards = data.flashcards;
            text.onclick = openFlashcards;
            
            // Add hint text on the text itself
            let hint = text.querySelector('.click-hint-flashcard');
            if (!hint) {
                hint = document.createElement('p');
                hint.className = 'click-hint-flashcard';
                hint.textContent = '✨ Click to see more memories ✨';
                hint.style.cssText = 'text-align: center; color: #ffa5d8; font-style: italic; margin-top: 15px; font-size: 0.9rem; opacity: 0.8;';
                text.appendChild(hint);
            }
        } else {
            // For other boxes, show image normally
            imageContainer.style.display = 'block';
            image.src = data.image;
            image.alt = boxId;
            text.textContent = data.text;
            text.style.cursor = 'default';
            text.onclick = null;
            
            // Store flashcard data if available
            if (data.flashcards) {
                image.style.cursor = 'pointer';
                currentFlashcards = data.flashcards;
                image.onclick = openFlashcards;
                // Add hint text
                const hint = document.createElement('p');
                hint.className = 'click-hint-flashcard';
                hint.textContent = '✨ Click on the image to see more memories ✨';
                hint.style.cssText = 'text-align: center; color: #ffa5d8; font-style: italic; margin-top: 15px; font-size: 0.9rem; opacity: 0.8;';
                if (!imageContainer.querySelector('.click-hint-flashcard')) {
                    imageContainer.appendChild(hint);
                }
            } else {
                image.style.cursor = 'default';
                image.onclick = null;
                currentFlashcards = [];
                // Remove hint if exists
                const hint = imageContainer.querySelector('.click-hint-flashcard');
                if (hint) hint.remove();
            }
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Reset box animation
        setTimeout(() => {
            box.classList.remove('opening');
        }, 100);
    }, 300);
}

// Close surprise box
function closeSurpriseBox() {
    const modal = document.getElementById('surpriseModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset all boxes
    document.querySelectorAll('.surprise-box').forEach(box => {
        box.classList.remove('opening');
    });
    
    // Clean up hints from both image container and text
    const imageContainer = document.getElementById('surpriseImageContainer');
    const text = document.getElementById('surpriseText');
    const hintInContainer = imageContainer?.querySelector('.click-hint-flashcard');
    const hintInText = text?.querySelector('.click-hint-flashcard');
    if (hintInContainer) hintInContainer.remove();
    if (hintInText) hintInText.remove();
    
    // Reset image container display
    if (imageContainer) {
        imageContainer.style.display = 'block';
    }
}

// Open flashcards
function openFlashcards() {
    if (currentFlashcards.length === 0) return;
    
    const flashcardsModal = document.getElementById('flashcardsModal');
    const container = document.getElementById('flashcardsContainer');
    
    // Clear previous flashcards
    container.innerHTML = '';
    
    // Create flashcards
    currentFlashcards.forEach((flashcardData, index) => {
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard' + (index === 0 ? ' active' : '');
        
        // Handle both string (legacy) and object (new format with optional image) formats
        let flashcardText = '';
        let flashcardImage = null;
        
        if (typeof flashcardData === 'string') {
            flashcardText = flashcardData;
        } else if (typeof flashcardData === 'object' && flashcardData.text) {
            flashcardText = flashcardData.text;
            flashcardImage = flashcardData.image || null;
        }
        
        let innerHTML = `<div class="flashcard-text">${flashcardText}</div>`;
        
        // Add image if provided
        if (flashcardImage) {
            innerHTML += `<img src="${flashcardImage}" class="flashcard-image" alt="Special moment" onerror="this.style.display='none'">`;
        }
        
        flashcard.innerHTML = innerHTML;
        container.appendChild(flashcard);
    });
    
    currentFlashcardIndex = 0;
    updateFlashcardCounter();
    
    // Close surprise modal and open flashcards
    closeSurpriseBox();
    setTimeout(() => {
        flashcardsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 300);
}

// Close flashcards
function closeFlashcards() {
    const modal = document.getElementById('flashcardsModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentFlashcards = [];
}

// Navigate flashcards
function nextFlashcard() {
    const flashcards = document.querySelectorAll('.flashcard');
    if (flashcards.length === 0) return;
    
    flashcards[currentFlashcardIndex].classList.remove('active');
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    flashcards[currentFlashcardIndex].classList.add('active');
    updateFlashcardCounter();
}

function previousFlashcard() {
    const flashcards = document.querySelectorAll('.flashcard');
    if (flashcards.length === 0) return;
    
    flashcards[currentFlashcardIndex].classList.remove('active');
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    flashcards[currentFlashcardIndex].classList.add('active');
    updateFlashcardCounter();
}

function updateFlashcardCounter() {
    const counter = document.getElementById('flashcardCounter');
    const flashcards = document.querySelectorAll('.flashcard');
    if (counter && flashcards.length > 0) {
        counter.textContent = `${currentFlashcardIndex + 1} / ${flashcards.length}`;
    }
}

// Final Message Functionality
function showFinalMessage() {
    const modal = document.getElementById('finalMessageModal');
    const finalAudio = document.getElementById('finalMessageMusic');
    const messageText = document.getElementById('finalMessageText');
    
    const message = "As my final act of love, I would shed the skin of who I've been, and bloom into a stranger made only of sacrifice. Not a name, not a face, just feeling. So deeply unrecognizable, even to your softest memory. I would vanish into a shape that holds you without arms, sings for you without a voice, loves you without needing to be loved back. And if we were to meet again, in some other silence, you might not know me, but you would feel the echo of someone who once chose to disappear just to keep you whole.";
    
    messageText.innerHTML = message.split('. ').join('.<br><br>');
    
    // Play the dedicated song
    if (finalAudio) {
        finalAudio.volume = 1.0; // Set initial volume to 100%
        finalAudio.currentTime = 0;
        finalAudio.play().catch(e => console.error("Final message audio could not play:", e));
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Hide after a delay
    setTimeout(() => {
        hideFinalMessage();
    }, 32000); // Message shown for 32 seconds

    // Allow clicking anywhere to close
    modal.onclick = () => hideFinalMessage();
}

function hideFinalMessage() {
    const modal = document.getElementById('finalMessageModal');
    const finalAudio = document.getElementById('finalMessageMusic');
    
    if (modal.classList.contains('show')) {
        modal.classList.add('hiding');
        
        // Fade out the audio with the visual fade
        if (finalAudio && !finalAudio.paused) {
            let currentVolume = finalAudio.volume;
            const fadeOutInterval = setInterval(() => {
                currentVolume -= 0.05;
                if (currentVolume > 0) {
                    finalAudio.volume = currentVolume;
                } else {
                    clearInterval(fadeOutInterval);
                    finalAudio.pause();
                    finalAudio.currentTime = 0;
                }
            }, 200); // Fade out over 4 seconds (200ms * 20 steps)
        }
        
        // Wait for the fade-out animation to complete before hiding the element
        setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.remove('hiding');
            document.body.style.overflow = 'auto';
        }, 4000); // This duration should match the CSS animation
    }
}
