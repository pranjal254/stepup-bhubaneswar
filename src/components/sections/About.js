'use client'

import { useRef, useEffect, useState } from 'react'
import { Heart, Star, Users, Zap, Target, Sparkles, Music, Award } from 'lucide-react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  })
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax effects (disabled on mobile for performance)
  const y = isMobile ? 0 : useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = isMobile ? 1 : useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "For Everyone",
      description: "No age limits, no experience required. Dance is a universal language that brings joy to all.",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      delay: 0.1
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "Top Choreographers",
      description: "Learn from India's finest dance artists who bring their expertise straight to Bhubaneswar.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      delay: 0.2
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Community First",
      description: "More than classes - we're building a vibrant dance community that celebrates movement together.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      delay: 0.3
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Weekend Energy",
      description: "High-energy weekend sessions designed to fit your schedule and ignite your passion for dance.",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      delay: 0.4
    }
  ]

  const stats = [
    { number: "2024", label: "Founded", icon: <Target className="w-6 h-6" /> },
    { number: "50+", label: "Workshops", icon: <Music className="w-6 h-6" /> },
    { number: "25+", label: "Choreographers", icon: <Award className="w-6 h-6" /> },
    { number: "1000+", label: "Happy Dancers", icon: <Sparkles className="w-6 h-6" /> }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Determine if we should animate or show immediately
  const shouldAnimate = isMobile ? true : isInView

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden mobile-visible" ref={ref}>
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-20"
        style={{ y, opacity }}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <motion.div 
                className="inline-flex items-center space-x-2 bg-orange-50 rounded-full px-4 py-2 border border-orange-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-orange-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-orange-600">About Step Up</span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
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
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Step Up Bhubaneswar is Odisha's first curated dance workshop platform designed for anyone who loves to dance — no age, no experience limit. We bring top choreographers from across India to Bhubaneswar for high-energy, weekend-based dance sessions.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Whether you're a working professional, a student, or a homemaker, our workshops are crafted to inspire movement, joy, and community. More than a class — it's a celebration of dance for the people, by the people.
              </motion.p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
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
                    <motion.div className="text-orange-500">
                      {stat.icon}
                    </motion.div>
                  </motion.div>
                  <div className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Vision Card */}
            <motion.div 
              className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.h3 
                className="text-xl font-bold text-gray-900 mb-3 relative z-10"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Our Vision
              </motion.h3>
              <motion.p 
                className="text-gray-700 leading-relaxed relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                To make Bhubaneswar a cultural dance hub that connects passionate individuals — regardless of age or background — with India's finest choreographers, building a vibrant, inclusive dance culture where every workshop inspires a spark.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${feature.bgColor} rounded-2xl p-6 border border-gray-100 group relative overflow-hidden`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Background decoration */}
                  <motion.div
                    className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full opacity-10`}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.5
                    }}
                  />
                  
                  <div className="space-y-4 relative z-10">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                      animate={{
                        boxShadow: [
                          "0 4px 20px rgba(0,0,0,0.1)",
                          "0 8px 30px rgba(0,0,0,0.2)",
                          "0 4px 20px rgba(0,0,0,0.1)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div 
                        className="text-white"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.icon}
                      </motion.div>
                    </motion.div>
                    
                    <div>
                      <motion.h3 
                        className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.6 + index * 0.1 
                        }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Quote Section */}
            <motion.div 
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Quote decoration */}
              <motion.div
                className="absolute top-4 left-4 text-6xl text-purple-200 font-serif"
                initial={{ opacity: 0, scale: 0 }}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                "
              </motion.div>
              
              <motion.blockquote 
                className="text-lg font-medium text-gray-900 italic mb-4 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                Dance is not just for dancers. It's for everyone who feels the rhythm.
              </motion.blockquote>
              
              <motion.div 
                className="flex items-center space-x-3 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
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
              </motion.div>

              {/* Floating elements in quote */}
              <motion.div
                className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-30"
                animate={{
                  y: [-5, 5, -5],
                  x: [-2, 2, -2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}