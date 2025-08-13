class AdvancedParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('backgroundAnimation');
        this.maxParticles = 150;
        this.emitters = [];
        this.time = 0;
        this.init();
    }

    init() {
        this.setupEmitters();
        this.animate();
        this.startContinuousGeneration();
    }

    setupEmitters() {
        // 4つの角からの放出源
        this.emitters = [
            { x: 0, y: 0, angle: 45, strength: 0.8 },
            { x: window.innerWidth, y: 0, angle: 135, strength: 0.8 },
            { x: 0, y: window.innerHeight, angle: 315, strength: 0.8 },
            { x: window.innerWidth, y: window.innerHeight, angle: 225, strength: 0.8 }
        ];

        // 画面下部からの上昇気流
        for (let i = 0; i < 5; i++) {
            this.emitters.push({
                x: (window.innerWidth / 6) * (i + 1),
                y: window.innerHeight,
                angle: 270,
                strength: 1.2
            });
        }
    }

    startContinuousGeneration() {
        // 適度な頻度で生成（ランダム間隔）
        const scheduleWaveGeneration = () => {
            setTimeout(() => {
                if (this.particles.length < this.maxParticles) {
                    this.generateWaveParticles();
                }
                scheduleWaveGeneration();
            }, Math.random() * 200 + 100); // 100-300ms間隔
        };
        scheduleWaveGeneration();

        // エネルギー爆発を無効化
        // const scheduleEnergyBurst = () => {
        //     setTimeout(() => {
        //         this.createEnergyBurst();
        //         scheduleEnergyBurst();
        //     }, Math.random() * 4000 + 2000);
        // };
        // setTimeout(scheduleEnergyBurst, Math.random() * 2000);

        // 魔法効果（ランダムタイミング）
        const scheduleMagicEffect = () => {
            setTimeout(() => {
                this.createMagicEffect();
                scheduleMagicEffect();
            }, Math.random() * 5000 + 3000); // 3-8秒間隔
        };
        setTimeout(scheduleMagicEffect, Math.random() * 3000); // 初回は0-3秒後

        // 軌道パーティクル（ランダムタイミング）
        const scheduleOrbitParticles = () => {
            setTimeout(() => {
                this.createOrbitParticles();
                scheduleOrbitParticles();
            }, Math.random() * 3000 + 1500); // 1.5-4.5秒間隔
        };
        setTimeout(scheduleOrbitParticles, Math.random() * 1500); // 初回は0-1.5秒後
    }

    generateWaveParticles() {
        // 放出源からの生成
        this.emitters.forEach(emitter => {
            if (Math.random() < 0.2 + Math.random() * 0.3) { // 0.2-0.5の範囲
                this.createParticleFromEmitter(emitter);
            }
        });

        // ランダム生成（数を減らし）
        if (Math.random() < 0.7) {
            this.createRandomParticle();
        }
    }

    createParticleFromEmitter(emitter) {
        const types = ['energy', 'spark', 'magic', 'tech', 'geometric'];
        const angleRad = (emitter.angle + (Math.random() - 0.5) * 60) * Math.PI / 180;
        
        const particle = {
            element: document.createElement('div'),
            x: emitter.x + (Math.random() - 0.5) * 50,
            y: emitter.y + (Math.random() - 0.5) * 50,
            velocityX: Math.cos(angleRad) * (Math.random() * 3 + 1) * emitter.strength,
            velocityY: Math.sin(angleRad) * (Math.random() * 3 + 1) * emitter.strength,
            size: Math.random() * 8 + 3,
            opacity: Math.random() * 0.8 + 0.4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            life: 1.0,
            decay: Math.random() * 0.002 + 0.001,
            gravity: Math.random() * 0.02,
            wind: (Math.random() - 0.5) * 0.03,
            bounce: 0.3 + Math.random() * 0.4,
            type: types[Math.floor(Math.random() * types.length)],
            pulseSpeed: Math.random() * 0.1 + 0.05,
            originalSize: 0
        };

        particle.originalSize = particle.size;
        this.setupParticleElement(particle);
        this.particles.push(particle);
    }

    createRandomParticle() {
        const types = ['energy', 'spark', 'magic', 'tech', 'geometric', 'trail'];
        const edge = Math.floor(Math.random() * 4);
        let x, y, vx, vy;

        switch(edge) {
            case 0: // 上
                x = Math.random() * window.innerWidth;
                y = -20;
                vx = (Math.random() - 0.5) * 2;
                vy = Math.random() * 3 + 1;
                break;
            case 1: // 右
                x = window.innerWidth + 20;
                y = Math.random() * window.innerHeight;
                vx = -(Math.random() * 3 + 1);
                vy = (Math.random() - 0.5) * 2;
                break;
            case 2: // 下
                x = Math.random() * window.innerWidth;
                y = window.innerHeight + 20;
                vx = (Math.random() - 0.5) * 2;
                vy = -(Math.random() * 3 + 1);
                break;
            case 3: // 左
                x = -20;
                y = Math.random() * window.innerHeight;
                vx = Math.random() * 3 + 1;
                vy = (Math.random() - 0.5) * 2;
                break;
        }

        const particle = {
            element: document.createElement('div'),
            x: x,
            y: y,
            velocityX: vx,
            velocityY: vy,
            size: Math.random() * 12 + 2,
            opacity: Math.random() * 0.9 + 0.3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 6,
            life: 1.0,
            decay: Math.random() * 0.003 + 0.001,
            gravity: Math.random() * 0.02,
            wind: (Math.random() - 0.5) * 0.02,
            bounce: 0.2 + Math.random() * 0.5,
            type: types[Math.floor(Math.random() * types.length)],
            pulseSpeed: Math.random() * 0.1 + 0.03,
            originalSize: 0
        };

        particle.originalSize = particle.size;
        this.setupParticleElement(particle);
        this.particles.push(particle);
    }

    createEnergyBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 30; i++) {
            const angle = (360 / 30) * i;
            const angleRad = angle * Math.PI / 180;
            const distance = Math.random() * 100 + 50;
            
            const particle = {
                element: document.createElement('div'),
                x: centerX,
                y: centerY,
                velocityX: Math.cos(angleRad) * (Math.random() * 6 + 4),
                velocityY: Math.sin(angleRad) * (Math.random() * 6 + 4),
                size: Math.random() * 10 + 5,
                opacity: 0.9,
                rotation: angle,
                rotationSpeed: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: Math.random() * 0.005 + 0.003,
                gravity: 0,
                wind: 0,
                bounce: 0,
                type: 'energy',
                pulseSpeed: 0.2,
                originalSize: 0
            };

            particle.originalSize = particle.size;
            this.setupParticleElement(particle);
            this.particles.push(particle);
        }
    }

    createMagicEffect() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * 360;
            const angleRad = angle * Math.PI / 180;
            const radius = Math.random() * 200 + 100;
            
            const particle = {
                element: document.createElement('div'),
                x: centerX + Math.cos(angleRad) * radius,
                y: centerY + Math.sin(angleRad) * radius,
                velocityX: -Math.cos(angleRad) * 2,
                velocityY: -Math.sin(angleRad) * 2,
                size: Math.random() * 6 + 3,
                opacity: 0.8,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 15,
                life: 1.0,
                decay: 0.008,
                gravity: 0,
                wind: 0,
                bounce: 0,
                type: 'magic',
                pulseSpeed: 0.15,
                originalSize: 0
            };

            particle.originalSize = particle.size;
            this.setupParticleElement(particle);
            this.particles.push(particle);
        }
    }

    createOrbitParticles() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 8; i++) {
            const angle = (360 / 15) * i;
            const angleRad = angle * Math.PI / 180;
            const radius = 250;
            
            const particle = {
                element: document.createElement('div'),
                x: centerX + Math.cos(angleRad) * radius,
                y: centerY + Math.sin(angleRad) * radius,
                velocityX: -Math.sin(angleRad) * 3,
                velocityY: Math.cos(angleRad) * 3,
                size: Math.random() * 4 + 2,
                opacity: 0.7,
                rotation: angle,
                rotationSpeed: 2,
                life: 1.0,
                decay: 0.002,
                gravity: 0,
                wind: 0,
                bounce: 0,
                type: 'tech',
                pulseSpeed: 0.1,
                originalSize: 0,
                orbital: true,
                orbitAngle: angleRad,
                orbitRadius: radius,
                orbitSpeed: 0.02
            };

            particle.originalSize = particle.size;
            this.setupParticleElement(particle);
            this.particles.push(particle);
        }
    }

    setupParticleElement(particle) {
        particle.element.className = `particle ${particle.type}`;
        particle.element.style.width = particle.size + 'px';
        particle.element.style.height = particle.size + 'px';
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        particle.element.style.opacity = particle.opacity;
        particle.element.style.position = 'absolute';
        particle.element.style.transform = `rotate(${particle.rotation}deg)`;
        
        this.container.appendChild(particle.element);
    }

    updateParticles() {
        this.time += 0.016;

        // パフォーマンス最適化：上限チェック
        if (this.particles.length > this.maxParticles) {
            const excess = this.particles.length - this.maxParticles;
            for (let i = 0; i < excess; i++) {
                const particle = this.particles[i];
                if (particle && particle.element && particle.element.parentNode) {
                    this.container.removeChild(particle.element);
                }
            }
            this.particles.splice(0, excess);
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            if (!particle || !particle.element) continue;

            if (particle.orbital) {
                // 軌道運動
                particle.orbitAngle += particle.orbitSpeed;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                particle.x = centerX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
                particle.y = centerY + Math.sin(particle.orbitAngle) * particle.orbitRadius;
            } else {
                // 通常の物理運動
                particle.velocityY += particle.gravity;
                particle.velocityX += particle.wind;
                
                particle.x += particle.velocityX;
                particle.y += particle.velocityY;
            }

            particle.rotation += particle.rotationSpeed;

            // 画面端での循環
            if (particle.x < -50) particle.x = window.innerWidth + 50;
            if (particle.x > window.innerWidth + 50) particle.x = -50;
            if (particle.y < -50) particle.y = window.innerHeight + 50;
            if (particle.y > window.innerHeight + 50) particle.y = -50;

            // パルス効果
            const pulse = Math.sin(this.time * particle.pulseSpeed) * 0.3 + 0.7;
            particle.size = particle.originalSize * pulse;

            // ライフサイクル
            particle.life -= particle.decay;
            particle.opacity = Math.max(0, particle.life * 0.9);

            // DOM更新
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.width = particle.size + 'px';
            particle.element.style.height = particle.size + 'px';
            particle.element.style.opacity = particle.opacity;
            particle.element.style.transform = `rotate(${particle.rotation}deg) scale(${pulse})`;

            // パーティクル削除と再生成
            if (particle.life <= 0) {
                if (particle.element.parentNode) {
                    this.container.removeChild(particle.element);
                }
                this.particles.splice(i, 1);
                
                // 永続化のための再生成（確率を下げる）
                if (Math.random() < 0.4) {
                    setTimeout(() => {
                        if (this.particles.length < this.maxParticles) {
                            this.createRandomParticle();
                        }
                    }, Math.random() * 2000 + 500); // 0.5-2.5秒後
                }
            }
        }
    }

    animate() {
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }

    addInteractiveBurst(x, y) {
        for (let i = 0; i < 25; i++) {
            const angle = Math.random() * 360;
            const angleRad = angle * Math.PI / 180;
            const speed = Math.random() * 8 + 2;
            
            const particle = {
                element: document.createElement('div'),
                x: x,
                y: y,
                velocityX: Math.cos(angleRad) * speed,
                velocityY: Math.sin(angleRad) * speed,
                size: Math.random() * 8 + 3,
                opacity: 1.0,
                rotation: angle,
                rotationSpeed: (Math.random() - 0.5) * 20,
                life: 1.0,
                decay: Math.random() * 0.01 + 0.005,
                gravity: 0.1,
                wind: 0,
                bounce: 0.3,
                type: ['spark', 'energy', 'magic'][Math.floor(Math.random() * 3)],
                pulseSpeed: 0.3,
                originalSize: 0
            };

            particle.originalSize = particle.size;
            this.setupParticleElement(particle);
            this.particles.push(particle);
        }
    }
}

