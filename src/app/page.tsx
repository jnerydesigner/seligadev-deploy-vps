/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks: any[] = [];

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    class Firework {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.color = color;
        this.velocity = {
          x: random(-2, 2),
          y: random(-2, 2),
        };
        this.alpha = 1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
      }
    }

    const colors = ["#facc15", "#ef4444", "#3b82f6", "#10b981", "#a855f7"];

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(243, 244, 246, 0.2)"; // fundo cinza-claro com fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.alpha <= 0) fireworks.splice(index, 1);
      });
    };

    const shootFirework = () => {
      const x = random(canvas.width * 0.2, canvas.width * 0.8);
      const y = random(canvas.height * 0.2, canvas.height * 0.5);
      const count = 30;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        fireworks.push(new Firework(x, y, color));
      }
    };

    setInterval(shootFirework, 1000);
    animate();
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 z-0 pointer-events-none"
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          🎉 Bem-vindos ao meu canal! <br />
          <span className="text-indigo-600">Jander Nery Dev 👨‍💻</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Desenvolvedor com mais de 14 anos de experiência em sistemas backend,
          frontend e DevOps. Acredito no poder da tecnologia para transformar
          realidades e estou aqui para compartilhar conhecimento com propósito.
          🚀
        </p>
      </div>
    </main>
  );
}
