'use client'

import { useRef, useEffect, useState } from 'react'
import { Heart, Star, Users, Zap, Target, Sparkles, Music, Award } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  // ALL HOOKS MUST BE CALLED FIRST - BEFORE ANY CONDITIONALS
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  })
  
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // ALL useEffect hooks must be called before any returns
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Data definitions
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: "For Everyone",
      description: "No age limits, no experience required. Dance is a universal language that brings joy to all.",
      bgColor: "from-pink-50 to-rose-50"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Top Choreographers", 
      description: "Learn from India's finest dance artists who bring their expertise straight to Bhubaneswar.",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Community First",
      description: "More than classes - we're building a vibrant dance community that celebrates movement together.",
      bgColor: "from-blue-50 to-indigo-50"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Weekend Energy",
      description: "High-energy weekend sessions designed to fit your schedule and ignite your passion for dance.",
      bgColor: "from-orange-50 to-red-50"
    }
  ]

  const stats = [
    { number: "2024", label: "Founded", icon: <Target className="w-6 h-6" /> },
    { number: "10+", label: "Workshops", icon: <Music className="w-6 h-6" /> },
    { number: "25+", label: "Choreographers", icon: <Award className="w-6 h-6" /> },
    { number: "1000+", label: "Happy Dancers", icon: <Sparkles className="w-6 h-6" /> }
  ]

  // NOW we can conditionally render after all hooks are called
  const shouldAnimate = isMounted && !isMobile && isInView
  const showContent = isMounted

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden mobile-visible" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          {isMobile || !showContent ? (
            // Simple mobile/loading version - no complex animations
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-orange-50 rounded-full px-4 py-2 border border-orange-200">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm font-medium text-orange-600">About Step Up</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Where{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Passion
                  </span>{" "}
                  Meets{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Movement
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Step Up Bhubaneswar is Odisha's first curated dance workshop platform designed for anyone who loves to dance — no age, no experience limit. We bring top choreographers from across India to Bhubaneswar for high-energy, weekend-based dance sessions.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're a working professional, a student, or a homemaker, our workshops are crafted to inspire movement, joy, and community. More than a class — it's a celebration of dance for the people, by the people.
                </p>
              </div>

              {/* Stats Section - Simple Version */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <div className="text-orange-500">{stat.icon}</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Vision Card - Simple Version */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To make Bhubaneswar a cultural dance hub that connects passionate individuals — regardless of age or background — with India's finest choreographers, building a vibrant, inclusive dance culture where every workshop inspires a spark.
                </p>
              </div>
            </div>
          ) : (
            // Animated desktop version
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6">
                <motion.div 
                  className="inline-flex items-center space-x-2 bg-orange-50 rounded-full px-4 py-2 border border-orange-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm font-medium text-orange-600">About Step Up</span>
                </motion.div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Where{" "}
                  <motion.span 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Passion
                  </motion.span>{" "}
                  Meets{" "}
                  <motion.span 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Movement
                  </motion.span>
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Step Up Bhubaneswar is Odisha's first curated dance workshop platform designed for anyone who loves to dance — no age, no experience limit. We bring top choreographers from across India to Bhubaneswar for high-energy, weekend-based dance sessions.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're a working professional, a student, or a homemaker, our workshops are crafted to inspire movement, joy, and community. More than a class — it's a celebration of dance for the people, by the people.
                </p>
              </div>

              {/* Stats Section - Animated */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:from-orange-200 group-hover:to-pink-200 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-orange-500">{stat.icon}</div>
                    </motion.div>
                    <div className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Vision Card - Animated */}
              <motion.div 
                className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To make Bhubaneswar a cultural dance hub that connects passionate individuals — regardless of age or background — with India's finest choreographers, building a vibrant, inclusive dance culture where every workshop inspires a spark.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Right Content - Features Grid */}
          {isMobile || !showContent ? (
            // Simple mobile/loading version
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${feature.bgColor} rounded-2xl p-6 border border-gray-100`}
                  >
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote Section - Simple */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="text-6xl text-purple-200 font-serif mb-4">"</div>
                <blockquote className="text-lg font-medium text-gray-900 italic mb-4">
                  Dance is not just for dancers. It's for everyone who feels the rhythm.
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Step Up Team</div>
                    <div className="text-sm text-gray-600">Bhubaneswar</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Animated desktop version
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`bg-gradient-to-br ${feature.bgColor} rounded-2xl p-6 border border-gray-100 group relative overflow-hidden`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      transition: { 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }}
                  >
                    <div className="space-y-4 relative z-10">
                      <motion.div 
                        className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm"
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote Section - Animated */}
              <motion.div 
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-6xl text-purple-200 font-serif mb-4">"</div>
                <blockquote className="text-lg font-medium text-gray-900 italic mb-4">
                  Dance is not just for dancers. It's for everyone who feels the rhythm.
                </blockquote>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <span className="text-white font-bold text-sm">S</span>
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">Step Up Team</div>
                    <div className="text-sm text-gray-600">Bhubaneswar</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}