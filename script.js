const heartContainer = document.getElementById("heartContainer");
const openButton = document.getElementById("openButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const congratulationsScreen = document.getElementById("congratulationsScreen");
const congratsTitle = document.getElementById("congratsTitle");
const congratsMessage = document.getElementById("congratsMessage");
const continueButton = document.getElementById("continueButton"); // EKLENDİ
const heartGame = document.getElementById("heartGame");
const interactiveHeartContainer = document.getElementById("interactiveHeartContainer");
const messageBox = document.getElementById("messageBox");
const heartMessage = document.getElementById("heartMessage");
const finalButton = document.getElementById("finalButton");
const finalLetterScreen = document.getElementById("finalLetterScreen");
const loveLetterText = document.getElementById("loveLetterText");
const flowerContainer = document.getElementById("flowerContainer");
const sparkleContainer = document.getElementById("sparkleContainer");
const bgMusic = document.getElementById("bgMusic"); // EKLENDİ

// =================================
// Floating Background Hearts
// =================================
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = window.innerHeight + "px";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.opacity = Math.random();
    heart.style.transition = "transform 7s linear, opacity 7s linear";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = `translateY(-${window.innerHeight + 200}px)`;
        heart.style.opacity = "0";
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}


setInterval(createHeart, 300);

// =================================
// Interactive Heart Messages
// =================================
const messages = [
    "❤️ I am so proud of you ❤️",
    "❤️ You worked so hard for this day ❤️",
    "❤️ You deserve every success ❤️",
    "❤️ I will always support you ❤️",
    "❤️ You make my life beautiful ❤️",
    "❤️ I love you so much ❤️"
];

let foundHearts = 0;

function createInteractiveHearts() {
    messages.forEach((message) => {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.className = "interactive-heart";
        heart.style.left = Math.random() * 500 + "px";
        heart.style.top = Math.random() * 300 + "px";

        heart.addEventListener("click", () => {
            heartMessage.innerHTML = message;
            messageBox.classList.remove("hidden");
            heart.remove();
            foundHearts++;

            if (foundHearts === messages.length) {
                finalButton.classList.remove("hidden");
            }
        });

        interactiveHeartContainer.appendChild(heart);
    });
}

// =================================
// Background Music Helpers
// =================================
function fadeMusicVolume(targetVolume, duration) {
    const steps = 30;
    const stepTime = duration / steps;
    const startVolume = bgMusic.volume;
    const volumeChange = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
        currentStep++;
        const newVolume = startVolume + volumeChange * currentStep;
        bgMusic.volume = Math.min(1, Math.max(0, newVolume));

        if (currentStep >= steps) {
            clearInterval(fadeInterval);
        }
    }, stepTime);
}

// =================================
// Open Surprise (welcome -> congratulations)
// =================================
openButton.addEventListener("click", () => {
    // Müziği kullanıcı tıklamasıyla başlat (tarayıcı otomatik oynatma kısıtlaması için gerekli)
    bgMusic.volume = 0.3;
    bgMusic.play().catch((err) => {
        console.log("Müzik otomatik başlatılamadı:", err);
    });

    welcomeScreen.style.opacity = "0";

    setTimeout(() => {
        welcomeScreen.style.display = "none";

        congratulationsScreen.classList.remove("hidden");
        congratulationsScreen.style.opacity = "1";

        setTimeout(() => {
            congratsTitle.style.opacity = "1";
            congratsTitle.style.transform = "translateY(0)";
        }, 300);

        setTimeout(() => {
            congratsMessage.style.opacity = "1";
            congratsMessage.style.transform = "translateY(0)";
        }, 900);

       

    }, 700);
});

// =================================
// Continue -> Heart Game (EKSİK OLAN KISIM)
// =================================
continueButton.addEventListener("click", () => {
    congratulationsScreen.style.opacity = "0";

    setTimeout(() => {
        congratulationsScreen.classList.add("hidden"); // önceki ekran artık gerçekten gizleniyor
        heartGame.classList.remove("hidden");
        createInteractiveHearts();
    }, 1000); // CSS'teki transition:1s ile senkron
});

// =================================
// Final Letter Screen
// =================================
finalButton.addEventListener("click", () => {
    heartGame.classList.add("hidden");
    finalLetterScreen.classList.remove("hidden");
    startTypingEffect();
    setInterval(createFlowers, 300);
    setInterval(createSparkle, 200);

    // Final mektupta müzik yükseliyor
    fadeMusicVolume(0.8, 3000);
});

// =================================
// Typewriter Love Letter Effect
// =================================
function startTypingEffect() {
    const text = `

My beautiful princess ❤️

Today is not just your graduation day.

Today is proof of how strong,
determined and amazing you are.

I saw your hard work,
your tired days,
and every moment you never gave up.

I am incredibly proud of you.

I hope this new chapter of your life
brings you endless happiness.

I will always support you,
stand beside you,
and love you.

Congratulations my Angel ❤️

`;

    let index = 0;

    function type() {
        if (index < text.length) {
            loveLetterText.innerHTML += text[index];
            index++;
            setTimeout(type, 40);
        }
    }

    type();
}

// =========================
// Flower Rain
// =========================
function createFlowers() {
    const flowers = ["🌸", "🌹", "🌺", "🌷"];

    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.animationDuration = Math.random() * 5 + 5 + "s";

    flowerContainer.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 8000);
}

// =========================
// Sparkle Animation
// =========================
function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.innerHTML = "✨";
    sparkle.style.left = Math.random() * window.innerWidth + "px";
    sparkle.style.top = Math.random() * window.innerHeight + "px";
    sparkle.style.animationDuration = Math.random() * 2 + 2 + "s";

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}