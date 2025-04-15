import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaComments, FaTimes, FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

const ChatbotPopup = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm your Crime Report Assistant. I can help you with:\n\n1. Report a Crime\n2. Find Police Stations\n3. View Crime Feeds\n4. Get Emergency Contacts\n5. View Safety Tips\n6. Check Area Statistics\n\nWhat would you like to do? (Type a number or ask a question)",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError('');

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    const currentInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      await addDoc(collection(db, 'messages'), {
        text: currentInput,
        userId: user.uid,
        userEmail: user.email,
        timestamp: serverTimestamp()
      });

      setTimeout(() => {
        const botResponse = generateBotResponse(currentInput.toLowerCase());
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        }]);
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send message. Please try again.');
      setLoading(false);
    }
  };

  const generateBotResponse = (input) => {
    // Report a crime
    if (input === '1' || input.includes('report') || input.includes('crime')) {
      return "To report a crime, I'll need some details:\n\n1. Type of incident (e.g., theft, assault, vandalism)\n2. Location\n3. Date and time\n4. Description\n\nWhat type of incident would you like to report?";
    }

    // Find police stations
    if (input === '2' || input.includes('police') || input.includes('station')) {
      return "Here are the nearest police stations:\n\n1. Central Police Station\n📍 123 Main Street\n☎️ (555) 123-4567\n\n2. Downtown Precinct\n📍 456 Park Avenue\n☎️ (555) 234-5678\n\n3. Harbor Police Department\n📍 789 Water Street\n☎️ (555) 345-6789\n\nWould you like directions to any of these stations?";
    }

    // View crime feeds
    if (input === '3' || input.includes('feed') || input.includes('recent')) {
      return "Recent Crime Reports in Your Area:\n\n🚨 Suspicious Activity\n📍 Downtown Area\n⏰ 2 hours ago\n\n🚨 Vehicle Break-in\n📍 Residential District\n⏰ 5 hours ago\n\n🚨 Vandalism\n📍 Shopping Center\n⏰ Yesterday\n\nWould you like more details about any of these incidents?";
    }

    // Emergency contacts
    if (input === '4' || input.includes('emergency') || input.includes('contact')) {
      return "Emergency Contacts:\n\n🚔 Police Emergency: 911\n🚓 Non-Emergency: 311\n🕵️ Crime Stoppers: 1-800-222-TIPS\n\nRemember: In case of immediate danger, always call 911 first.";
    }

    // Safety tips
    if (input === '5' || input.includes('safety') || input.includes('tips')) {
      return "Safety Tips:\n\n1. Stay aware of your surroundings\n2. Keep valuables secure and out of sight\n3. Walk in well-lit areas at night\n4. Install security systems at home\n5. Save emergency numbers on speed dial\n\nWould you like more specific safety tips for home, street, or digital security?";
    }

    // Area statistics
    if (input === '6' || input.includes('statistics') || input.includes('stats')) {
      return "Area Crime Statistics (Last 30 Days):\n\n📊 Total Incidents: 47\n- Theft: 35%\n- Vandalism: 25%\n- Assault: 15%\n- Others: 25%\n\n🔍 Hotspots:\n- Downtown District\n- Shopping Center\n- Park Area\n\nWould you like to see statistics for a specific type of crime?";
    }

    // Handle specific incident types
    if (input.includes('theft') || input.includes('stolen')) {
      return "For theft reports, please provide:\n1. What was stolen?\n2. When did you notice it was missing?\n3. Where did this occur?\n4. Any identifying features of the stolen items?";
    }

    if (input.includes('assault') || input.includes('attack')) {
      return "For assault reports, please provide:\n1. When did this occur?\n2. Where did this occur?\n3. Description of the assailant\n4. Any injuries sustained\n5. Were there any witnesses?";
    }

    if (input.includes('vandalism') || input.includes('damage')) {
      return "For vandalism reports, please provide:\n1. What was damaged?\n2. When did you notice the damage?\n3. Estimated cost of damage\n4. Any security footage available?";
    }

    // Thank you responses
    if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?\n\n1. Report a Crime\n2. Find Police Stations\n3. View Crime Feeds\n4. Get Emergency Contacts\n5. View Safety Tips\n6. Check Area Statistics";
    }

    // Default response
    return "I'm not sure I understand. Please choose from these options:\n\n1. Report a Crime\n2. Find Police Stations\n3. View Crime Feeds\n4. Get Emergency Contacts\n5. View Safety Tips\n6. Check Area Statistics\n\nOr you can ask me a specific question about crime reporting or safety.";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center chatbot-trigger"
          aria-label="Open chat"
        >
          <FaComments className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col animate-slide-up">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              <FaRobot className="w-6 h-6 mr-2" />
              <h2 className="text-lg font-semibold">Crime Report Assistant</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
              aria-label="Close chat"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <FaUser className="text-white w-4 h-4" />
                    ) : (
                      <FaRobot className="text-white w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center ${
                  loading || !input.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
              >
                <FaPaperPlane className="mr-2" />
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
