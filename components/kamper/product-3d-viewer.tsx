"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows, Html } from "@react-three/drei"
import * as THREE from "three"

interface ProductModelProps {
  scrollProgress: number
  modelUrl?: string
}

function ProductModel({ scrollProgress, modelUrl }: ProductModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // If no model provided, show placeholder
  if (!modelUrl) {
    return (
      <group ref={groupRef}>
        <Html center>
          <div className="text-center p-8 bg-card/90 backdrop-blur rounded-lg border border-border">
            <p className="text-muted-foreground text-sm mb-2">3D Model Placeholder</p>
            <p className="text-xs text-muted-foreground/70">Upload a .glb file to enable</p>
          </div>
        </Html>
        {/* Placeholder box representing KAMPER */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.2, 1.5]} />
          <meshStandardMaterial color="#8B9A7D" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Red lid */}
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[2.05, 0.1, 1.55]} />
          <meshStandardMaterial color="#E85D4C" metalness={0.2} roughness={0.6} />
        </mesh>
      </group>
    )
  }

  const { scene } = useGLTF(modelUrl)
  
  useFrame(() => {
    if (groupRef.current) {
      // Rotate based on scroll progress (0-1 maps to 0-360 degrees)
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2
      // Slight tilt for better viewing
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  )
}

function PlaceholderModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main body - sage green */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.2, 1.5]} />
        <meshStandardMaterial color="#8B9A7D" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Red lid */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[2.05, 0.08, 1.55]} />
        <meshStandardMaterial color="#E85D4C" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.15]} />
        <meshStandardMaterial color="#9BA98C" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Dial */}
      <mesh position={[0.85, 0.1, 0.76]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
        <meshStandardMaterial color="#6B7A5D" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Dial ring */}
      <mesh position={[0.85, 0.1, 0.78]}>
        <torusGeometry args={[0.08, 0.015, 16, 32]} />
        <meshStandardMaterial color="#E85D4C" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  )
}

interface Product3DViewerProps {
  modelUrl?: string
  className?: string
}

export function Product3DViewer({ modelUrl, className = "" }: Product3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how far through the section we've scrolled
      const start = rect.top + windowHeight
      const end = rect.bottom
      const total = end - start + windowHeight
      const current = windowHeight - rect.top
      
      const progress = Math.max(0, Math.min(1, current / total))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className={`w-full h-[600px] ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} />
        
        <Suspense fallback={null}>
          {modelUrl ? (
            <ProductModel scrollProgress={scrollProgress} modelUrl={modelUrl} />
          ) : (
            <PlaceholderModel scrollProgress={scrollProgress} />
          )}
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
