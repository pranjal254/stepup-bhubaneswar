"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Clock, Star, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";


export default function Workshops() {
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px",
  });

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Use fallback animation state on mobile
  const shouldAnimate = isMobile ? true : isInView;

  const workshops = [
    
    {
      id: 3,
      title: "Bollywood Masala",
      choreographer: "Vikas Paudel",
      location: "Mumbai",
      date: "August 5-6, 2025",
      time: "11:00 AM - 5:00 PM",
      price: "₹799",
      slotsLeft: 18,
      totalSlots: 40,
      level: "Beginner Friendly",
      category: "bollywood",
      status: "available",
      image: "/api/placeholder/400/300",
      description:
        "Classic and modern Bollywood choreography with high-energy routines.",
      color: "from-yellow-500 to-orange-500",
    },
   
    
  ];

  const categories = [
    { id: "all", name: "All Workshops", icon: "🎭" },
    { id: "hip-hop", name: "Hip Hop", icon: "🎤" },
    { id: "contemporary", name: "Contemporary", icon: "🌊" },
    { id: "bollywood", name: "Bollywood", icon: "🎬" },
    { id: "latin", name: "Latin", icon: "💃" },
  ];

  const filteredWorkshops =
    activeFilter === "all"
      ? workshops
      : workshops.filter((workshop) => workshop.category === activeFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case "filling-fast":
        return "bg-red-50 text-red-600 border-red-200";
      case "available":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "filling-fast":
        return "Filling Fast";
      case "available":
        return "Available";
      default:
        return "Available";
    }
  };

  return (
    <section
      id="workshops"
      className="py-24 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 overflow-hidden mobile-visible"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              Upcoming Workshops
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={
              shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Learn from{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              India's Best
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={
              shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Curated workshops with top choreographers from across India. Each
            session is designed to challenge, inspire, and elevate your dance
            journey.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 relative ${
                activeFilter === category.id
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="text-lg"
                animate={{
                  rotate: activeFilter === category.id ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.span>
              <span>{category.name}</span>

              {activeFilter === category.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Workshops Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <AnimatePresence mode="wait">
            {filteredWorkshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateY: 2,
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                layout
                layoutId={`workshop-${workshop.id}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Workshop Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${workshop.color} opacity-20`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${workshop.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                          transition: { duration: 0.5 },
                        }}
                      >
                        <span className="text-white font-bold text-xl">
                          {workshop.choreographer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </motion.div>
                      <p className="text-sm text-gray-500 font-medium">
                        Workshop Preview
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        workshop.status
                      )}`}
                    >
                      {getStatusText(workshop.status)}
                    </span>
                  </motion.div>

                  {/* Slots Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs font-medium text-gray-700">
                      {workshop.slotsLeft} slots left
                    </span>
                  </motion.div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight className="text-white" size={24} />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Workshop Content */}
                <motion.div
                  className="p-8 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Header */}
                  <div className="space-y-3">
                    <motion.h3
                      className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {workshop.title}
                    </motion.h3>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">
                        with {workshop.choreographer}
                      </span>
                      <span className="text-sm">from {workshop.location}</span>
                    </div>
                    <motion.p
                      className="text-gray-600 text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {workshop.description}
                    </motion.p>
                  </div>

                  {/* Workshop Details */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Calendar, text: workshop.date },
                      { icon: Clock, text: workshop.time },
                      { icon: MapPin, text: "Bhubaneswar" },
                      { icon: Users, text: workshop.level },
                    ].map((detail, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                        whileHover={{ x: 3, color: "#ea580c" }}
                        transition={{ duration: 0.2 }}
                      >
                        <detail.icon className="w-4 h-4" />
                        <span>{detail.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pricing and Action */}
                  <motion.div
                    className="flex items-center justify-between pt-6 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      className="space-y-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl font-bold text-gray-900">
                        {workshop.price}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </motion.div>

                    <div className="flex flex-col space-y-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={`/register?workshop=${workshop.id}`}
                          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                        >
                          <span>Register Now</span>
                          <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight size={16} />
                          </motion.div>
                        </Link>
                      </motion.div>
                      <motion.div
                        className="text-xs text-center text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {workshop.totalSlots - workshop.slotsLeft}/
                        {workshop.totalSlots} registered
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-white rounded-3xl p-12 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{
            y: -5,
            transition: { duration: 0.3 },
          }}
        >
          <div className="space-y-6">
            <motion.h3
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Don't see your favorite style?
            </motion.h3>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              We're constantly adding new workshops and bringing diverse
              choreographers to Bhubaneswar. Let us know what you'd love to
              learn next!
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const section = document.getElementById("contact");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Request a Workshop
              </motion.button>

              <motion.button
                className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const section = document.getElementById("gallery");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View Past Workshops
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
