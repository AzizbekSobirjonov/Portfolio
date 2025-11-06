        // Kengaytirilgan Particle System
        const canvas = document.getElementById('backgroundCanvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); 

        class Particle {
            constructor() {
                this.reset();
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, 
                                  ${Math.floor(Math.random() * 100 + 155)}, 
                                  ${Math.floor(Math.random() * 255)}, 
                                  ${Math.random() * 0.6 + 0.2})`;
                this.wobble = Math.random() * 2;
                this.wobbleSpeed = Math.random() * 0.05 + 0.01;
                this.angle = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.speedX + Math.sin(this.angle) * this.wobble;
                this.y += this.speedY + Math.cos(this.angle) * this.wobble;
                this.angle += this.wobbleSpeed;

                // Chegaralarni tekshirish
                if (this.x > canvas.width + this.size) this.reset();
                else if (this.x < -this.size) this.reset();
                
                if (this.y > canvas.height + this.size) this.reset();
                else if (this.y < -this.size) this.reset();
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color.replace(')', ', 0.1)').replace('rgba', 'rgba');
                ctx.fill();
            }
        }

        const particles = [];
        const particlesCount = 150;

        // Connection lines between particles
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 * (1 - distance/120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function init() {
            for (let i = 0; i < particlesCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            
            // Background with fade effect
            ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            drawConnections();
        }

        init();
        animate();

        // Skill barlarni animatsiya qilish
        document.addEventListener('DOMContentLoaded', function() {
            const skillBars = document.querySelectorAll('.skill-bar');
            const skillPercents = document.querySelectorAll('.skill-percent');
            
            // Intersection Observer for skill bars animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bars = entry.target.querySelectorAll('.skill-bar');
                        const percents = entry.target.querySelectorAll('.skill-percent');
                        
                        bars.forEach((bar, index) => {
                            const percent = bar.getAttribute('data-percent');
                            setTimeout(() => {
                                bar.style.width = `${percent}%`;
                                percents[index].style.opacity = '1';
                            }, index * 400);
                        });
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(document.querySelector('.skills-section'));
            
            // Hover effects enhancement
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px) scale(1.02)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0) scale(1)';
                });
            });
        });

