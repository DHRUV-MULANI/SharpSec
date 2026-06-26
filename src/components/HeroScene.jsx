import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Float, Stars, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Earth({ mousePos }) {
    const meshRef = useRef()
    const ringRef = useRef()

    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.y += 0.002
        meshRef.current.rotation.x = mousePos.current.y * 0.1
        meshRef.current.rotation.z = mousePos.current.x * 0.05
        if (ringRef.current) {
            ringRef.current.rotation.z += 0.003
        }
    })

    return (
        <group>
            {/* Main Earth sphere */}
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <sphereGeometry args={[1.8, 64, 64]} />
                    <MeshDistortMaterial
                        color="#0a1628"
                        emissive="#001133"
                        emissiveIntensity={0.3}
                        roughness={0.8}
                        metalness={0.2}
                        distort={0.1}
                        speed={2}
                    />
                </mesh>

                {/* Atmosphere glow */}
                <mesh scale={[1.12, 1.12, 1.12]}>
                    <sphereGeometry args={[1.8, 32, 32]} />
                    <meshBasicMaterial
                        color="#00D4FF"
                        transparent
                        opacity={0.05}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Outer atmosphere */}
                <mesh scale={[1.25, 1.25, 1.25]}>
                    <sphereGeometry args={[1.8, 32, 32]} />
                    <meshBasicMaterial
                        color="#7C3AED"
                        transparent
                        opacity={0.025}
                        side={THREE.BackSide}
                    />
                </mesh>
            </Float>

            {/* Orbiting ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[2.8, 0.015, 8, 100]} />
                <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
            </mesh>
            <mesh rotation={[Math.PI / 2.5, 0.5, 0]}>
                <torusGeometry args={[3.2, 0.008, 8, 100]} />
                <meshBasicMaterial color="#7C3AED" transparent opacity={0.3} />
            </mesh>
        </group>
    )
}

function NetworkNodes({ count = 60 }) {
    const nodes = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8 - 4
            ],
            size: Math.random() * 0.04 + 0.02,
            color: Math.random() > 0.5 ? '#00D4FF' : '#7C3AED',
            speed: Math.random() * 0.5 + 0.1,
            phase: Math.random() * Math.PI * 2
        }))
    }, [count])

    const meshRefs = useRef([])

    useFrame((state) => {
        meshRefs.current.forEach((mesh, i) => {
            if (!mesh) return
            const node = nodes[i]
            mesh.position.y = nodes[i].position[1] + Math.sin(state.clock.elapsedTime * node.speed + node.phase) * 0.3
            mesh.material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + node.phase) * 0.3
        })
    })

    return (
        <>
            {nodes.map((node, i) => (
                <mesh
                    key={i}
                    ref={(el) => (meshRefs.current[i] = el)}
                    position={node.position}
                >
                    <sphereGeometry args={[node.size, 8, 8]} />
                    <meshBasicMaterial color={node.color} transparent opacity={0.6} />
                </mesh>
            ))}
        </>
    )
}

function ConnectionLines({ count = 25 }) {
    const lines = useMemo(() => {
        return Array.from({ length: count }, () => {
            const points = []
            const start = new THREE.Vector3(
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 6 - 3
            )
            const end = new THREE.Vector3(
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 6 - 3
            )
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
            mid.z += Math.random() * 2 - 1

            const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
            return curve.getPoints(20)
        })
    }, [count])

    return (
        <>
            {lines.map((points, i) => {
                const geometry = new THREE.BufferGeometry().setFromPoints(points)
                return (
                    <line key={i} geometry={geometry}>
                        <lineBasicMaterial
                            color={i % 2 === 0 ? '#00D4FF' : '#7C3AED'}
                            transparent
                            opacity={0.15}
                        />
                    </line>
                )
            })}
        </>
    )
}

function DataPackets({ count = 20 }) {
    const packets = useRef([])
    const data = useMemo(() => Array.from({ length: count }, (_, i) => {
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8, -2),
            new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 0),
            new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8, -2)
        )
        return { curve, offset: Math.random(), speed: Math.random() * 0.3 + 0.1 }
    }), [count])

    useFrame((state) => {
        packets.current.forEach((mesh, i) => {
            if (!mesh) return
            const d = data[i]
            const t = ((state.clock.elapsedTime * d.speed + d.offset) % 1)
            const pos = d.curve.getPoint(t)
            mesh.position.copy(pos)
        })
    })

    return (
        <>
            {data.map((_, i) => (
                <mesh key={i} ref={(el) => (packets.current[i] = el)}>
                    <boxGeometry args={[0.05, 0.05, 0.05]} />
                    <meshBasicMaterial color="#00FFC8" transparent opacity={0.8} />
                </mesh>
            ))}
        </>
    )
}

function DigitalGrid() {
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        const vertices = []
        const size = 20
        const divisions = 30

        for (let i = 0; i <= divisions; i++) {
            const x = (i / divisions - 0.5) * size
            vertices.push(x, -4, -10, x, -4, 10)
            vertices.push(-10, -4, (i / divisions - 0.5) * size, 10, -4, (i / divisions - 0.5) * size)
        }

        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        return geo
    }, [])

    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial color="#00D4FF" transparent opacity={0.04} />
        </lineSegments>
    )
}

function AuroraLights() {
    const light1Ref = useRef()
    const light2Ref = useRef()

    useFrame((state) => {
        if (light1Ref.current) {
            light1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5
            light1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 3
        }
        if (light2Ref.current) {
            light2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 5
            light2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 3
        }
    })

    return (
        <>
            <pointLight ref={light1Ref} color="#00D4FF" intensity={2} distance={15} />
            <pointLight ref={light2Ref} color="#7C3AED" intensity={2} distance={15} />
            <ambientLight color="#060a14" intensity={3} />
            <directionalLight color="#ffffff" intensity={0.5} position={[5, 5, 5]} />
        </>
    )
}

function CameraRig({ mousePos, scrollY }) {
    const { camera } = useThree()

    useFrame((state) => {
        const targetX = mousePos.current.x * 0.3
        const targetY = mousePos.current.y * 0.2
        camera.position.x += (targetX - camera.position.x) * 0.02
        camera.position.y += (targetY - camera.position.y) * 0.02
        camera.position.z = 8 + scrollY.current * 0.005
        camera.lookAt(0, 0, 0)
    })

    return null
}

export default function HeroScene({ mousePos, scrollY }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
            style={{ position: 'absolute', inset: 0 }}
        >
            <AuroraLights />
            <Stars radius={80} depth={40} count={3000} factor={3} fade speed={0.5} />
            <DigitalGrid />
            <Earth mousePos={mousePos} />
            <NetworkNodes count={50} />
            <ConnectionLines count={20} />
            <DataPackets count={15} />
            <CameraRig mousePos={mousePos} scrollY={scrollY} />
        </Canvas>
    )
}
