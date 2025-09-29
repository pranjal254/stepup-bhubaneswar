"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  Music,
  Check,
  AlertCircle,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationData, setRegistrationData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    experience: "beginner",
    songs: parseInt(searchParams.get("songs")) || 1,
    selectedSongs: [], // New field
  });

  // Workshop details
  const workshop = {
    title: "Dance Workshop with",
    choreographer: "Shivanshu Soni",
    date: "October 25, 2025",
    time: "12:00 PM - 8:00 PM",
    venue: "Oxy cafe and studios, IRC village, Nayapalli, Bhubaneswar",
  };

  // Contact details
  const contact = {
    upiId: "9438363399@ybl",
    whatsapp: "+917749019313",
    whatsappUrl: "https://wa.me/917749019313",
  };

  const songOptions = [
    {
      id: "sajda",
      name: "Sajda",
      time: "12:00 PM - 2:00 PM",
      style: "Hip Hop Fusion",
      price: 1000,
      description: "High-energy hip hop choreography with contemporary elements"
    },
    {
      id: "apsara-aali",
      name: "Apsara Aali",
      time: "2:30 PM - 5:30 PM",
      style: "Contemporary",
      price: 1200,
      description: "Graceful contemporary moves with traditional Indian dance elements"
    },
    { 
      id: "piya-ghar-aayenge", 
      name: "Piya ghar aayenge", 
      time: "6:00 PM - 8:00 PM", 
      style: "Bollywood",
      price: 1000,
      description: "Classic Bollywood choreography with dramatic expressions"
    },
  ];

  // Get current pricing (this would come from API in real implementation)
  const [currentRegistrations, setCurrentRegistrations] = useState(0);

  const getPricing = (songCount, selectedSongs = []) => {
    const isEarlyBird = currentRegistrations < 30;

    if (songCount === 1) {
      // Check if Apsara Ali is selected (higher price)
      const isApsaraSelected = selectedSongs.includes("apsara-aali");
      if (isApsaraSelected) {
        return isEarlyBird ? 1200 : 1400;
      } else {
        return isEarlyBird ? 1000 : 1200;
      }
    } else if (songCount === 2) {
      // For 2 songs, calculate based on selection
      let basePrice = 0;
      if (selectedSongs.includes("apsara-aali")) {
        basePrice = isEarlyBird ? 1200 : 1400; // Apsara Ali
        basePrice += isEarlyBird ? 1000 : 1200; // Other song
      } else {
        basePrice = (isEarlyBird ? 1000 : 1200) * 2; // Two regular songs
      }
      return basePrice;
    } else if (songCount === 3) {
      return 3000; // Fixed combo price
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user starts typing
  };

  const handleSongSelection = (songId) => {
    const maxSongs = formData.songs;
    let newSelection = [...formData.selectedSongs];

    if (newSelection.includes(songId)) {
      newSelection = newSelection.filter((id) => id !== songId);
    } else {
      if (newSelection.length < maxSongs) {
        newSelection.push(songId);
      }
    }

    setFormData({
      ...formData,
      selectedSongs: newSelection,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.age
    ) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    // Age validation
    if (formData.age < 5 || formData.age > 80) {
      setError("Age must be between 5 and 80");
      setIsLoading(false);
      return;
    }

    if (formData.songs < 3 && formData.selectedSongs.length !== formData.songs) {
      setError(`Please select exactly ${formData.songs} song${formData.songs > 1 ? 's' : ''}`)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedSongs: formData.songs === 3 ? songOptions.map(s => s.id) : formData.selectedSongs
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationData(data.registration);
        setStep(2); // Move to payment step
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Register for Workshop
            </h1>
            <p className="text-gray-600">
              Join Shivanshu Soni's dance workshop in just 2 simple steps
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                step >= 1
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 1 ? <Check size={20} /> : "1"}
            </div>
            <div
              className={`w-20 h-1 rounded transition-all duration-300 ${
                step > 1 ? "bg-orange-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                step >= 2
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
          </div>
          <div className="flex justify-between w-full max-w-xs text-sm text-gray-600">
            <span>Registration</span>
            <span>Payment</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workshop Summary - Always Visible */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Workshop Summary
              </h3>

              <div className="space-y-4">
                {/* Workshop Info */}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {workshop.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    with {workshop.choreographer}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>{workshop.venue}</span>
                  </div>
                </div>

                {/* Package Selection */}
                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-3">
                    Select Package
                  </h5>
                  <div className="space-y-2">
                    {[1, 2, 3].map((songCount) => (
                      <motion.label
                        key={songCount}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          formData.songs === songCount
                            ? "bg-orange-50 border-2 border-orange-500"
                            : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="songs"
                            value={songCount}
                            checked={formData.songs === songCount}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                songs: parseInt(e.target.value),
                                selectedSongs: [], // Reset selection when package changes
                              });
                            }}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <div>
                            <span className="font-medium text-gray-900">
                              {songCount} Song{songCount > 1 ? "s" : ""}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Music className="w-3 h-3" />
                              <span>
                                {songCount === 1 && "Choose any one"}
                                {songCount === 2 && "Choose any two"}
                                {songCount === 3 && "All 3 Songs"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-500">
                            ₹{getPricing(songCount, formData.selectedSongs)}
                          </div>
                          {songCount === 3 && (
                            <div className="text-xs text-green-600 font-medium">
                              Best Value
                            </div>
                          )}
                        </div>
                      </motion.label>
                    ))}
                  </div>

                  {/* Song Selection - Show when 1 or 2 songs selected */}
                  {formData.songs < 3 && (
                    <div className="mt-4 pt-4 border-t">
                      <h6 className="font-medium text-gray-900 mb-2">
                        Select {formData.songs} Song
                        {formData.songs > 1 ? "s" : ""}:
                      </h6>
                      <div className="space-y-2">
                        {songOptions.map((song) => (
                          <label
                            key={song.id}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer text-sm transition-all ${
                              formData.selectedSongs.includes(song.id)
                                ? "bg-orange-100 border border-orange-300"
                                : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                            } ${
                              !formData.selectedSongs.includes(song.id) &&
                              formData.selectedSongs.length >= formData.songs
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                checked={formData.selectedSongs.includes(
                                  song.id
                                )}
                                onChange={() => handleSongSelection(song.id)}
                                disabled={
                                  !formData.selectedSongs.includes(song.id) &&
                                  formData.selectedSongs.length >=
                                    formData.songs
                                }
                                className="text-orange-500 focus:ring-orange-500 mt-1"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 mb-1">
                                  {song.name}
                                </div>
                                <div className="text-xs text-gray-500 mb-1">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {song.time}
                                </div>
                                {/* <div className="text-xs text-orange-600 mb-1">
                                  {song.style}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {song.description}
                                </div> */}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-orange-500 font-bold text-sm">
                                ₹{song.price}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                      {formData.selectedSongs.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {formData.selectedSongs.length} of {formData.songs}{" "}
                          selected
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing Summary */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-2xl font-bold text-orange-500">
                      ₹{getPricing(formData.songs, formData.selectedSongs)}
                    </span>
                  </div>
                  {formData.songs === 3 && (
                    <div className="text-xs text-green-600 font-medium">
                      You save ₹{songOptions.reduce((sum, song) => sum + song.price, 0) - 3000} with the combo!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Personal Information
                    </h2>

                    {error && (
                      <motion.div
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle size={20} />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                            placeholder="Enter your email"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                          min="5"
                          max="80"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                          placeholder="Enter your age"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dance Experience
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="beginner">
                            Beginner - New to dance
                          </option>
                          <option value="intermediate">
                            Intermediate - Some experience
                          </option>
                          <option value="advanced">
                            Advanced - Extensive training
                          </option>
                        </select>
                      </motion.div>

                      <motion.div variants={itemVariants} className="pt-6">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <span>Continue to Payment</span>
                          )}
                        </button>
                      </motion.div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 2 && registrationData && (
                <motion.div
                  key="step2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Payment Instructions
                    </h2>

                    <div className="space-y-6">
                      {/* Success Message */}
                      <motion.div
                        variants={itemVariants}
                        className="bg-green-50 border border-green-200 rounded-lg p-6"
                      >
                        <div className="flex items-center space-x-2 mb-4">
                          <Check className="text-green-600" size={24} />
                          <h3 className="text-lg font-semibold text-green-800">
                            Registration Successful!
                          </h3>
                        </div>
                        <p className="text-green-700">
                          Hello <strong>{registrationData.name}</strong>, your
                          registration has been saved. Please complete the
                          payment below to confirm your spot.
                        </p>
                      </motion.div>

                      {/* Payment Steps */}
                      <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Complete Your Payment
                        </h3>
                        <div className="space-y-4">
                          {/* Step 1: Pay via UPI */}
                          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                              1
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Pay via UPI
                              </h4>
                              <p className="text-gray-600 text-sm mb-3">
                                Send ₹{registrationData.price} to the UPI ID
                                below:
                              </p>
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-mono text-lg font-bold text-gray-900">
                                      {contact.upiId}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      UPI ID
                                    </p>
                                  </div>
                                  <button
                                    onClick={() =>
                                      navigator.clipboard.writeText(
                                        contact.upiId
                                      )
                                    }
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                                  >
                                    Copy
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Step 2: Send Screenshot */}
                          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                              2
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Send Payment Screenshot
                              </h4>
                              <p className="text-gray-600 text-sm mb-3">
                                WhatsApp the payment screenshot along with your
                                name to:
                              </p>
                              <a
                                href={`${contact.whatsappUrl}?text=Hi! I just completed payment for Shivanshu Soni's workshop. My name is ${registrationData.name}. Here's my payment screenshot.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <MessageCircle size={20} />
                                <span>{contact.whatsapp}</span>
                              </a>
                            </div>
                          </div>

                          {/* Step 3: Confirmation */}
                          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                              3
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Get Confirmation
                              </h4>
                              <p className="text-gray-600 text-sm">
                                You'll be added to the workshop WhatsApp group
                                within 24 hours after payment verification. The
                                group will have all workshop details, venue
                                address, and updates.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Important Notes */}
                      <motion.div
                        variants={itemVariants}
                        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                      >
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Important Notes:
                        </h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>
                            • Payment must be completed within 24 hours to
                            secure your spot
                          </li>
                          <li>
                            • Include your name "
                            <strong>{registrationData.name}</strong>" in the
                            WhatsApp message
                          </li>
                          <li>
                            • Workshop venue details will be shared in the group
                          </li>
                          <li>
                            • Bring comfortable clothes, water bottle, and towel
                          </li>
                        </ul>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                      >
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Edit Details
                        </button>
                        <a
                          href={`${contact.whatsappUrl}?text=Hi! I just completed payment for Shivanshu Soni's workshop. My name is ${registrationData.name}. Here's my payment screenshot.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center flex items-center justify-center space-x-2"
                        >
                          <MessageCircle size={20} />
                          <span>Send to WhatsApp</span>
                        </a>
                        <Link href="/" className="flex-1">
                          <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                            Done
                          </button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}