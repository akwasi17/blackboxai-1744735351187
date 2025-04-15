import { useAuth } from '../context/AuthContext';
import { FaRobot, FaShieldAlt, FaBrain, FaLock, FaBell, FaMapMarkedAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FaRobot className="w-12 h-12 text-blue-500" />,
      title: "24/7 AI Assistant",
      description: "Get immediate help anytime with our always-available AI chatbot for reporting and assistance."
    },
    {
      icon: <FaBrain className="w-12 h-12 text-purple-500" />,
      title: "Intelligent Conversations",
      description: "Experience natural, context-aware interactions that understand your needs and provide relevant help."
    },
    {
      icon: <FaLock className="w-12 h-12 text-green-500" />,
      title: "Secure & Private",
      description: "Your safety is our priority. All conversations and reports are encrypted and confidential."
    },
    {
      icon: <FaShieldAlt className="w-12 h-12 text-red-500" />,
      title: "All-in-One Solution",
      description: "Report crimes, find help, get safety tips, and access emergency services - all through chat."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Meet Your Crime Report Assistant
            </h1>
            <p className="text-xl mb-8">
              An AI-powered chatbot designed to make crime reporting easier, faster, and more accessible.
            </p>
            <button 
              onClick={() => document.querySelector('.chatbot-trigger')?.click()}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try the Assistant Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Your Smart Safety Companion</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our AI assistant combines advanced technology with ease of use to provide you with a comprehensive safety and reporting solution.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold">Click the Chat Button</h3>
                  <p className="text-gray-600">Look for the chat icon in the bottom-right corner of your screen.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold">Choose Your Need</h3>
                  <p className="text-gray-600">Select from options like reporting a crime, finding police stations, or viewing crime feeds.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold">Get Instant Assistance</h3>
                  <p className="text-gray-600">Receive immediate help and guidance from our AI assistant.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Preview Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need in One Chat</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Access all features through simple chat commands. No complicated forms or navigation needed.
          </p>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white w-4 h-4" />
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-800">Hello! I can help you with:</p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Report a Crime</li>
                    <li>• Find Police Stations</li>
                    <li>• View Crime Feeds</li>
                    <li>• Get Safety Tips</li>
                    <li>• Access Emergency Contacts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Future of Crime Reporting</h2>
          <p className="text-xl mb-8">Try our AI-powered assistant and see how easy it is to stay safe and informed.</p>
          <button 
            onClick={() => document.querySelector('.chatbot-trigger')?.click()}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Launch Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
