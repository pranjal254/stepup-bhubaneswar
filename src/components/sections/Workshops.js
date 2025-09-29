'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Users, Clock, Star, ArrowRight, Music, Heart } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

export default function Workshops() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Current registrations (this would come from your database)
  const currentRegistrations = 31 // You'll update this dynamically

  const workshop = {
    id: 1,
    title: "Dance Workshop with ",
    choreographer: "Shivanshu Soni",
    location: "Mumbai",
    date: "October 25, 2025",
    time: "12:00 PM - 8:00 PM",
    venue: "Oxy cafe and studios, IRC village, Nayapalli, Bhubaneswar",
    totalSlots: 200,
    currentRegistrations: currentRegistrations,
    description: "An intensive dance workshop covering 3 amazing songs with different styles and techniques.",
    image: "/api/placeholder/600/400",
    songs: [
      {
        id: 1,
        name: "Sajda",
        style: "Hip Hop Fusion",
        duration: "2 hours",
        time: "12:00 PM - 2:00 PM",
        price: 1000,
        description: "High-energy hip hop choreography with contemporary elements"
      },
      {
        id: 2,
        name: "Apsara Aali", 
        style: "Contemporary",
        duration: "3 hours",
        time: "2:30 PM - 5:30 PM", 
        price: 1200,
        description: "Graceful contemporary moves with traditional Indian dance elements"
      },
      {
        id: 3,
        name: "Piya ghar aayenge",
        style: "Bollywood", 
        duration: "2 hours",
        time: "6:00 PM - 8:00 PM",
        price: 1000,
        description: "Classic Bollywood choreography with dramatic expressions"
      }
    ]
  }

  const getPricing = (songCount) => {
    const isEarlyBird = currentRegistrations < 30
    
    if (songCount === 1) {
      return isEarlyBird ? 850 : 1000
    } else if (songCount === 2) {
      return isEarlyBird ? 1800 : 2200
    } else if (songCount === 3) {
      return 3000 // Special combo price
    }
  }

  const getDiscountLabel = () => {
    const remaining = 30 - currentRegistrations
    if (remaining > 0) {
      return `Early Bird Price! Only ${remaining} spots left`
    }
    return "Regular Price"
  }

  return (
    <section id="workshops" className="py-24 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Upcoming Workshop</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Dance with{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Shivanshu Soni
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Shivanshu Soni is a celebrated Indian dancer known for blending classical grace with contemporary expression.
            Choose your package and experience different dance styles in one amazing day!
          </p>
        </motion.div>

        {/* Workshop Card */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Workshop Header */}
            <div className="relative h-64 bg-gradient-to-r from-orange-500 to-pink-500">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full flex items-center justify-center text-center text-white p-8">
                <div>
                  <motion.div 
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-2xl font-bold">SS</span>
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2">{workshop.title}</h3>
                  <p className="text-lg opacity-90">with {workshop.choreographer} from {workshop.location}</p>
                </div>
              </div>
              
              {/* Early Bird Badge */}
              {currentRegistrations < 30 && (
                <motion.div 
                  className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm font-bold">🔥 Early Bird</span>
                </motion.div>
              )}
            </div>

            <div className="p-8">
              {/* Workshop Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">Workshop Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">{workshop.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">{workshop.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">{workshop.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">What You'll Learn</h4>
                  <div className="grid gap-3">
                    {workshop.songs.map((song, index) => (
                      <motion.div 
                        key={song.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Music className="w-4 h-4 text-pink-500" />
                            <div>
                              <span className="font-medium text-gray-900">{song.name}</span>
                              {/* <span className="text-sm text-orange-600 ml-2">({song.style})</span> */}
                            </div>
                          </div>
                          <span className="text-sm font-bold text-orange-500">₹{song.price}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {song.time}
                        </div>
                        {/* <p className="text-xs text-gray-600">{song.description}</p> */}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-t pt-8">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Package</h4>
                  <p className="text-gray-600">Mix and match songs or get the complete experience</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((songCount) => (
                    <motion.div 
                      key={songCount}
                      className={`relative p-6 rounded-2xl border-2 ${
                        songCount === 3 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 bg-white'
                      }`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {songCount === 3 && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Best Value
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <h5 className="text-xl font-bold text-gray-900 mb-2">
                          {songCount} Song{songCount > 1 ? 's' : ''}
                        </h5>
                        <div className="text-3xl font-bold text-orange-500 mb-2">
                          ₹{getPricing(songCount)}
                        </div>
                        {songCount < 3 && (
                          <div className="text-xs text-gray-500 mb-4">
                            {currentRegistrations < 30 && "Early bird discount applied"}
                          </div>
                        )}
                        <div className="text-sm text-gray-600 mb-6">
                          {songCount === 1 && "Perfect for beginners - Choose any one song"}
                          {songCount === 2 && "Great combination - Pick your favorite two"}
                          {songCount === 3 && "Complete experience - All 3 songs included"}
                        </div>
                        
                        {songCount === 3 && (
                          <div className="mb-4 text-left">
                            <div className="text-xs text-green-600 font-medium mb-2">✨ Combo Benefits:</div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• Save ₹{1000 + 1200 + 1000 - 3000} compared to individual</li>
                              <li>• Master 3 different dance styles</li>
                              <li>• Full day workshop experience</li>
                              <li>• Priority access to future workshops</li>
                            </ul>
                          </div>
                        )}
                        
                        <Link href={`/register?songs=${songCount}`}>
                          <motion.button 
                            className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                              songCount === 3
                                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Register Now
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <motion.div 
                className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                <h5 className="font-bold text-gray-900 mb-3">Payment Process</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Register and get UPI payment details</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Send payment screenshot to WhatsApp</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  After payment confirmation, you'll be added to our workshop group for further details.
                </p>
              </motion.div>

              {/* Individual Song Details */}
              <motion.div 
                className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-200"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 }}
              >
                <h5 className="font-bold text-gray-900 mb-4">Individual Song Pricing</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  {workshop.songs.map((song, index) => (
                    <div key={song.id} className="bg-white p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium text-gray-900">{song.name}</h6>
                        <span className="text-orange-500 font-bold">₹{song.price}</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{song.time}</div>
                      {/* <div className="text-xs text-orange-600">{song.style}</div> */}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600">
                    Individual Total: ₹{workshop.songs.reduce((sum, song) => sum + song.price, 0)} | 
                    <span className="text-orange-600 font-bold ml-1">Combo Price: ₹3000</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium mt-1">
                    Save ₹{workshop.songs.reduce((sum, song) => sum + song.price, 0) - 3000} with the 3-song combo!
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}