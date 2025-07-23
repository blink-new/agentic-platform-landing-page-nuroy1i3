import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Text3D, 
  Environment, 
  Float, 
  Sphere, 
  MeshDistortMaterial,
  Html,
  useTexture,
  Sparkles,
  Stars,
  Cloud,
  Sky,
  ContactShadows,
  PerspectiveCamera,
  Effects
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Glitch } from '@react-three/postprocessing'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/three'
import { Shield, Zap, Eye, Brain, Lock, TrendingUp, Users, Award, ChevronRight, Play, Cpu, Database, Network } from 'lucide-react'
import * as THREE from 'three'

// Futuristic 3D AI Brain Component
function AIBrain({ position = [0, 0, 0] }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  })

  return (
    <animated.group scale={scale}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh
          ref={meshRef}
          position={position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#3B82F6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        <Sparkles count={50} scale={3} size={2} speed={0.4} color="#60A5FA" />
      </Float>
    </animated.group>
  )
}

// Floating Security Shield 3D Model
function SecurityShield({ position = [0, 0, 0] }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 6]} />
        <meshStandardMaterial
          color="#10B981"
          metalness={0.9}
          roughness={0.1}
          emissive="#065F46"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[position[0], position[1], position[2] + 0.05]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 6]} />
        <meshStandardMaterial
          color="#34D399"
          metalness={0.8}
          roughness={0.2}
          emissive="#10B981"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

