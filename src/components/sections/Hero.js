'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Calendar, MapPin, Music, Star, Clock, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  // Real data from API
  const [workshopData, setWorkshopData] = useState({
    totalRegistrations: 0,
    totalSlots: 500,
    revenue: 0,
    isLoading: true
  })

  // Workshop date - September 21, 2025
  const workshopDate = new Date('2025-09-21T10:00:00')

  // Fetch real registration data
  const fetchWorkshopData = async () => {
    try {
      const response = await fetch('/api/register')
      if (response.ok) {
        const data = await response.json()
        setWorkshopData({
          totalRegistrations: data.stats?.total || 0,
          totalSlots: 500,
          revenue: data.stats?.revenue || 0,
          isLoading: false
        })
      } else {
        // Fallback data if API fails
        setWorkshopData({
          totalRegistrations: 0,
          totalSlots: 500,
          revenue: 0,
          isLoading: false
        })
      }
    } catch (error) {
      console.error('Failed to fetch workshop data:', error)
      setWorkshopData({
        totalRegistrations: 0,
        totalSlots: 500,
        revenue: 0,
        isLoading: false
      })
    }
  }

  // Load data on component mount
  useEffect(() => {
    fetchWorkshopData()
  }, [])

  // Calculate time until workshop
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = workshopDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  // Calculate pricing and availability
  const isEarlyBird = workshopData.totalRegistrations < 30
  const spotsLeft = workshopData.totalSlots - workshopData.totalRegistrations
  const startingPrice = isEarlyBird ? 899 : 1199
  const isWorkshopFull = spotsLeft <= 0
  const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0

  // Get urgency message
  const getUrgencyMessage = () => {
    if (isWorkshopFull) return "Workshop Full!"
    if (isAlmostFull) return `Only ${spotsLeft} spots left!`
    if (isEarlyBird) return `Early Bird - ${30 - workshopData.totalRegistrations} spots left at special price`
    return "Registration Open"
  }

  // Get urgency color
  const getUrgencyColor = () => {
    if (isWorkshopFull) return "bg-red-500"
    if (isAlmostFull) return "bg-red-500"
    if (isEarlyBird) return "bg-green-400"
    return "bg-blue-400"
  }

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
                className={`inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200`}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full ${getUrgencyColor()}`}
                  variants={pulseVariants}
                  animate="animate"
                />
                <span className="text-sm font-medium text-gray-700">
                  {workshopData.isLoading ? "Loading..." : getUrgencyMessage()}
                </span>
                {!workshopData.isLoading && (
                  <button
                    onClick={fetchWorkshopData}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Refresh data"
                  >
                    <RefreshCw size={12} />
                  </button>
                )}
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
              >
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Dance with
                </motion.span>
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Anvi Shetty
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Join Mumbai's renowned choreographer for an intensive 3-song workshop. 
                Choose your package and experience different dance styles in one amazing day!
              </motion.p>
            </motion.div>

            {/* Real-time Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {[
                { 
                  number: "3", 
                  label: "Songs", 
                  icon: <Music className="w-5 h-5" />, 
                  color: "text-orange-500" 
                },
                // { 
                //   number: workshopData.isLoading ? "..." : `${workshopData.totalRegistrations}/${workshopData.totalSlots}`, 
                //   label: "Registered", 
                //   icon: <Users className="w-5 h-5" />, 
                //   color: "text-pink-500" 
                // },
                { 
                  number: workshopData.isLoading ? "..." : `₹${startingPrice}`, 
                  label: isEarlyBird ? "Early Bird" : "Starting at", 
                  icon: <Star className="w-5 h-5" />, 
                  color: "text-purple-500" 
                }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div 
                    className={`${stat.color} mb-2 flex justify-center`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              {!isWorkshopFull ? (
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link 
                    href="/register" 
                    className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    {isAlmostFull ? "Grab Last Spots!" : "Register Now"}
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  className="inline-block bg-gray-400 text-white px-8 py-4 rounded-full font-semibold text-lg cursor-not-allowed"
                >
                  Workshop Full
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <button 
                  onClick={() => {
                    const section = document.getElementById('workshops')
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="inline-block border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  View Details
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Workshop Card */}
          <motion.div 
            className="relative"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Workshop Card */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative"
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Status Badge */}
              {(isEarlyBird || isAlmostFull || isWorkshopFull) && (
                <motion.div 
                  className={`absolute -top-4 -right-4 ${
                    isWorkshopFull ? 'bg-red-500' : 
                    isAlmostFull ? 'bg-red-500' : 
                    'bg-green-500'
                  } text-white px-4 py-2 rounded-full shadow-lg`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm font-bold">
                    {isWorkshopFull ? '❌ Full' : 
                     isAlmostFull ? '🔥 Almost Full' : 
                     '🎉 Early Bird'}
                  </span>
                </motion.div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <span className="text-white font-bold text-2xl">AS</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900">Dance Workshop</h3>
                  <p className="text-gray-600">with Anvi Shetty from Mumbai</p>
                </motion.div>

                {/* Workshop Details */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <div className="flex items-center space-x-4 text-gray-600">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span>September 21, 2025</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span>2:00 PM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span>Oxy cafe and studios, IRC village, Nayapalli, Bhubaneswar</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <Music className="w-5 h-5 text-orange-500" />
                    <span>3 Different Trending Songs</span>
                  </div>
                  
                </motion.div>

                {/* Countdown Timer */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 mb-3">Workshop starts in:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(timeLeft).map(([unit, value], index) => (
                        <motion.div 
                          key={unit} 
                          className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg p-3 text-center border border-orange-100"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 1.3 + index * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <motion.div 
                            className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                            key={value}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {value.toString().padStart(2, '0')}
                          </motion.div>
                          <div className="text-xs text-gray-500 uppercase">
                            {unit}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Pricing */}
                <motion.div 
                  className="text-center pt-6 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900">₹{startingPrice} - ₹3597</div>
                    <div className="text-sm text-gray-500">Choose 1, 2, or 3 songs</div>
                    {isEarlyBird && !isWorkshopFull && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        ✨ Early bird pricing for first 30 registrations
                      </div>
                    )}
                  </div>
                  
                  <motion.div
                    whileHover={!isWorkshopFull ? { scale: 1.02 } : {}}
                    whileTap={!isWorkshopFull ? { scale: 0.98 } : {}}
                  >
                    {!isWorkshopFull ? (
                      <Link 
                        href="/register" 
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 block text-center"
                      >
                        {isAlmostFull ? "Secure Last Spots!" : "Choose Your Package"}
                      </Link>
                    ) : (
                      <div className="w-full bg-gray-400 text-white px-6 py-3 rounded-full font-semibold text-center cursor-not-allowed">
                        Workshop Full - Join Waitlist
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Decorative Elements */}
            <motion.div 
              className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.2 }}
            >
              <Music className="text-white" size={20} />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-8 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                y: [10, -10, 10],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ rotate: 360 }}
            >
              <Star className="text-white" size={16} />
            </motion.div>

            {/* Background decorative circles */}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
