/**
 * VeriClause AI - Interactive Liquid Orb & Molten Iridescence Background (WebGL)
 * Grounded in media_1790430666482.png (Monopo Saigon Aesthetic)
 * 
 * Features:
 *  - Massive reflective molten liquid orb & undulating fluid landscape
 *  - Iridescent chromatic atmosphere: Molten amber, sage green, metallic silver, deep charcoal
 *  - Dynamic mouse cursor reactivity: liquid deformation, specular glint, and camera deflection
 *  - Subtle film grain texture for high-fashion editorial feel
 *  - 60fps GPU-accelerated with graceful Canvas2D fallback
 */

(function initMoltenOrbBackground() {
  const canvas = document.getElementById("metallicCanvas");
  if (!canvas) return;

  const gl = canvas.getContext("webgl", { antialias: true, powerPreference: "high-performance" }) ||
             canvas.getContext("experimental-webgl");

  if (!gl) {
    console.warn("WebGL not supported, falling back to 2D canvas");
    init2DFallback(canvas);
    return;
  }

  // Vertex Shader
  const vsSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Fragment Shader replicating media_1790430666482.png
  const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;

    mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    // Pseudo-random noise for subtle film grain
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    // Smooth Distance Function for the massive molten orb & fluid folds
    float map(vec3 p) {
      vec2 m = (u_mouse - 0.5) * 2.0;
      float t = u_time * 0.32;

      // Center of the giant reflective molten sphere (shifted right/center as in reference image)
      vec3 sphereCenter = vec3(0.55 + m.x * 0.15, -0.05 + m.y * 0.12, 0.0);
      vec3 sp = p - sphereCenter;

      // Mouse gravitational deformation
      float dMouse = length(p.xy - vec2(m.x * 1.2, m.y * 0.9));
      float mouseDisplace = exp(-dMouse * 1.5) * 0.22;

      // Organic liquid ripples across the sphere's surface
      float wave1 = sin(sp.x * 2.4 + t * 0.8) * cos(sp.y * 2.0 + t * 0.6) * sin(sp.z * 2.2 + t * 0.7);
      float wave2 = sin(sp.x * 4.5 - t) * cos(sp.z * 4.0 + t * 0.5) * 0.04;
      
      // Radius of the giant orb
      float radius = 1.72 + wave1 * 0.09 + wave2 - mouseDisplace;
      float dSphere = length(sp) - radius;

      // Ambient liquid backdrop waves on the left
      vec3 bp = p;
      bp.xy *= rot(0.25);
      float bgWave = sin(bp.x * 1.4 + t * 0.4) * cos(bp.y * 1.2 + t * 0.5) * 0.35;
      float dBack = (p.z + 1.4) + bgWave;

      return min(dSphere, max(dBack, 0.01));
    }

    vec3 calcNormal(vec3 p) {
      const float eps = 0.003;
      vec2 h = vec2(eps, 0.0);
      return normalize(vec3(
        map(p + h.xyy) - map(p - h.xyy),
        map(p + h.yxy) - map(p - h.yxy),
        map(p + h.yyx) - map(p - h.yyx)
      ));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

      // Camera setup
      vec3 ro = vec3(0.0, 0.0, 3.8);
      vec3 rd = normalize(vec3(uv, -1.5));

      // Dynamic mouse camera tilt
      vec2 m = (u_mouse - 0.5) * 0.5;
      rd.xy += m * 0.18;
      rd = normalize(rd);

      // Raymarching
      float t = 0.0;
      float maxDist = 8.0;
      int hit = 0;

      for (int i = 0; i < 72; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        if (d < 0.002) {
          hit = 1;
          break;
        }
        if (t > maxDist) break;
        t += d * 0.72;
      }

      // Exact Palette from media_1790430666482.png:
      // - Deep Charcoal Foundation: vec3(0.06, 0.07, 0.08)
      // - Molten Amber Gold:        vec3(0.85, 0.62, 0.28)
      // - Sage Metallic Green:      vec3(0.48, 0.68, 0.50)
      // - Metallic Silver:          vec3(0.68, 0.71, 0.74)
      // - Soft White:               vec3(0.96, 0.96, 0.96)

      // Background ambient wash
      float bgGrad = smoothstep(-1.0, 1.0, uv.x + uv.y * 0.5);
      vec3 col = mix(vec3(0.05, 0.06, 0.07), vec3(0.09, 0.10, 0.11), bgGrad);
      
      // Left ambient iridescent glow (amber dissolving into sage)
      float leftGlow = smoothstep(0.4, -0.9, uv.x);
      col += mix(vec3(0.72, 0.50, 0.20), vec3(0.35, 0.55, 0.38), uv.y * 0.5 + 0.5) * leftGlow * 0.18;

      if (hit == 1) {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p);
        vec3 v = -rd;

        // Key light (top right), Rim light (top left), and Interactive Mouse light
        vec3 lKey = normalize(vec3(1.1, 1.3, 1.2));
        vec3 lRim = normalize(vec3(-1.2, -0.6, 0.5));
        vec3 lMouse = normalize(vec3(m.x * 2.5, m.y * 2.5, 1.5));

        // Diffuse components
        float diffKey = max(dot(n, lKey), 0.0);
        float diffRim = max(dot(n, lRim), 0.0);
        float diffMouse = max(dot(n, lMouse), 0.0);

        // Specular Blinn-Phong highlights
        vec3 hKey = normalize(lKey + v);
        vec3 hMouse = normalize(lMouse + v);
        float specKey = pow(max(dot(n, hKey), 0.0), 42.0);
        float specMouse = pow(max(dot(n, hMouse), 0.0), 30.0);

        // Fresnel grazing reflection (the signature iridescent rim from the image!)
        float NdotV = max(dot(n, v), 0.0);
        float fresnel = pow(1.0 - NdotV, 3.2);

        // Base shading
        vec3 shadow = vec3(0.06, 0.07, 0.08);
        vec3 midTone = mix(shadow, vec3(0.20, 0.22, 0.25), diffKey * 0.8 + diffRim * 0.3);

        // Molten Amber & Sage Iridescent Edge Glow
        // Matches the glowing rim seen in media_1790430666482.png
        float rimPhase = sin(atan(n.y, n.x) * 2.0 + u_time * 0.3);
        vec3 rimColor = mix(vec3(0.85, 0.62, 0.28), vec3(0.48, 0.68, 0.50), rimPhase * 0.5 + 0.5);

        // Blend metallic silver with iridescent rim
        vec3 metallicSurface = mix(midTone, vec3(0.68, 0.71, 0.74), fresnel * 0.7 + diffMouse * 0.35);
        metallicSurface += rimColor * fresnel * 0.95;

        // Pure specular highlight
        vec3 specular = vec3(0.96, 0.96, 0.96) * (specKey * 0.95 + specMouse * 0.85);

        col = metallicSurface + specular;

        // Smooth depth fog towards charcoal
        float fog = smoothstep(1.5, 7.5, t);
        col = mix(col, vec3(0.06, 0.07, 0.08), fog * 0.55);
      }

      // Subtle editorial film grain texture
      float grain = (hash(gl_FragCoord.xy + fract(u_time * 1.5)) - 0.5) * 0.028;
      col += vec3(grain);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  const uResolution = gl.getUniformLocation(program, "u_resolution");
  const uTime = gl.getUniformLocation(program, "u_time");
  const uMouse = gl.getUniformLocation(program, "u_mouse");

  let targetMouseX = 0.5;
  let targetMouseY = 0.5;
  let currentMouseX = 0.5;
  let currentMouseY = 0.5;
  let startTime = performance.now();

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
  }

  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    targetMouseX = e.clientX / window.innerWidth;
    targetMouseY = 1.0 - (e.clientY / window.innerHeight);
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      targetMouseX = e.touches[0].clientX / window.innerWidth;
      targetMouseY = 1.0 - (e.touches[0].clientY / window.innerHeight);
    }
  }, { passive: true });

  function render() {
    currentMouseX += (targetMouseX - currentMouseX) * 0.06;
    currentMouseY += (targetMouseY - currentMouseY) * 0.06;

    const elapsed = (performance.now() - startTime) * 0.001;

    gl.uniform1f(uTime, elapsed);
    gl.uniform2f(uMouse, currentMouseX, currentMouseY);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();

function init2DFallback(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width, height;
  let mouseX = 0.5, mouseY = 0.5;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / width;
    mouseY = e.clientY / height;
  });

  function draw() {
    ctx.fillStyle = "#0c0e12";
    ctx.fillRect(0, 0, width, height);

    const grad = ctx.createRadialGradient(
      width * 0.6 + (mouseX - 0.5) * 100, height * 0.5 + (mouseY - 0.5) * 100, 40,
      width * 0.6, height * 0.5, width * 0.65
    );
    grad.addColorStop(0, "rgba(220, 160, 60, 0.45)");
    grad.addColorStop(0.3, "rgba(140, 185, 145, 0.35)");
    grad.addColorStop(0.7, "rgba(58, 65, 74, 0.5)");
    grad.addColorStop(1, "#0c0e12");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    requestAnimationFrame(draw);
  }
  draw();
}
