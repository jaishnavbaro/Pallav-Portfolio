/**
 * Goroi Portfolio - Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------------
    // 1. Dynamic Typewriter Effect for Hero
    // ---------------------------------------------------------------
    const typedTextEl = document.getElementById('typed-text');
    const roles = [
        'Pre-Medical Student.',
        'Dedicated NEET Aspirant.',
        'Biology & Science Enthusiast.',
        'Disciplined Daily Learner.',
        'Future Healthcare Professional.'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typedTextEl) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 110;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ---------------------------------------------------------------
    // 2. Dark / Light Theme Toggle
    // ---------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved preference or fallback to dark
    const savedTheme = localStorage.getItem('goroi_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('goroi_portfolio_theme', newTheme);
        });
    }

    // ---------------------------------------------------------------
    // 3. Header Scroll Effect & Active Navigation Link Tracking
    // ---------------------------------------------------------------
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        // Sticky Header styling
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        // Active link tracking based on scroll position
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ---------------------------------------------------------------
    // 4. Mobile Menu Toggle
    // ---------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ---------------------------------------------------------------
    // 5. Project Category Filtering
    // ---------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ---------------------------------------------------------------
    // 6. Stats Counter Animation
    // ---------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            let count = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                    // Retain suffix like + or %
                    const suffix = target === 100 ? '%' : '+';
                    stat.textContent = `${target}${suffix}`;
                } else {
                    const suffix = target === 100 ? '%' : '+';
                    stat.textContent = `${count}${suffix}`;
                }
            }, 30);
        });
    }

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsBar);
    } else {
        animateStats();
    }

    // ---------------------------------------------------------------
    // 7. Interactive Speed Math Game Engine
    // ---------------------------------------------------------------
    const gameScoreEl = document.getElementById('game-score');
    const gameStreakEl = document.getElementById('game-streak');
    const gameTimerEl = document.getElementById('game-timer');
    const gameBestEl = document.getElementById('game-best');
    const soundToggleBtn = document.getElementById('game-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const timerBarFill = document.getElementById('timer-bar-fill');

    const screenStart = document.getElementById('screen-start');
    const screenPlay = document.getElementById('screen-play');
    const screenOver = document.getElementById('screen-over');

    const btnStartGame = document.getElementById('btn-start-game');
    const btnQuitGame = document.getElementById('btn-quit-game');
    const btnPlayAgain = document.getElementById('btn-play-again');
    const btnChangeDiff = document.getElementById('btn-change-diff');

    const diffBtns = document.querySelectorAll('.diff-btn');
    const durationBtns = document.querySelectorAll('.duration-btn');

    const multiplierPill = document.getElementById('multiplier-pill');
    const questionCounter = document.getElementById('question-counter');
    const equationDisplay = document.getElementById('equation-display');
    const optionBtns = document.querySelectorAll('.option-btn');

    const overScore = document.getElementById('over-score');
    const overAccuracy = document.getElementById('over-accuracy');
    const overStreak = document.getElementById('over-streak');
    const overSolved = document.getElementById('over-solved');
    const rankTitle = document.getElementById('rank-title');
    const overTitle = document.getElementById('over-title');
    const overSubtitle = document.getElementById('over-subtitle');

    // Game State
    let difficulty = 'easy';
    let duration = 60;
    let timeLeft = 60;
    let timerInterval = null;
    let score = 0;
    let streak = 0;
    let maxStreak = 0;
    let correctCount = 0;
    let totalQuestions = 0;
    let currentQuestionIndex = 0;
    let currentAnswer = 0;
    let isAnsweringLocked = false;
    let isSoundOn = true;

    // Load High Score from localStorage
    let highScore = parseInt(localStorage.getItem('speed_math_best') || '0', 10);
    if (gameBestEl) gameBestEl.textContent = highScore;

    // Audio Synthesizer (Web Audio API)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function playTone(freq, durationSec, type = 'sine') {
        if (!isSoundOn) return;
        try {
            if (!audioCtx) {
                audioCtx = new AudioContextClass();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationSec);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + durationSec);
        } catch (e) {
            // Audio not supported or blocked
        }
    }

    function playCorrectSound() {
        playTone(587.33, 0.12, 'sine'); // D5
        setTimeout(() => playTone(880, 0.18, 'sine'), 80); // A5
    }

    function playWrongSound() {
        playTone(180, 0.2, 'sawtooth');
    }

    function playGameOverSound() {
        playTone(440, 0.15, 'triangle');
        setTimeout(() => playTone(554.37, 0.15, 'triangle'), 120);
        setTimeout(() => playTone(659.25, 0.25, 'triangle'), 240);
    }

    // Toggle Sound
    if (soundToggleBtn && soundIcon) {
        soundToggleBtn.addEventListener('click', () => {
            isSoundOn = !isSoundOn;
            if (isSoundOn) {
                soundIcon.className = 'fa-solid fa-volume-high';
                soundToggleBtn.style.color = 'var(--primary)';
            } else {
                soundIcon.className = 'fa-solid fa-volume-xmark';
                soundToggleBtn.style.color = 'var(--text-muted)';
            }
        });
    }

    // Difficulty Selection
    diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            diffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            difficulty = btn.getAttribute('data-difficulty');
        });
    });

    // Duration Selection
    durationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            durationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            duration = parseInt(btn.getAttribute('data-duration'), 10);
        });
    });

    // Random Number Helper
    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate Question according to Difficulty
    function generateQuestion() {
        let text = '';
        let answer = 0;

        if (difficulty === 'easy') {
            const op = Math.random() < 0.6 ? '+' : '-';
            if (op === '+') {
                const a = randInt(3, 35);
                const b = randInt(2, 35);
                text = `${a} + ${b}`;
                answer = a + b;
            } else {
                const a = randInt(15, 60);
                const b = randInt(2, a - 1);
                text = `${a} - ${b}`;
                answer = a - b;
            }
        } else if (difficulty === 'medium') {
            const types = ['mul', 'add', 'sub', 'div'];
            const chosen = types[randInt(0, types.length - 1)];

            if (chosen === 'mul') {
                const a = randInt(4, 16);
                const b = randInt(3, 12);
                text = `${a} × ${b}`;
                answer = a * b;
            } else if (chosen === 'div') {
                const b = randInt(2, 12);
                const a = randInt(2, 15);
                const prod = a * b;
                text = `${prod} ÷ ${b}`;
                answer = a;
            } else if (chosen === 'add') {
                const a = randInt(30, 99);
                const b = randInt(20, 99);
                text = `${a} + ${b}`;
                answer = a + b;
            } else {
                const a = randInt(50, 150);
                const b = randInt(15, a - 5);
                text = `${a} - ${b}`;
                answer = a - b;
            }
        } else {
            // Hard / Genius Level
            const types = ['mixed', 'square', 'large_mul', 'sqrt'];
            const chosen = types[randInt(0, types.length - 1)];

            if (chosen === 'square') {
                const a = randInt(6, 20);
                text = `${a}²`;
                answer = a * a;
            } else if (chosen === 'sqrt') {
                const roots = [9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256];
                const perfect = roots[randInt(0, roots.length - 1)];
                text = `√${perfect}`;
                answer = Math.round(Math.sqrt(perfect));
            } else if (chosen === 'mixed') {
                const a = randInt(4, 12);
                const b = randInt(3, 8);
                const c = randInt(5, 25);
                const isAdd = Math.random() < 0.5;
                if (isAdd) {
                    text = `(${a} × ${b}) + ${c}`;
                    answer = (a * b) + c;
                } else {
                    text = `(${a} × ${b}) - ${c}`;
                    answer = (a * b) - c;
                }
            } else {
                const a = randInt(11, 25);
                const b = randInt(6, 15);
                text = `${a} × ${b}`;
                answer = a * b;
            }
        }

        // Generate 3 plausible distractors
        const optionsSet = new Set();
        optionsSet.add(answer);

        const offsets = [-10, -5, -3, -2, -1, 1, 2, 3, 5, 10, -15, 15];
        while (optionsSet.size < 4) {
            const offset = offsets[randInt(0, offsets.length - 1)];
            const fake = answer + offset;
            if (fake >= 0 && fake !== answer) {
                optionsSet.add(fake);
            } else {
                optionsSet.add(answer + randInt(4, 20));
            }
        }

        // Shuffle options
        const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

        return { text: `${text} = ?`, answer, options };
    }

    function getMultiplier() {
        if (streak >= 10) return 4;
        if (streak >= 6) return 3;
        if (streak >= 3) return 2;
        return 1;
    }

    function updateHUD() {
        if (gameScoreEl) gameScoreEl.textContent = score;
        if (gameStreakEl) gameStreakEl.textContent = streak > 0 ? `🔥 ${streak}` : `0`;
        if (multiplierPill) {
            const mult = getMultiplier();
            multiplierPill.textContent = `${mult}x Multiplier`;
            if (mult > 1) {
                multiplierPill.style.color = '#f59e0b';
                multiplierPill.style.borderColor = '#f59e0b';
            } else {
                multiplierPill.style.color = '';
                multiplierPill.style.borderColor = '';
            }
        }
    }

    function renderQuestion() {
        currentQuestionIndex++;
        if (questionCounter) questionCounter.textContent = `Question ${currentQuestionIndex}`;

        const q = generateQuestion();
        currentAnswer = q.answer;

        if (equationDisplay) equationDisplay.textContent = q.text;

        optionBtns.forEach((btn, idx) => {
            btn.className = 'option-btn';
            const valSpan = btn.querySelector('.opt-val');
            if (valSpan) valSpan.textContent = q.options[idx];
            btn.setAttribute('data-value', q.options[idx]);
        });

        isAnsweringLocked = false;
    }

    function handleAnswer(selectedIndex) {
        if (isAnsweringLocked || !screenPlay.classList.contains('active')) return;
        isAnsweringLocked = true;

        totalQuestions++;
        const selectedBtn = optionBtns[selectedIndex];
        const selectedValue = parseInt(selectedBtn.getAttribute('data-value'), 10);

        if (selectedValue === currentAnswer) {
            // Correct Answer
            selectedBtn.classList.add('correct-pulse');
            playCorrectSound();
            correctCount++;
            streak++;
            if (streak > maxStreak) maxStreak = streak;

            const mult = getMultiplier();
            score += (10 * mult);
            updateHUD();

            setTimeout(renderQuestion, 280);
        } else {
            // Wrong Answer
            selectedBtn.classList.add('wrong-shake');
            playWrongSound();
            streak = 0;
            updateHUD();

            // Highlight the correct one
            optionBtns.forEach(btn => {
                if (parseInt(btn.getAttribute('data-value'), 10) === currentAnswer) {
                    btn.classList.add('correct-pulse');
                }
            });

            setTimeout(renderQuestion, 450);
        }
    }

    // Option button clicks
    optionBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            handleAnswer(index);
        });
    });

    // Keyboard Shortcuts (1, 2, 3, 4)
    window.addEventListener('keydown', (e) => {
        if (!screenPlay.classList.contains('active')) return;
        if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            handleAnswer(idx);
        }
    });

    function showScreen(screen) {
        [screenStart, screenPlay, screenOver].forEach(s => s && s.classList.remove('active'));
        if (screen) screen.classList.add('active');
    }

    function startGame() {
        score = 0;
        streak = 0;
        maxStreak = 0;
        correctCount = 0;
        totalQuestions = 0;
        currentQuestionIndex = 0;
        timeLeft = duration;
        isAnsweringLocked = false;

        updateHUD();
        if (gameTimerEl) gameTimerEl.textContent = `${timeLeft}s`;
        if (timerBarFill) {
            timerBarFill.style.width = '100%';
            timerBarFill.classList.remove('warning');
        }

        showScreen(screenPlay);
        renderQuestion();

        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeLeft--;
            if (gameTimerEl) gameTimerEl.textContent = `${timeLeft}s`;

            const pct = Math.max(0, (timeLeft / duration) * 100);
            if (timerBarFill) {
                timerBarFill.style.width = `${pct}%`;
                if (timeLeft <= 10) {
                    timerBarFill.classList.add('warning');
                }
            }

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        if (timerInterval) clearInterval(timerInterval);
        isAnsweringLocked = true;

        playGameOverSound();

        // Calculate Stats
        const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

        if (overScore) overScore.textContent = score;
        if (overAccuracy) overAccuracy.textContent = `${accuracy}%`;
        if (overStreak) overStreak.textContent = maxStreak;
        if (overSolved) overSolved.textContent = `${correctCount} / ${totalQuestions}`;

        // Check High Score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('speed_math_best', highScore.toString());
            if (gameBestEl) gameBestEl.textContent = highScore;
            if (overTitle) overTitle.textContent = '🎉 New High Score!';
            if (overSubtitle) overSubtitle.textContent = `Unbelievable reflexes! New record of ${score} points!`;
        } else {
            if (overTitle) overTitle.textContent = 'Round Complete!';
            if (overSubtitle) overSubtitle.textContent = 'Great mental math sprint! Keep training your speed.';
        }

        // Rank Badge
        let rank = 'Good Effort 📚';
        if (score >= 400) {
            rank = 'NEET Math Prodigy 🧠🏆';
        } else if (score >= 250) {
            rank = 'Speed Calculation Master ⚡';
        } else if (score >= 140) {
            rank = 'Rapid Thinker 🎯';
        } else if (score >= 70) {
            rank = 'Consistent Learner 💡';
        }
        if (rankTitle) rankTitle.textContent = rank;

        showScreen(screenOver);
    }

    if (btnStartGame) btnStartGame.addEventListener('click', startGame);
    if (btnQuitGame) btnQuitGame.addEventListener('click', endGame);
    if (btnPlayAgain) btnPlayAgain.addEventListener('click', startGame);
    if (btnChangeDiff) btnChangeDiff.addEventListener('click', () => showScreen(screenStart));

    // ---------------------------------------------------------------
    // 8. Auto Update Current Year in Footer
    // ---------------------------------------------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
