import { useEffect, useRef } from "react";

const AmbientLight = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL no soportado");
      return;
    }

    // --- WebGL Shader de Simulación de Mármol ---

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse; // Variable para la posición del ratón

      // Función de ruido procedural
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;
          // Reducido a 4 octavas para MÁXIMO rendimiento a 60fps
          for (int i = 0; i < 4; i++) { 
              value += amplitude * noise(st);
              st *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;
          
          // --- INTERACCIÓN CON EL RATÓN ---
          vec2 mouse = u_mouse / u_resolution.xy;
          mouse.x *= u_resolution.x / u_resolution.y;

          float dist = distance(st, mouse);
          // Radio de influencia (0.4) para que el empuje se note más
          float interaction = smoothstep(0.4, 0.0, dist);
          
          // Al restar la dirección, le decimos al shader que tome los píxeles más cercanos
          // al ratón y los desplace hacia afuera. Visualmente esto EMPUJA las líneas.
          vec2 dir = normalize(st - mouse + 0.0001);
          st -= dir * interaction * 0.08; 
          // ---------------------------------

          st *= 2.0; // Escala más amplia

          // Domain Warping hiper-optimizado (solo 3 llamadas fbm en total)
          vec2 q = vec2(
              fbm(st + 0.01 * u_time),
              fbm(st + vec2(1.0) - 0.01 * u_time)
          );

          float f = fbm(st + q * 1.5 + 0.01 * u_time);

          // Paleta ultra minimalista (Casi todo blanco)
          vec3 bg = vec3(1.0, 1.0, 1.0); // Blanco puro
          vec3 grey = vec3(0.97, 0.98, 0.99); // Gris nube hiper sutil
          vec3 gold = vec3(0.85, 0.72, 0.35); // Oro
          vec3 navy = vec3(0.1, 0.2, 0.35); // Azul suave

          // Fondo
          vec3 color = mix(bg, grey, f);

          // Veta dorada: Hilo súper fino (Hairline)
          // Usamos una diferencia ínfima (0.005) para que la línea sea de un píxel de grosor
          float goldVein = smoothstep(0.495, 0.50, f) - smoothstep(0.50, 0.505, f);
          color = mix(color, gold, goldVein * 0.25); // Baja opacidad para que no distraiga

          // Veta navy cruzada: Hilo súper fino
          float navyVein = smoothstep(0.395, 0.40, q.x) - smoothstep(0.40, 0.405, q.x);
          color = mix(color, navy, navyVein * 0.1); // Casi imperceptible

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compilación de shaders
    const loadShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error compilando shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Error inicializando shader:", gl.getProgramInfoLog(shaderProgram));
      return;
    }

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, "u_resolution"),
        time: gl.getUniformLocation(shaderProgram, "u_time"),
        mouse: gl.getUniformLocation(shaderProgram, "u_mouse"),
      },
    };

    // Crear un cuadrado que cubra todo el canvas
    const positions = new Float32Array([
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    let animationFrameId;
    let startTime = Date.now();
    
    // Variables para el movimiento del ratón
    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      targetMousePos.x = e.clientX;
      targetMousePos.y = window.innerHeight - e.clientY; // Invertir Y para WebGL
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Rendimiento: Renderizar al 50% de la resolución del dispositivo.
      // Al ser mármol suavizado, el escalado CSS lo difumina perfectamente, 
      // multiplicando los FPS x4 en dispositivos de alta densidad (Retina).
      const dpr = 0.5; 
      const displayWidth = Math.floor(window.innerWidth * dpr);
      const displayHeight = Math.floor(window.innerHeight * dpr);
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.useProgram(programInfo.program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      // Lerp (suavizado) del ratón
      mousePos.x += (targetMousePos.x - mousePos.x) * 0.05;
      mousePos.y += (targetMousePos.y - mousePos.y) * 0.05;

      gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      gl.uniform2f(programInfo.uniformLocations.mouse, mousePos.x * dpr, mousePos.y * dpr);
      // Dividimos el tiempo para que el mármol se mueva MUY lentamente (dinámica sutil)
      gl.uniform1f(programInfo.uniformLocations.time, (Date.now() - startTime) / 3000.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-ink">
      {/* Componente dinámico de Mármol (Shader WebGL) */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-80"
      />
      {/* Filtro fotográfico (ruido DESATURADO) para darle textura física sin colores */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>
    </div>
  );
};

export default AmbientLight;
