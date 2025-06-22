'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Instagram, MessageCircle, Mail, MapPin, Heart, Send, ArrowUp } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Workshops', href: '#workshops' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/stepup_bhubaneswar/',
      icon: <Instagram size={20} />,
      color: 'hover:text-pink-500',
      bgColor: 'hover:bg-pink-100'
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/917749019313',
      icon: <MessageCircle size={20} />,
      color: 'hover:text-green-500',
      bgColor: 'hover:bg-green-100'
    },
    { 
      name: 'Email', 
      href: 'mailto:info.stepupbhubaneswar@gmail.com',
      icon: <Mail size={20} />,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-100'
    },
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

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <motion.div 
          className="grid lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                <span className="text-white font-bold text-lg">S</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl">Step Up</span>
                <span className="text-sm text-gray-400 -mt-1">Bhubaneswar</span>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 leading-relaxed max-w-md"
              variants={itemVariants}
            >
              Odisha's first curated dance workshop platform. We bring top choreographers from across India to create unforgettable dance experiences for everyone.
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-2 text-gray-300"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <MapPin size={16} />
              <span className="text-sm">Bhubaneswar, Odisha, India</span>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-4"
              variants={containerVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700 ${link.color} ${link.bgColor}`}
                  aria-label={link.name}
                  variants={socialVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.1,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.icon}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants}>
                <Link
                  href="/register"
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 block"
                >
                  <motion.span
                    whileHover={{ x: 5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    Register Now
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold">Get in Touch</h3>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-400 text-sm">WhatsApp</p>
                <a 
                  href="https://wa.me/919876543210" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  +91 7749019313
                </a>
              </motion.div>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-400 text-sm">Email</p>
                <a 
                  href="mailto:info.stepupbhubaneswar@gmail.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  info.stepupbhubaneswar@gmail.com
                </a>
              </motion.div>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-400 text-sm">Response Time</p>
                <p className="text-gray-300 text-sm">WhatsApp: 30 mins | Email: 24 hrs</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background decoration */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="text-center space-y-4 relative z-10">
              <motion.h3 
                className="text-2xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                Stay Updated
              </motion.h3>
              <p className="text-gray-300 max-w-md mx-auto">
                Get notified about new workshops, choreographers, and special events.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                variants={containerVariants}
              >
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Subscribe</span>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send size={16} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="flex items-center space-x-2 text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={16} className="text-red-400" />
            </motion.div>
            <span>for the dance community</span>
          </motion.div>
          
          <div className="text-gray-400 text-sm text-center sm:text-right">
            <p>&copy; 2025 Step Up Bhubaneswar. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 justify-center sm:justify-end">
              <motion.div whileHover={{ y: -2 }}>
                <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link href="/terms" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-50"
        onClick={scrollToTop}
        whileHover={{ 
          scale: 1.1,
          y: -3,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 100,
          transition: { duration: 0.5 }
        }}
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowUp className="text-white" size={20} />
        </motion.div>
      </motion.button>
    </footer>
  )
}