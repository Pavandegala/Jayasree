document.addEventListener('DOMContentLoaded', function () {

    // --- Live Age Counter ---
    const birthDate = new Date('2005-05-28T00:00:00');
    const countdownElement = document.getElementById('countdown');



    function updateAge() {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        countdownElement.innerHTML = `${years}y ${months}m ${days}d <br> ${hours}h ${minutes}m ${seconds}s`;
    }
    setInterval(updateAge, 1000);
    updateAge();

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Hall of Fame Scroller ---
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap);

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }


    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function () {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function () {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => {
                petal.update();
            });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();



    }
    /* MEMORY OPEN FUNCTION */

    window.openMemory = function (card) {

        // reveal image
        card.classList.toggle("active");

        // play audio
        const audio = document.getElementById("birthday-audio");

        audio.currentTime = 0;

        audio.play();
    }
    const cursor = document.querySelector(".custom-cursor");

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

});
/* TYPING EFFECT */

const text =
    "Happy Birthday to my favorite person, my comfort place, and my very own Kaju Katli 🎀";

let i = 0;

function typeWriter() {

    if (i < text.length) {

        document.getElementById("typing-text").innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter, 55);
    }
}

typeWriter();
/* FLOATING HEARTS */

document.addEventListener("click", function (e) {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "💖💖💖";

    heart.style.left = e.pageX + "px";
    heart.style.top = e.pageY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000);
});
/* ======================================== */
/* GALLERY REVEAL */
/* ======================================== */

document.querySelectorAll(".reveal-gallery").forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("active");

    });

});
/* ======================================== */
/* DRAGGABLE STICKERS */
/* ======================================== */

document.querySelectorAll(".draggable-sticker").forEach(sticker => {

    let isDragging = false;

    let offsetX, offsetY;

    sticker.addEventListener("mousedown", (e) => {

        isDragging = true;

        offsetX = e.clientX - sticker.offsetLeft;
        offsetY = e.clientY - sticker.offsetTop;

        sticker.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {

        if (!isDragging) return;

        sticker.style.left =
            `${e.clientX - offsetX}px`;

        sticker.style.top =
            `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {

        isDragging = false;

        sticker.style.cursor = "grab";

        console.log(
            `left: ${sticker.style.left}; top: ${sticker.style.top};`
        );
    });

});
