"use client";

import { useState, useRef } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Contact() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const router = useRouter();

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      title: "WhatsApp",
      description: "Quick responses for urgent queries",
      action: "Message Us",
      value: "+91 7749019313",
      href: "https://wa.me/917749019313",
      primary: true,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: "Email",
      description: "Detailed inquiries and collaborations",
      action: "Send Email",
      value: "info.stepupbhubaneswar@gmail.com",
      href: "mailto:info.stepupbhubaneswar@gmail.com",
      primary: false,
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: "Phone",
      description: "Direct calls during business hours",
      action: "Call Now",
      value: "+91 77490 19313",
      href: "tel:+9177490 19313",
      primary: false,
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50",
    },
  ];

  const faqs = [
    {
      question: "Who can join the workshops?",
      answer:
        "Anyone! We welcome dancers of all ages, backgrounds, and skill levels. Our workshops are designed for everyone from complete beginners to experienced dancers.",
      icon: "👥",
    },
    {
      question: "What should I bring to the workshop?",
      answer:
        "Just bring comfortable workout clothes, a water bottle, and a towel. We recommend wearing sneakers or dance shoes. All other equipment will be provided.",
      icon: "🎒",
    },
    {
      question: "How do I register for a workshop?",
      answer:
        "Click 'Register Now' on any workshop, pay via UPI, and send the payment screenshot to our WhatsApp. We'll add you to the workshop group immediately.",
      icon: "📝",
    },
    {
      question: "What's your refund policy?",
      answer:
        "Full refunds are available up to 48 hours before the workshop. For cancellations within 48 hours, we offer credits for future workshops.",
      icon: "💰",
    },
    {
      question: "Do you provide certificates?",
      answer:
        "Yes! All participants receive a digital certificate of completion and group photos from the workshop.",
      icon: "🏆",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleRedirect = (link) => {
    window.open(link, "_blank");
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MessageCircle className="w-4 h-4 text-orange-500" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Have questions about our workshops? Want to request a specific
            style? Or just want to chat about dance? We're here to help!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Reach Out
            </motion.h3>

            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${method.bgColor} rounded-2xl p-6 shadow-sm border border-white/50 relative overflow-hidden group`}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Background decoration */}
                <motion.div
                  className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${method.color} rounded-full opacity-10`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                />

                <div className="flex items-start space-x-4 relative z-10">
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                  >
                    {method.icon}
                  </motion.div>
                  <div className="flex-1 space-y-2">
                    <motion.h4
                      className="font-bold text-gray-900"
                      whileHover={{ x: 3 }}
                    >
                      {method.title}
                    </motion.h4>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {method.value}
                      </p>
                      <motion.button
                        onClick={() => handleRedirect(method.href)}
                        className={`text-sm font-medium transition-colors ${
                          method.primary
                            ? "text-green-600 hover:text-green-700"
                            : "text-orange-600 hover:text-orange-700"
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {method.action} →
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Pulse effect for primary contact */}
                {method.primary && (
                  <motion.div
                    className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            ))}

            {/* Location & Business Hours */}
            <motion.div className="space-y-4" variants={containerVariants}>
              {/* Location */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 15 }}
                  >
                    <MapPin className="w-6 h-6 text-red-500" />
                  </motion.div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900">
                      Workshop Location
                    </h4>
                    <p className="text-sm text-gray-600">
                      Premium dance studios in
                      <br />
                      Bhubaneswar, Odisha
                    </p>
                    <p className="text-sm text-gray-500">
                      Exact venue shared with registered participants
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Clock className="w-6 h-6 text-blue-500" />
                  </motion.div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900">Response Time</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>WhatsApp: Within 30 minutes</p>
                      <p>Email: Within 24 hours</p>
                      <p>Phone: Mon-Sat, 10 AM - 8 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Frequently Asked Questions
            </motion.h3>

            <motion.div className="space-y-4" variants={containerVariants}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  variants={faqVariants}
                  custom={index}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.span
                        className="text-xl"
                        animate={{
                          rotate: expandedFaq === index ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.icon}
                      </motion.span>
                      <h4 className="font-bold text-gray-900">
                        {faq.question}
                      </h4>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <motion.div
                          className="px-6 pb-4"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <p className="text-gray-600 leading-relaxed pl-8">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              {/* Background decoration */}
              <motion.div
                className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                <motion.div className="space-y-3" whileHover={{ x: 5 }}>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-gray-900">
                      Group Size
                    </span>
                  </div>
                  <p className="text-gray-600">
                    15-40 participants per workshop for personalized attention
                  </p>
                </motion.div>

                <motion.div className="space-y-3" whileHover={{ x: 5 }}>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-gray-900">
                      Duration
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Weekend workshops: 2 days, 6-8 hours of intensive training
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="mt-8 text-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 bg-white/10"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <motion.h4
                  className="text-2xl font-bold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.5 }}
                >
                  Ready to Start Dancing?
                </motion.h4>
                <motion.p
                  className="mb-6 opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.6 }}
                >
                  Join our community and let's create some amazing dance
                  memories together!
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    className="bg-white text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const section = document.getElementById("workshops");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    View Upcoming Workshops
                  </motion.button>
                  <motion.button
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/register")}
                  >
                    Join WhatsApp Community
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
