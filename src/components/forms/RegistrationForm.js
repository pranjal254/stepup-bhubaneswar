'use client'

import { useState } from 'react'
import { User, Mail, Phone, Calendar, MapPin, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function RegistrationForm({ workshop }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    experience: 'beginner',
    emergencyContact: '',
    medicalConditions: '',
    howDidYouHear: '',
    agreeToTerms: false
  })
  
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentStep, setPaymentStep] = useState(false)
  const [paymentSent, setPaymentSent] = useState(false)

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleRedirect = (link)=> {
    router.push(link)
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPaymentStep(true)
  }

  const handlePaymentSent = () => {
    setPaymentSent(true)
  }

  // Mock workshop data if none provided
  const workshopData = workshop || {
    title: "Hip Hop Intensive",
    choreographer: "Rahul Shetty",
    date: "July 15-16, 2025",
    price: "₹1,500",
    location: "Bhubaneswar",
    slotsLeft: 3
  }

  if (paymentSent) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Registration Successful!</h2>
          <p className="text-lg text-gray-600">
            Thank you for registering for <strong>{workshopData.title}</strong>!
          </p>
          <div className="bg-green-50 rounded-xl p-6 space-y-3">
            <h3 className="font-bold text-green-800">What's Next?</h3>
            <ul className="text-left text-green-700 space-y-2">
              <li>• You'll be added to the workshop WhatsApp group within 24 hours</li>
              <li>• Workshop location and timings will be shared in the group</li>
              <li>• Bring comfortable clothes, water, and your energy!</li>
            </ul>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
              Join Workshop WhatsApp Group
            </button>
            <button 
              
              className="w-full border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Register for Another Workshop
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (paymentStep) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Payment</h2>
            <p className="text-gray-600">Final step to secure your spot!</p>
          </div>

          {/* Workshop Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="font-bold text-gray-900 mb-3">Workshop Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Workshop:</span>
                <span className="font-medium">{workshopData.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Choreographer:</span>
                <span className="font-medium">{workshopData.choreographer}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{workshopData.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Participant:</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-orange-600">{workshopData.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Payment Instructions
            </h3>
            <div className="space-y-4 text-sm text-blue-800">
              <div className="bg-white rounded-lg p-4">
                <p className="font-medium mb-2">Step 1: Pay via UPI</p>
                <div className="bg-gray-50 rounded p-3 font-mono text-center">
                  stepupbhubaneswar@paytm
                </div>
                <p className="text-xs text-gray-600 mt-2">Amount: {workshopData.price}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <p className="font-medium mb-2">Step 2: Send Screenshot</p>
                <p>After payment, send the screenshot to our WhatsApp:</p>
                <div className="bg-green-50 rounded p-3 text-center mt-2">
                  <span className="font-medium">+91 98765 43210</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <p className="font-medium mb-2">Step 3: Confirmation</p>
                <p>You'll be added to the workshop WhatsApp group within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button 
              onClick={() => setPaymentStep(false)}
              className="flex-1 border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Back to Form
            </button>
            <button 
              onClick={handlePaymentSent}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              I've Sent Payment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          Step {currentStep} of 3
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">Let's get to know you better</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Your age"
                  min="5"
                  max="100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Dance Experience */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Dance Experience</h2>
              <p className="text-gray-600">Help us understand your dance background</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dance Experience Level *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                required
              >
                <option value="beginner">Complete Beginner</option>
                <option value="some">Some Experience</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact *
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Name and phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Conditions (Optional)
              </label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Any medical conditions we should know about..."
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you hear about us?
              </label>
              <select
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="">Select an option</option>
                <option value="instagram">Instagram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="friend">Friend/Word of mouth</option>
                <option value="google">Google Search</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Confirm Your Registration</h2>
              <p className="text-gray-600">Review your information before proceeding</p>
            </div>

            {/* Workshop Details */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                Workshop Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Workshop</p>
                  <p className="font-medium">{workshopData.title}</p>
                </div>
                <div>
                  <p className="text-gray-600">Choreographer</p>
                  <p className="font-medium">{workshopData.choreographer}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">{workshopData.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {workshopData.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Info Summary */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Age</p>
                  <p className="font-medium">{formData.age}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                I agree to the <span className="text-orange-500 hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-orange-500 hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-4 pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Previous
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              disabled={currentStep === 1 && (!formData.fullName || !formData.email || !formData.phone || !formData.age)}
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              disabled={!formData.agreeToTerms}
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </form>
    </div>
  )
}