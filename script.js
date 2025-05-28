function calcularNota() {
    const np1 = parseFloat(document.getElementById('np1').value);
    const np2 = parseFloat(document.getElementById('np2').value);
    const mediaInput = document.getElementById('media');
    const exameInput = document.getElementById('exame');
    const situacaoInput = document.getElementById('situacao');
  
    // Verifica se são números válidos entre 0 e 10
    if (
      isNaN(np1) || isNaN(np2) ||
      np1 < 0 || np1 > 10 ||
      np2 < 0 || np2 > 10
    ) {
      alert('As notas devem ser números entre 0 e 10!');
      return;
    }
  
    const media = (np1 + np2) / 2;
    mediaInput.value = media.toFixed(1);
  
    if (media >= 7) {
      situacaoInput.value = "☑ APROVADO ☑";
      exameInput.value = "-";
      // Chama o efeito confete
  showConfetti();
    } else {
      const notaExame = 10 - media;
      exameInput.value = notaExame.toFixed(1);
  
      if ((media + notaExame) / 2 >= 5) {
        situacaoInput.value = "⚠ NECESSÁRIO EXAME ⚠";
        mostrarAlertaExame();  // chama o efeito do aviso piscando
      } else {
        situacaoInput.value = "☒ DP ☒";
      }
    }
  }
  
  function limparCampos() {
    document.getElementById('np1').value = '';
    document.getElementById('np2').value = '';
    document.getElementById('media').value = '';
    document.getElementById('exame').value = '';
    document.getElementById('situacao').value = '';
  }

  const btnAjuda = document.getElementById('btnAjuda');
  const modal = document.getElementById('modalAjuda');
  const fechar = document.getElementById('fecharModal');

  btnAjuda.onclick = function() {
    modal.style.display = "flex";
  }

  fechar.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  function showConfetti() {
    const confetti = document.createElement('canvas');
    confetti.id = 'confettiCanvas';
    confetti.style.position = 'fixed';
    confetti.style.top = 0;
    confetti.style.left = 0;
    confetti.style.width = '100vw';
    confetti.style.height = '100vh';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = 1000;
    document.body.appendChild(confetti);
  
    const ctx = confetti.getContext('2d');
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;
  
    const particles = [];
    const colors = ['#ffcc00', '#ffffff', '#202A6B'];
  
    // Cria partículas
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * confetti.width,
        y: Math.random() * confetti.height - confetti.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
      });
    }
  
    function draw() {
      ctx.clearRect(0, 0, confetti.width, confetti.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      });
      update();
    }
  
    function update() {
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 15;
  
        if (p.y > confetti.height) {
          p.x = Math.random() * confetti.width;
          p.y = -20;
          p.tilt = Math.random() * 10 - 10;
        }
      });
    }
  
    let animationFrame;
    function animate() {
      draw();
      animationFrame = requestAnimationFrame(animate);
    }
  
    animate();
  
    // Remove confetti após 5 segundos
    setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      confetti.remove();
    }, 2000);
  }



  function mostrarAlertaExame() {
    const alerta = document.getElementById('alertaExame');
    alerta.style.display = 'block';
  
    // Depois de 3 segundos, esconde o alerta
    setTimeout(() => {
      alerta.style.display = 'none';
    }, 2000);
  }