// Holographic Data Visualization
function DataVisualization({ position = [0, 0, 0] }) {
  const groupRef = useRef()
  const [data] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      height: Math.random() * 2 + 0.5,
      color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`
    }))
  )

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.children.forEach((child, i) => {
        child.scale.y = data[i].height + Math.sin(state.clock.elapsedTime + i) * 0.3
      })
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {data.map((item, i) => (
        <mesh key={item.id} position={[
          Math.cos((i / data.length) * Math.PI * 2) * 1.5,
          0,
          Math.sin((i / data.length) * Math.PI * 2) * 1.5
        ]}>
          <boxGeometry args={[0.1, item.height, 0.1]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10B981" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#60A5FA" />

      {/* Environment */}
      <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade />
      <Environment preset="night" />
      
      {/* 3D Models */}
      <AIBrain position={[0, 0, 0]} />
      <SecurityShield position={[4, 1, -2]} />
      <DataVisualization position={[-4, -1, -3]} />
      
      {/* Floating Particles */}
      <Sparkles count={100} scale={10} size={3} speed={0.2} color="#3B82F6" />
      
      {/* Ground Reflection */}
      <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={20} blur={2} />
      
      {/* Post Processing Effects */}
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.9} />
        <ChromaticAberration offset={[0.001, 0.001]} />
      </EffectComposer>
    </>
  )
}

// Enhanced Futuristic UI Components
const FuturisticCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.8, delay, type: "spring" }}
    whileHover={{ 
      scale: 1.05, 
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
    }}
    className={`
      relative group bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
      backdrop-blur-2xl border border-cyan-400/30 rounded-3xl p-8
      shadow-2xl hover:border-cyan-300/60 transition-all duration-700
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-cyan-500/20 before:via-blue-500/20 before:to-purple-500/20 
      before:rounded-3xl before:opacity-0 before:group-hover:opacity-100
      before:transition-opacity before:duration-700
      after:absolute after:inset-0 after:rounded-3xl
      after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent
      after:translate-x-[-100%] after:group-hover:translate-x-[100%]
      after:transition-transform after:duration-1000
      ${className}
    `}
  >
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
)

const NeonButton = ({ children, variant = "primary", className = "", ...props }) => (
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      boxShadow: variant === "primary" 
        ? "0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.3)" 
        : "0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(34, 197, 94, 0.3)"
    }}
    whileTap={{ scale: 0.95 }}
    className={`
      relative px-10 py-4 rounded-2xl font-bold text-lg
      transition-all duration-500 overflow-hidden group
      ${variant === "primary" 
        ? `bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white 
           shadow-lg shadow-blue-500/30 border border-blue-400/50
           hover:from-blue-500 hover:via-cyan-500 hover:to-blue-600` 
        : `bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 
           text-cyan-300 border-2 border-cyan-400/40 hover:border-cyan-300/80
           hover:bg-gradient-to-r hover:from-slate-700/90 hover:via-slate-600/90 hover:to-slate-700/90`
      }
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-100%] before:group-hover:translate-x-[100%]
      before:transition-transform before:duration-700
      after:absolute after:inset-0 after:rounded-2xl
      after:bg-gradient-to-r after:from-cyan-400/20 after:to-blue-400/20
      after:opacity-0 after:group-hover:opacity-100 after:transition-opacity after:duration-500
      ${className}
    `}
    {...props}
  >
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
    </span>
  </motion.button>
)

const HolographicText = ({ children, className = "", gradient = "from-cyan-300 via-blue-400 to-purple-400" }) => (
  <motion.span
    className={`
      bg-gradient-to-r ${gradient} bg-clip-text text-transparent
      drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]
      ${className}
    `}
    animate={{
      textShadow: [
        "0 0 10px rgba(59,130,246,0.5)",
        "0 0 20px rgba(59,130,246,0.8)",
        "0 0 10px rgba(59,130,246,0.5)"
      ]
    }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    {children}
  </motion.span>
)

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full mb-6 mx-auto"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
              >
                Initializing Credio...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Futuristic Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 w-full z-40 bg-slate-950/70 backdrop-blur-2xl border-b border-cyan-400/30"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent px-4 py-2">
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(34,211,238,0.5)",
                      "0 0 20px rgba(34,211,238,0.8)",
                      "0 0 10px rgba(34,211,238,0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Credio
                </motion.span>
              </div>
            </motion.div>

            {/* Enhanced Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {['Solutions', 'Platform', 'Security', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ 
                    scale: 1.1, 
                    textShadow: "0 0 10px rgba(34,211,238,0.8)"
                  }}
                  className="relative group text-slate-300 hover:text-cyan-300 transition-all duration-300 font-medium"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 blur-sm"></div>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <NeonButton className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Get Started
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-cyan-300 rounded-full"
              />
            </NeonButton>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section with 3D Scene */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <Canvas>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        {/* Enhanced Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-7xl md:text-9xl font-bold mb-8 leading-tight"
          >
            <HolographicText className="block">
              Next-Gen
            </HolographicText>
            <motion.span 
              className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AI Agents
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Revolutionary vertical AI agents for <HolographicText gradient="from-cyan-400 to-blue-400">fraud detection</HolographicText>, 
            <HolographicText gradient="from-blue-400 to-purple-400"> compliance monitoring</HolographicText>, 
            and <HolographicText gradient="from-purple-400 to-cyan-400">security automation</HolographicText>. 
            Built for the future of enterprise intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <NeonButton className="flex items-center gap-3 text-xl px-12 py-5">
              <Play className="w-6 h-6" />
              Experience Demo
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full"
              />
            </NeonButton>
            <NeonButton variant="secondary" className="flex items-center gap-3 text-xl px-12 py-5">
              <Database className="w-6 h-6" />
              Learn More
              <ChevronRight className="w-6 h-6" />
            </NeonButton>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center relative"
          >
            <motion.div
              animate={{ 
                y: [0, 16, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mt-2"
            />
            <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur animate-pulse" />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: 99.9, suffix: "%", label: "Threat Detection Accuracy", icon: Shield },
              { number: 10000, suffix: "+", label: "Enterprises Protected", icon: Users },
              { number: 50, suffix: "M+", label: "Transactions Monitored", icon: TrendingUp },
              { number: 24, suffix: "/7", label: "Real-time Monitoring", icon: Eye }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative group bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 text-center hover:border-cyan-300/40 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  whileHover={{ rotateY: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="relative z-10 text-5xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="relative z-10 text-slate-400 text-lg font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced AI Agents Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              <HolographicText>
                Specialized AI Agents
              </HolographicText>
            </h2>
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto">
              Purpose-built intelligent agents that understand your industry's unique challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Fraud Detection Agent",
                description: "Advanced pattern recognition and anomaly detection to identify fraudulent activities in real-time with 99.9% accuracy.",
                features: ["Real-time Analysis", "Pattern Recognition", "Risk Scoring", "Alert System"],
                gradient: "from-red-500 to-orange-500"
              },
              {
                icon: Eye,
                title: "Compliance Agent", 
                description: "Automated compliance monitoring and reporting across multiple regulatory frameworks and jurisdictions.",
                features: ["Regulatory Tracking", "Automated Reports", "Risk Assessment", "Audit Trails"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Lock,
                title: "Security Agent",
                description: "Proactive threat detection and response system that adapts to emerging security challenges.",
                features: ["Threat Intelligence", "Incident Response", "Vulnerability Scanning", "Security Analytics"],
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((agent, i) => (
              <FuturisticCard key={i} delay={i * 0.2}>
                <motion.div
                  whileHover={{ rotateY: 10, scale: 1.02 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ 
                      rotateZ: 360, 
                      scale: 1.2,
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                    }}
                    transition={{ duration: 0.8 }}
                    className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${agent.gradient} rounded-3xl flex items-center justify-center relative`}
                  >
                    <agent.icon className="w-12 h-12 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">
                    <HolographicText>{agent.title}</HolographicText>
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">{agent.description}</p>
                  <div className="space-y-3">
                    {agent.features.map((feature, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 10, scale: 1.05 }}
                        transition={{ delay: i * 0.2 + j * 0.1 }}
                        className="flex items-center text-cyan-300 bg-slate-800/30 rounded-lg p-3 border border-cyan-400/20 hover:border-cyan-300/40 transition-all duration-300"
                      >
                        <Zap className="w-5 h-5 mr-3 text-cyan-400" />
                        <span className="font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </FuturisticCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
            <div className="relative z-10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-2xl border border-cyan-400/30 rounded-3xl p-16">
              <h2 className="text-6xl md:text-7xl font-bold mb-8">
                Ready to Transform Your
                <br />
                <HolographicText>Security?</HolographicText>
              </h2>
              <p className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
                Join thousands of enterprises already protected by our AI agents
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <NeonButton className="text-xl px-16 py-6 flex items-center gap-3">
                  <Network className="w-6 h-6" />
                  Start Free Trial
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-3 h-3 bg-cyan-300 rounded-full"
                  />
                </NeonButton>
                <NeonButton variant="secondary" className="text-xl px-16 py-6 flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  Schedule Demo
                </NeonButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 border-t border-slate-800/50 bg-gradient-to-r from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
          >
            <HolographicText>Credio</HolographicText>
          </motion.div>
          <p className="text-slate-400 text-lg">
            © 2024 Credio. Securing the future with intelligent automation.
          </p>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
          />
        </div>
      </footer>
    </div>
  )
}