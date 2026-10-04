import { useEffect, useRef, type RefObject } from 'react'
import { useTheme } from '../theme'

const VS = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 frag;
uniform vec2 uRes;
uniform vec2 uPtr;
uniform float uTime;
uniform float uDark;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  vec2 px = uv * uRes;
  float g = hash(floor(px * 0.55) + floor(uTime * 8.0));
  float fiber = 0.5 + 0.5 * sin(uv.x * uRes.x * 0.42 + g * 3.0);
  vec2 p = mix(vec2(0.52, 0.46), uPtr, 0.88);
  float blob = exp(-length((uv - p) * vec2(1.05, 1.35)) * 3.4);
  float blob2 = exp(-length((uv - vec2(1.0 - p.x, 0.62)) * vec2(1.35, 1.05)) * 4.6);

  vec3 cream = mix(vec3(0.969, 0.933, 0.894), vec3(0.145, 0.118, 0.098), uDark);
  vec3 gold = mix(vec3(0.765, 0.627, 0.529), vec3(0.831, 0.690, 0.549), uDark);
  vec3 rose = mix(vec3(0.831, 0.631, 0.580), vec3(0.545, 0.365, 0.325), uDark);
  vec3 brown = mix(vec3(0.561, 0.427, 0.322), vec3(0.290, 0.216, 0.173), uDark);

  vec3 col = cream;
  col = mix(col, gold, blob * 0.58 + fiber * 0.035);
  col = mix(col, rose, blob2 * 0.26);
  col = mix(col, brown, (1.0 - uv.y) * 0.10);
  col += (g - 0.5) * 0.042;
  frag = vec4(col, 1.0);
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

type Props = {
  host: RefObject<HTMLElement | null>
  pointer: RefObject<{ x: number; y: number }>
  active: boolean
}

export function HeroCanvas({ host, pointer, active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolved } = useTheme()

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    const frame = host.current
    if (!canvas || !frame) return

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VS)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FS)
    if (!vs || !fs) return
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uPtr = gl.getUniformLocation(program, 'uPtr')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uDark = gl.getUniformLocation(program, 'uDark')

    let raf = 0
    let visible = true
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(frame.clientWidth * dpr))
      const h = Math.max(1, Math.floor(frame.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    const draw = (now: number) => {
      if (!visible) return
      resize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      const nx = pointer.current.x * 0.5 + 0.5
      const ny = pointer.current.y * 0.5 + 0.5
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uPtr, nx, 1 - ny)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform1f(uDark, document.documentElement.dataset.theme === 'dark' ? 1 : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) raf = requestAnimationFrame(draw)
        else cancelAnimationFrame(raf)
      },
      { threshold: 0.05 },
    )
    io.observe(frame)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [active, host, pointer, resolved])

  if (!active) return null
  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
}
