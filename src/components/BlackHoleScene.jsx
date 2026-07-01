import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/* Orange / brown / amber palette */
const ORANGE = '#EA580C'
const RUST = '#B45309'
const AMBER = '#F59E0B'
const DARK = '#1A0F06'

/* The singularity — a dark sphere with a bright orange rim (event horizon) */
function Singularity() {
    const rimRef = useRef()
    useFrame((state) => {
        if (rimRef.current) {
            rimRef.current.rotation.z = state.clock.elapsedTime * 0.4
        }
    })
    return (
        <group>
            {/* dark core */}
            <mesh>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color={DARK} />
            </mesh>
            {/* bright orange rim glow */}
            <mesh ref={rimRef}>
                <torusGeometry args={[1.02, 0.04, 16, 100]} />
                <meshBasicMaterial color={ORANGE} transparent opacity={0.9} />
            </mesh>
            {/* soft halo */}
            <mesh scale={1.18}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color={ORANGE} transparent opacity={0.08} side={THREE.BackSide} />
            </mesh>
        </group>
    )
}

/* Deterministic seeded random for pure rendering */
function seededRandom(seed) {
    let s = seed
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

/* Accretion disk — flattened ring of bright orange particles spiralling inward */
function AccretionDisk({ count = 1400 }) {
    const points = useRef()
    const [geometry] = useState(() => {
        const rand = seededRandom(42)
        const positions = new Float32Array(count * 3)
        const data = []
        for (let i = 0; i < count; i++) {
            const r = 1.3 + Math.pow(rand(), 0.6) * 2.1
            const angle = rand() * Math.PI * 2
            const y = (rand() - 0.5) * 0.06
            positions[i * 3] = Math.cos(angle) * r
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = Math.sin(angle) * r
            data.push({ r, angle, speed: 0.3 / (r * 0.6) })
        }
        return { positions, data }
    })

    useFrame((_, delta) => {
        if (!points.current) return
        const pos = points.current.geometry.attributes.position.array
        const arr = geometry.data
        for (let i = 0; i < arr.length; i++) {
            const d = arr[i]
            d.angle += d.speed * delta
            // slow inward drift, respawn at outer edge
            d.r -= delta * 0.04
            if (d.r < 1.25) d.r = 3.4
            pos[i * 3] = Math.cos(d.angle) * d.r
            pos[i * 3 + 2] = Math.sin(d.angle) * d.r
        }
        points.current.geometry.attributes.position.needsUpdate = true
    })

    // vertex colors: hot orange inner → amber outer
    const colors = useMemo(() => {
        const rand = seededRandom(84)
        const c = new Float32Array(count * 3)
        const hot = new THREE.Color(ORANGE)
        const cool = new THREE.Color(AMBER)
        for (let i = 0; i < count; i++) {
            const t = rand()
            const col = hot.clone().lerp(cool, t)
            c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b
        }
        return c
    }, [count])

    return (
        <points ref={points} rotation={[Math.PI / 2.1, 0, 0]}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={geometry.positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    )
}

/* Orbiting security icon — a small glowing node on a tilted circular orbit */
function OrbitingIcon({ radius, speed, phase, tilt, color, label }) {
    const ref = useRef()
    useFrame((state) => {
        if (!ref.current) return
        const t = state.clock.elapsedTime * speed + phase
        const x = Math.cos(t) * radius
        const z = Math.sin(t) * radius
        // apply tilt around X axis
        ref.current.position.set(x, Math.sin(t) * radius * Math.sin(tilt), z * Math.cos(tilt))
    })
    return (
        <mesh ref={ref} position={[radius, 0, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color={color} />
            {/* glow */}
            <mesh scale={2.2}>
                <sphereGeometry args={[0.09, 12, 12]} />
                <meshBasicMaterial color={color} transparent opacity={0.18} />
            </mesh>
            {label && (
                <Html distanceFactor={6} center>
                    <div className="glass-strong" style={{
                        color: '#2A1B0E',
                        fontWeight: '700',
                        fontSize: '9px',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${color}40`,
                        boxShadow: `0 0 8px ${color}20, inset 0 0 3px ${color}10`,
                        marginTop: '15px',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 8px ${color}` }}></div>
                        {label}
                    </div>
                </Html>
            )}
        </mesh>
    )
}

/* Faint orbital ring guides */
function OrbitRing({ radius, tilt, color, opacity = 0.12 }) {
    return (
        <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
            <torusGeometry args={[radius, 0.004, 8, 100]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
    )
}

function Lights() {
    return (
        <>
            <ambientLight color="#FBF7F0" intensity={2} />
            <pointLight position={[0, 0, 0]} color={ORANGE} intensity={6} distance={6} />
            <pointLight position={[4, 3, 4]} color={AMBER} intensity={1.5} />
        </>
    )
}

export default function BlackHoleScene() {
    const orbits = useMemo(
        () => [
            { radius: 2.0, speed: 0.7, phase: 0, tilt: 0.2, color: ORANGE, label: 'Zero Trust' },
            { radius: 2.5, speed: -0.5, phase: 1.5, tilt: -0.4, color: AMBER, label: '0-Day Intel' },
            { radius: 3.0, speed: 0.35, phase: 3, tilt: 0.6, color: RUST, label: 'Red Team' },
            { radius: 2.2, speed: -0.6, phase: 4.5, tilt: -0.15, color: ORANGE, label: 'VAPT' },
            { radius: 2.8, speed: 0.45, phase: 2, tilt: 0.35, color: AMBER, label: 'SOC 2' },
        ],
        []
    )
    return (
        <Canvas
            camera={{ position: [0, 1.6, 6.5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
        >
            <Lights />
            <Singularity />
            <AccretionDisk count={600} />
            {orbits.map((o, i) => (
                <group key={i}>
                    <OrbitRing radius={o.radius} tilt={o.tilt} color={o.color} />
                    <OrbitingIcon {...o} />
                </group>
            ))}
        </Canvas>
    )
}
