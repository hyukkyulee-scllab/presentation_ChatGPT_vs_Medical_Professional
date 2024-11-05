// Initialize Reveal.js
Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,
    width: 900,
    height: 500,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0,
    transition: 'slide',
    keyboard: {
        13: 'next', // Enter
        32: 'next', // Space
        37: 'prev', // Left arrow
        38: 'up',   // Up arrow
        39: 'next', // Right arrow
        40: 'down'  // Down arrow
    },
    fragmentIncoming: 'fade-in',
    fragmentOutgoing: 'fade-out'
});

// Initialize timeline animations
Reveal.addEventListener('slidechanged', function(event) {
    const timeline = event.currentSlide.querySelector('.timeline');
    if (timeline) {
        const items = timeline.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300); // Stagger the animations
        });
    }

    // Results chart
    const resultsChart = event.currentSlide.querySelector('#resultsChart');
    if (resultsChart) {
        const ctx = resultsChart.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ChatGPT 선호도', 'ChatGPT v.4.0 선호도', '의료 전문가 선호도'],
                datasets: [{
                    label: '선호도 (%)',
                    data: [75.9, 58.7, 24.1],
                    backgroundColor: [
                        'rgba(100, 181, 246, 0.8)',
                        'rgba(13, 71, 161, 0.8)',
                        'rgba(26, 35, 126, 0.8)'
                    ],
                    borderColor: [
                        'rgba(100, 181, 246, 1)',
                        'rgba(13, 71, 161, 1)',
                        'rgba(26, 35, 126, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            color: '#ffffff',
                            font: {
                                size: 12,
                                weight: 'light'
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
                            font: {
                                size: 12,
                                weight: 'light'
                            },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Response length chart
    const responseLengthChart = event.currentSlide.querySelector('#responseLengthChart');
    if (responseLengthChart) {
        const ctx = responseLengthChart.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['의료 전문가', 'ChatGPT 3.5', 'ChatGPT 4.0'],
                datasets: [{
                    data: [127, 270, 293],
                    backgroundColor: [
                        'rgba(26, 35, 126, 0.8)',
                        'rgba(100, 181, 246, 0.8)',
                        'rgba(13, 71, 161, 0.8)'
                    ],
                    borderColor: [
                        'rgba(26, 35, 126, 1)',
                        'rgba(100, 181, 246, 1)',
                        'rgba(13, 71, 161, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: 12,
                                weight: 'light'
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + ' 단어';
                            }
                        }
                    }
                }
            }
        });
    }
});

// Add smooth scrolling to example containers
document.querySelectorAll('.example-container').forEach(container => {
    container.addEventListener('wheel', (e) => {
        if (container.scrollHeight > container.clientHeight) {
            e.stopPropagation();
        }
    });
});

// Initialize timeline animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Timeline hover effects
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = index % 2 === 0 ? 'translateX(5px)' : 'translateX(-5px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Add hover effects for interactive elements
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px)';
            item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });

    // Add hover effects to model items
    document.querySelectorAll('.model-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
});

// Ensure proper scaling of content
window.addEventListener('resize', () => {
    const scale = Math.min(
        window.innerWidth / 900,
        window.innerHeight / 500
    );
    document.documentElement.style.fontSize = `${scale * 16}px`;
});