// システム初期化
let particleSystem;

// タグラインの配列
const taglines = [
    'From tiny sparks to endless possibilities',
    'Beyond the ordinary, within reach',
    'Innovation starts small',
    'Spark. Grow. Exceed.',
    'Small ideas, big impact',
    'Where ideas take flight',
    'Empower every moment',
    'Magic Beyond Limits',
    'Seeds of Ideas, Speed to Success',
    'Where Magic Meets Momentum',
    'Growing Ideas, Exceeding Expectations',
    'From Tiny Seeds to Extraordinary Heights',
    'Fast, Creative, Beyond Boundaries',
    'Whispers of Magic, Waves of Change',
    'Plant the Spark, Watch it Soar',
    'Light as a Pixie, Bold as a Dream'
];

// ランダムタグライン表示
function displayRandomTagline() {
    const randomIndex = Math.floor(Math.random() * taglines.length);
    const taglineElement = document.getElementById('tagline');
    taglineElement.textContent = taglines[randomIndex];
}

document.addEventListener('DOMContentLoaded', function() {
    // タグライン設定
    displayRandomTagline();
    
    particleSystem = new AdvancedParticleSystem();
    
    // インタラクティブ要素
    document.addEventListener('click', function(e) {
        particleSystem.addInteractiveBurst(e.clientX, e.clientY);
    });

    // ウィンドウリサイズ対応
    window.addEventListener('resize', function() {
        particleSystem.setupEmitters();
    });
});