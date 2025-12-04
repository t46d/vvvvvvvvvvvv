import { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor, MoreVertical, Volume2, VolumeX, Maximize, MessageCircle, Users, Settings, User } from 'lucide-react';

export default function VideoCallPage() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('video'); // video, audio, chat
  const [callDuration, setCallDuration] = useState('00:15');
  const [connectionQuality, setConnectionQuality] = useState('excellent'); // excellent, good, poor

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How are you?', sender: 'other', time: '14:30' },
    { id: 2, text: 'Great! Thanks for asking 😊', sender: 'me', time: '14:31' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-xl">
                    👩
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">Sarah Anderson</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionQuality === 'excellent' ? 'bg-green-500' :
                      connectionQuality === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="capitalize">{connectionQuality} connection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call Duration & Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{callDuration}</span>
              </div>
              <button className="hidden sm:block p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-4 gap-4 h-full">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video Container */}
            <div className="relative bg-slate-800/50 rounded-2xl overflow-hidden h-[calc(100%-100px)] border border-white/10">
              {/* Main Video */}
              <div className="absolute inset-0">
                {activeTab === 'video' ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                    {isVideoOn ? (
                      <div className="text-center">
                        <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-6xl sm:text-8xl mb-4 mx-auto">
                          👩
                        </div>
                        <p className="text-xl sm:text-2xl font-bold">Sarah Anderson</p>
                        <p className="text-gray-400">Video Call Active</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <VideoOff className="w-16 h-16 sm:w-24 sm:h-24 text-gray-500 mx-auto mb-4" />
                        <p className="text-lg sm:text-xl text-gray-400">Camera is off</p>
                      </div>
                    )}
                  </div>
                ) : activeTab === 'audio' ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-6xl sm:text-8xl mb-4 mx-auto">
                        {isAudioOn ? (
                          <>
                            <span>🎤</span>
                            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ping"></div>
                          </>
                        ) : (
                          <MicOff className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xl sm:text-2xl font-bold">Voice Call</p>
                      <p className="text-gray-400">{isAudioOn ? 'Microphone Active' : 'Microphone Muted'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-slate-800 p-4 overflow-y-auto">
                    {/* Chat Messages */}
                    <div className="space-y-4 mb-20">
                      {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl ${
                            msg.sender === 'me' 
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
                              : 'bg-slate-700'
                          }`}>
                            <p className="text-sm sm:text-base">{msg.text}</p>
                            <p className="text-xs text-gray-300 mt-1 opacity-70">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Picture-in-Picture */}
                {activeTab === 'video' && (
                  <div className="absolute bottom-4 right-4 w-24 h-32 sm:w-32 sm:h-40 bg-slate-900 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-4xl sm:text-5xl">
                      😊
                    </div>
                  </div>
                )}

                {/* Call Info Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/10">
                    🔒 End-to-End Encrypted
                  </div>
                  <div className="sm:hidden px-3 py-1.5 bg-red-500/80 backdrop-blur-sm rounded-full text-xs font-medium">
                    {callDuration}
                  </div>
                </div>

                {/* Quality Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1.5 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border ${
                    connectionQuality === 'excellent' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                    connectionQuality === 'good' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
                    'bg-red-500/20 border-red-500/30 text-red-400'
                  }`}>
                    {connectionQuality === 'excellent' ? '⚡ HD Quality' :
                     connectionQuality === 'good' ? '📶 Good Quality' : '⚠️ Poor Connection'}
                  </div>
                </div>
              </div>

              {/* Chat Input (only visible in chat tab) */}
              {activeTab === 'chat' && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-lg border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-sm sm:text-base"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Control Panel */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                {/* Tab Switcher */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      activeTab === 'video' 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      activeTab === 'audio' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      activeTab === 'chat' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Call Controls */}
                <div className="flex items-center gap-2">
                  {/* Video Toggle */}
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-lg transition-all ${
                      isVideoOn 
                        ? 'bg-slate-700 hover:bg-slate-600' 
                        : 'bg-red-500/20 hover:bg-red-500/30'
                    }`}
                  >
                    {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>

                  {/* Audio Toggle */}
                  <button
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className={`p-3 rounded-lg transition-all ${
                      isAudioOn 
                        ? 'bg-slate-700 hover:bg-slate-600' 
                        : 'bg-red-500/20 hover:bg-red-500/30'
                    }`}
                  >
                    {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>

                  {/* Speaker Toggle */}
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className="hidden sm:block p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all"
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>

                  {/* Screen Share */}
                  <button className="hidden md:block p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all">
                    <Monitor className="w-5 h-5" />
                  </button>

                  {/* End Call */}
                  <button className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all">
                    <PhoneOff className="w-5 h-5" />
                  </button>

                  {/* More Options */}
                  <button className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-4">
            {/* User Profile Card */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-5xl">
                  👩
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sarah Anderson</h3>
                  <p className="text-sm text-gray-400">24 years • New York</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-xs">
                    🎵 Music
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs">
                    ✈️ Travel
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs">
                    📚 Books
                  </span>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                  View Profile
                </button>
              </div>
            </div>

            {/* Call Stats */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold mb-4">Call Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-medium">{callDuration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Quality</span>
                  <span className="font-medium text-green-400">HD 1080p</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Latency</span>
                  <span className="font-medium">24ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Encryption</span>
                  <span className="font-medium text-green-400">🔒 Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-left text-sm transition-colors flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Report User
                </button>
                <button className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-left text-sm transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Call Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}