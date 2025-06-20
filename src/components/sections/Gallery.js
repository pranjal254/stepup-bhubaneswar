'use client'

import { useState, useRef } from 'react'
import { Play, Heart, Share2, Eye } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('highlights')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const galleryItems = {
    highlights: [
      {
        id: 1,
        type: 'video',
        title: "Hip Hop Workshop Highlights",
        choreographer: "Rahul Shetty",
        views: "2.3K",
        likes: "156",
        thumbnail: "/api/placeholder/400/300",
        color: "from-red-500 to-pink-500"
      },
      {
        id: 2,
        type: 'image',
        title: "Contemporary Flow Session",
        choreographer: "Priya Sharma",
        views: "1.8K",
        likes: "124",
        thumbnail: "/api/placeholder/400/300",
        color: "from-purple-500 to-blue-500"
      },
      {
        id: 3,
        type: 'video',
        title: "Bollywood Energy",
        choreographer: "Arjun Kapoor",
        views: "3.1K",
        likes: "203",
        thumbnail: "/api/placeholder/400/300",
        color: "from-yellow-500 to-orange-500"
      },
      {
        id: 4,
        type: 'image',
        title: "Latin Fusion Workshop",
        choreographer: "Maria Rodriguez",
        views: "1.5K",
        likes: "98",
        thumbnail: "/api/placeholder/400/300",
        color: "from-pink-500 to-purple-500"
      }
    ],
    reels: [
      {
        id: 5,
        type: 'video',
        title: "30-Second Hip Hop Move",
        choreographer: "Quick Tutorial",
        views: "5.2K",
        likes: "312",
        thumbnail: "/api/placeholder/300/400",
        color: "from-orange-500 to-red-500"
      },
      {
        id: 6,
        type: 'video',
        title: "Contemporary Expression",
        choreographer: "Behind the Scenes",
        views: "2.7K",
        likes: "189",
        thumbnail: "/api/placeholder/300/400",
        color: "from-blue-500 to-purple-500"
      },
      {
        id: 7,
        type: 'video',
        title: "Bollywood Steps Tutorial",
        choreographer: "Learn at Home",
        views: "4.1K",
        likes: "256",
        thumbnail: "/api/placeholder/300/400",
        color: "from-green-500 to-blue-500"
      }
    ],
    behind: [
      {
        id: 8,
        type: 'image',
        title: "Workshop Setup",
        choreographer: "Before the Magic",
        views: "892",
        likes: "67",
        thumbnail: "/api/placeholder/400/300",
        color: "from-gray-500 to-gray-700"
      },
      {
        id: 9,
        type: 'image',
        title: "Choreographer's Prep",
        choreographer: "Getting Ready",
        views: "1.2K",
        likes: "89",
        thumbnail: "/api/placeholder/400/300",
        color: "from-indigo-500 to-purple-500"
      },
      {
        id: 10,
        type: 'video',
        title: "Student Testimonials",
        choreographer: "Real Stories",
        views: "2.1K",
        likes: "145",
        thumbnail: "/api/placeholder/400/300",
        color: "from-teal-500 to-green-500"
      }
    ]
  }

  const tabs = [
    { id: 'highlights', name: 'Workshop Highlights', count: galleryItems.highlights.length, icon: '🎬' },
    { id: 'reels', name: 'Quick Reels', count: galleryItems.reels.length, icon: '📱' },
    { id: 'behind', name: 'Behind the Scenes', count: galleryItems.behind.length, icon: '🎭' }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const galleryItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center space-y-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-pink-50 rounded-full px-4 py-2 border border-orange-200"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Play className="w-4 h-4 text-orange-500" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700">Gallery</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Moments that <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Inspire</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Experience the energy, passion, and joy from our workshops through these captured moments and stories from our amazing dance community.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 relative ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.span 
                className="text-lg"
                animate={{ rotate: activeTab === tab.id ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                {tab.icon}
              </motion.span>
              <span>{tab.name}</span>
              <motion.span 
                className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {tab.count}
              </motion.span>
              
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className={`grid gap-6 mb-12 ${
            activeTab === 'reels' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
          layout
        >
          <AnimatePresence mode="wait">
            {galleryItems[activeTab].map((item, index) => (
              <motion.div
                key={item.id}
                className={`group relative bg-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer ${
                  activeTab === 'reels' ? 'aspect-[9/16]' : 'aspect-[4/3]'
                }`}
                variants={galleryItemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                layoutId={`gallery-item-${item.id}`}
              >
                {/* Thumbnail */}
                <motion.div 
                  className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center relative z-10">
                    <motion.div 
                      className={`mx-auto mb-3 rounded-full flex items-center justify-center shadow-lg ${
                        item.type === 'video' 
                          ? 'w-16 h-16 bg-white/20 backdrop-blur-sm' 
                          : 'w-16 h-16 bg-white/20 backdrop-blur-sm'
                      }`}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: item.type === 'video' ? 360 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.type === 'video' ? (
                        <Play className="text-white" size={24} />
                      ) : (
                        <Eye className="text-white" size={24} />
                      )}
                    </motion.div>
                    <p className="text-sm text-white/80 font-medium">
                      {item.type === 'video' ? 'Video' : 'Photo'}
                    </p>
                  </div>

                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 50%, white 0%, transparent 50%)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                      className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {item.type === 'video' ? (
                        <Play className="text-white" size={32} />
                      ) : (
                        <Eye className="text-white" size={32} />
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content Overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <div className="space-y-2">
                    <motion.h3 
                      className="text-white font-semibold text-sm"
                      whileHover={{ x: 3 }}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-white/80 text-xs">{item.choreographer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-white/70 text-xs">
                        <motion.span 
                          className="flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Eye size={12} />
                          <span>{item.views}</span>
                        </motion.span>
                        <motion.span 
                          className="flex items-center space-x-1"
                          whileHover={{ scale: 1.05, color: "#ef4444" }}
                        >
                          <Heart size={12} />
                          <span>{item.likes}</span>
                        </motion.span>
                      </div>
                      <motion.button 
                        className="text-white/70 hover:text-white transition-colors"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl p-12 border border-orange-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-20"
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
          
          <div className="space-y-6 relative z-10">
            <motion.h3 
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Want to be featured?
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Join our workshops and become part of the Step Up community. 
              Share your dance journey with us using #StepUpBhubaneswar
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.button 
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Next Workshop
              </motion.button>
              <motion.button 
                className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Follow on Instagram
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
