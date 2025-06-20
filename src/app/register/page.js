import HeaderRegister from '@/components/layout/HeaderRegister'
import Footer from '@/components/layout/Footer'
import RegistrationForm from '@/components/forms/RegistrationForm'

export const metadata = {
  title: 'Register - Step Up Bhubaneswar',
  description: 'Register for our upcoming dance workshops with top choreographers from across India.',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <HeaderRegister />
      
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Limited Spots Available</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Secure Your <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Dance Journey</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our upcoming workshop and learn from India's finest choreographers. 
              Registration is quick, easy, and your spot is guaranteed once payment is confirmed.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}