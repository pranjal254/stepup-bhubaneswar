'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, Users, Calendar, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 0,
    minutes: 0,
    seconds: 10
  })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id="home" className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  variants={pulseVariants}
                  animate="animate"
                />
                <span className="text-sm font-medium text-gray-700">New Workshop Alert</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
                variants={titleVariants}
              >
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Dance is for
                </motion.span>
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Everyone
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Odisha's first curated dance workshop platform designed for anyone who loves to dance — no age, no experience limit.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mb-4"
              variants={containerVariants}
            >
              {[
                { number: "10+", label: "Workshops", color: "text-orange-500" },
                { number: "200+", label: "Dancers", color: "text-pink-500" },
                { number: "15+", label: "Choreographers", color: "text-purple-500" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  variants={statsVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div 
                    className={`text-3xl font-bold ${stat.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            

            {/* CTA Buttons */}
            <br/>
            <motion.div 
              className="flex flex-col sm:flex-row gap-8"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link href="#workshops" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Explore Workshops
                </Link>
              </motion.div>
              {/* <motion.button 
                className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play size={20} />
                </motion.div>
                <span>Watch Our Story</span>
              </motion.button> */}
            </motion.div>
          </motion.div>

          {/* Right Content - Next Workshop Card */}
          <motion.div 
            className="relative"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Workshop Card */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="space-y-6">
                {/* Header */}
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-green-400 rounded-full"
                      variants={pulseVariants}
                      animate="animate"
                    />
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Next Workshop</span>
                  </div>
                  <motion.div 
                    className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-red-600 font-medium">3 slots left</span>
                  </motion.div>
                </motion.div>

                {/* Workshop Details */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900"
                    whileHover={{ scale: 1.02 }}
                  >
                    Hip Hop Intensive
                  </motion.h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={18} />
                    <span>with Rahul Shetty from Mumbai</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>July 15-16, 2025</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>Bhubaneswar</span>
                    </div>
                  </div>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Registration closes in:</div>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(timeLeft).map(([unit, value], index) => (
                      <motion.div 
                        key={unit} 
                        className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 text-center border border-orange-100"
                        initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 1.3 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.div 
                          className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                          key={value} // This will trigger animation on value change
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {value.toString().padStart(2, '0')}
                        </motion.div>
                        <div className="text-xs text-gray-500 uppercase mt-1">
                          {unit}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Workshop Price & Register */}
                <motion.div 
                  className="pt-6 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl font-bold text-gray-900">₹1,500</div>
                      <div className="text-sm text-gray-500">per person</div>
                    </motion.div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold text-gray-900">2 Days</div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/register" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-center block">
                      Register Now
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              variants={floatingVariants}
              animate="animate"
              whileHover={{ 
                scale: 1.1,
                rotate: 15,
                transition: { duration: 0.2 }
              }}
            >
              <span className="text-white font-bold text-sm">HOT</span>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              variants={floatingVariants}
              animate="animate"
              style={{ 
                animationDelay: "1s" 
              }}
              whileHover={{ 
                scale: 1.2,
                rotate: -15,
                transition: { duration: 0.2 }
              }}
            >
              <Play className="text-white" size={20} />
            </motion.div>

            {/* Decorative Background Elements */}
            <motion.div
              className="absolute -z-10 top-10 right-10 w-32 h-32 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-20"
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
            
            <motion.div
              className="absolute -z-10 bottom-20 left-0 w-24 h-24 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}