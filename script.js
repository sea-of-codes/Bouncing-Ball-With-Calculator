var inputField = document.getElementById('result');

    function addToScreen(value) {
        inputField.value += value;
    }

    function clearScreen() {
        inputField.value = '';
    }

    function calculate() {
        inputField.value = eval(inputField.value); // Warning: Using eval() can be unsafe if user input is not properly sanitized.
    }

    function backspace() {
        inputField.value = inputField.value.slice(0, -1);
    }

    // Your Projectile class and canvas drawing logic
        var canvas, ctx; // Declare canvas and ctx globally
        var circles = []; // Declare circles globally
        var maxGravity = 50; // Declare maxGravity globally

        class Projectile {
            constructor(x, y, s) {
                this.x = x;
                this.y = y;
                this.s = s;
                this.gX = Math.floor(Math.random() * 20 - 10);
                this.gY = Math.floor(Math.random() * 15 - 15);
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }

            update() {
                this.x += this.gX;
                this.y += this.gY;
            }

            gravity() {
                var gravity = 1; // Define gravity locally
                var bounceReduce = 1; // Define bounceReduce locally

                if (this.y < canvas.height - this.s) {
                    if (this.gY <= maxGravity) {
                        this.gY += gravity;
                    }
                } else {
                    this.y = canvas.height - this.s;
                    if (this.gY > bounceReduce) {
                        this.gY = (this.gY * bounceReduce) * -1;
                    } else {
                        this.gY = 0;
                    }
                }
                if (this.x < 0 + this.s) {
                    this.x = 0 + this.s;
                    this.gX = (this.gX / 2) * -1;
                } else if (this.x > canvas.width - this.s) {
                    this.x = canvas.width -this.s;
                    this.gX = (this.gX / 2) * -1;
                }
                if (Math.abs(this.gX) >= 0.3) {
                    this.gX -= 0.01;
                } else {
                    this.gX = 0;
                }
            }
        }

        window.onload = function () {
            alert(
                "Click anywhere to spawn a ball, and a new complex version is coming soon."
            );
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            document.addEventListener("click", function (e) {
                var x = e.clientX; // Use clientX and clientY instead of x and y
                var y = e.clientY;
                circles.push(new Projectile(x, y, 5));
            });

            main();
        };

        function main() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            circles.forEach(function (circle, index) {
                circle.gravity();
                circle.update();
                circle.draw();
                if (circle.s <= 0.1) {
                    circles.splice(index, 1);
                }
            });

            requestAnimationFrame(main);
        }