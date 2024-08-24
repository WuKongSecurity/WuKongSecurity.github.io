document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("currentYear").textContent = new Date().getFullYear().toString();

	/* ============== 背景音乐以及律动效果 ============== */
	const audio = document.getElementById("audio");
	let isPlaying = false;

	function playAudio() {
		if (!isPlaying) {
			audio.play().then(() => {
				isPlaying = true;
				console.log("Audio is playing");
			}).catch((error) => {
				console.log("Error playing audio:", error);
			});
		}
	}

	// 绑定用户交互事件
	document.addEventListener("click", playAudio);
	document.addEventListener("touchstart", playAudio);

	// 防止重复播放, 添加律动效果
	audio.addEventListener("playing", () => {
		isPlaying = true;

		const context = new AudioContext();
		const src = context.createMediaElementSource(audio);
		const analyser = context.createAnalyser();

		const canvas = document.getElementById("canvas");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const ctx = canvas.getContext("2d");

		src.connect(analyser);
		analyser.connect(context.destination);

		analyser.fftSize = 256;

		const bufferLength = analyser.frequencyBinCount;
		console.log(bufferLength);

		const dataArray = new Uint8Array(bufferLength);

		const WIDTH = canvas.width;
		const HEIGHT = canvas.height;

		const barWidth = (WIDTH / bufferLength) * 2.5;
		let barHeight;
		let x = 0;

		function renderFrame() {
			requestAnimationFrame(renderFrame);

			x = 0;

			analyser.getByteFrequencyData(dataArray);

			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);

			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];

				const r = barHeight + (25 * (i / bufferLength));
				const g = 250 * (i / bufferLength);
				const b = 50;

				ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
				ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

				x += barWidth + 1;
			}
		}

		// audio.play();
		renderFrame();
	});

	audio.addEventListener("pause", () => {
		isPlaying = false;
	});

	/* ============== 鼠标样式 ============== */

	document.getElementsByTagName("body")[0].addEventListener("mousemove", function (n) {
		t.style.left = n.clientX + "px";
		t.style.top = n.clientY + "px";
		e.style.left = n.clientX + "px";
		e.style.top = n.clientY + "px";
		i.style.left = n.clientX + "px";
		i.style.top = n.clientY + "px";
	});
	const t = document.getElementById("cursor"),
		e = document.getElementById("cursor2"),
		i = document.getElementById("cursor3");

	function n() {
		e.classList.add("hover");
		i.classList.add("hover");
	}

	function s() {
		e.classList.remove("hover");
		i.classList.remove("hover");
	}

	s();
	for (let r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
		o(r[a])
	}

	function o(t) {
		t.addEventListener("mouseover", n);
		t.addEventListener("mouseout", s);
	}
})