import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Bell, Users, MapPin, Phone, Video, MessageCircle, UserX, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function PrivacySettings() {
  const [activeSection, setActiveSection] = useState('privacy');
  
  const [settings, setSettings] = useState({
    // Privacy Settings
    profileVisibility: 'everyone', // everyone, matches, private
    showOnline: true,
    showLastSeen: true,
    showLocation: 'approximate', // exact, approximate, hidden
    showAge: true,
    showPhotos: 'everyone',
    
    // Safety Settings
    verifiedOnly: false,
    blockScreenshots: true,
    hideFromContacts: false,
    twoFactorAuth: true,
    endToEndEncryption: true,
    
    // Communication Settings
    whoCanMessage: 'everyone', // everyone, matches, verified
    whoCanCall: 'matches',
    whoCanVideoCall: 'matches',
    readReceipts: true,
    typingIndicator: true,
    
    // Blocking & Reporting
    blockedUsers: 3,
    reportedUsers: 1,
    
    // Notifications
    messageNotifications: true,
    matchNotifications: true,
    likeNotifications: false,
    videoCallNotifications: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const sections = [
    { id: 'privacy', name: 'Privacy', icon: Eye },
    { id: 'safety', name: 'Safety', icon: Shield },
    { id: 'communication', name: 'Communication', icon: MessageCircle },
    { id: 'blocking', name: 'Blocking', icon: UserX },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black">Privacy & Security</h1>
              <p className="text-gray-400">Your safety is our priority</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-white/10 space-y-2">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                        : 'hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Security Status */}
            <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="font-bold text-green-400">Protected</h3>
                  <p className="text-xs text-gray-400">All systems secure</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">2FA Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-4">
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Eye className="w-6 h-6" />
                    Profile Visibility
                  </h2>

                  {/* Profile Visibility */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Who can see your profile?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['everyone', 'matches', 'private'].map(option => (
                          <button
                            key={option}
                            onClick={() => updateSetting('profileVisibility', option)}
                            className={`px-4 py-3 rounded-xl border transition-all ${
                              settings.profileVisibility === option
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-transparent'
                                : 'bg-slate-700 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {option === 'everyone' && '🌍 Everyone'}
                            {option === 'matches' && '💕 Matches Only'}
                            {option === 'private' && '🔒 Private'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Online Status */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium">Show Online Status</p>
                          <p className="text-sm text-gray-400">Let others see when you're active</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSetting('showOnline')}
                        className={`w-14 h-8 rounded-full transition-all ${
                          settings.showOnline ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.showOnline ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* Last Seen */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Show Last Seen</p>
                          <p className="text-sm text-gray-400">Display when you were last active</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSetting('showLastSeen')}
                        className={`w-14 h-8 rounded-full transition-all ${
                          settings.showLastSeen ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.showLastSeen ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* Location Sharing */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Location Sharing</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['exact', 'approximate', 'hidden'].map(option => (
                          <button
                            key={option}
                            onClick={() => updateSetting('showLocation', option)}
                            className={`px-4 py-3 rounded-xl border transition-all ${
                              settings.showLocation === option
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-transparent'
                                : 'bg-slate-700 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {option === 'exact' && '📍 Exact'}
                            {option === 'approximate' && '📌 City Only'}
                            {option === 'hidden' && '🚫 Hidden'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Safety Settings */}
            {activeSection === 'safety' && (
              <div className="space-y-4">
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Safety Features
                  </h2>

                  <div className="space-y-4">
                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border-2 border-green-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            Two-Factor Authentication
                            <span className="text-xs px-2 py-0.5 bg-green-500/20 rounded-full text-green-400">Recommended</span>
                          </p>
                          <p className="text-sm text-gray-400">Extra layer of account security</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSetting('twoFactorAuth')}
                        className={`w-14 h-8 rounded-full transition-all ${
                          settings.twoFactorAuth ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* End-to-End Encryption */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border-2 border-purple-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            End-to-End Encryption
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 rounded-full text-purple-400">Military-Grade</span>
                          </p>
                          <p className="text-sm text-gray-400">All messages & calls encrypted</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSetting('endToEndEncryption')}
                        className={`w-14 h-8 rounded-full transition-all ${
                          settings.endToEndEncryption ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.endToEndEncryption ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* Screenshot Protection */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium">Block Screenshots</p>
                          <p className="text-sm text-gray-400">Prevent others from taking screenshots</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSetting('blockScreenshots')}
                        className={`w-14 h-8 rounded-full transition-all ${
                          settings.blockScreenshots ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.blockScreenshots ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* Verified Users Only */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Verified Users Only</p>
                          <p className="text-sm text-gray-400">Only interact with verified profiles</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSetting('verifiedOnly')}
                        className={`w-14 h-8 rounded-full transition-all ${
                          settings.verifiedOnly ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.verifiedOnly ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* Hide from Phone Contacts */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <p className="font-medium">Hide from Phone Contacts</p>
                          <p className="text-sm text-gray-400">Don't show your profile to contacts</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSetting('hideFromContacts')}
                        className={`w-14 h-8 rounded-full transition-all ${
                          settings.hideFromContacts ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.hideFromContacts ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-blue-400 mb-2">Safety Tips</h3>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Never share personal information with strangers</li>
                        <li>• Meet in public places for first dates</li>
                        <li>• Tell friends/family about your plans</li>
                        <li>• Trust your instincts - report suspicious behavior</li>
                        <li>• Use VeXa's video call feature before meeting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Communication Settings */}
            {activeSection === 'communication' && (
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Communication Preferences
                </h2>

                <div className="space-y-6">
                  {/* Who Can Message */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Who can send you messages?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['everyone', 'matches', 'verified'].map(option => (
                        <button
                          key={option}
                          onClick={() => updateSetting('whoCanMessage', option)}
                          className={`px-4 py-3 rounded-xl border transition-all ${
                            settings.whoCanMessage === option
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-transparent'
                              : 'bg-slate-700 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {option === 'everyone' && '🌍 Everyone'}
                          {option === 'matches' && '💕 Matches'}
                          {option === 'verified' && '✓ Verified'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Who Can Call */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Who can call you?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['everyone', 'matches', 'verified'].map(option => (
                        <button
                          key={option}
                          onClick={() => updateSetting('whoCanCall', option)}
                          className={`px-4 py-3 rounded-xl border transition-all ${
                            settings.whoCanCall === option
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-transparent'
                              : 'bg-slate-700 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {option === 'everyone' && '🌍 Everyone'}
                          {option === 'matches' && '💕 Matches'}
                          {option === 'verified' && '✓ Verified'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Read Receipts */}
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">Read Receipts</p>
                        <p className="text-sm text-gray-400">Let others see when you've read messages</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting('readReceipts')}
                      className={`w-14 h-8 rounded-full transition-all ${
                        settings.readReceipts ? 'bg-green-500' : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        settings.readReceipts ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Typing Indicator</p>
                        <p className="text-sm text-gray-400">Show when you're typing</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting('typingIndicator')}
                      className={`w-14 h-8 rounded-full transition-all ${
                        settings.typingIndicator ? 'bg-green-500' : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        settings.typingIndicator ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Blocking & Reporting */}
            {activeSection === 'blocking' && (
              <div className="space-y-4">
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <UserX className="w-6 h-6" />
                    Blocked Users
                  </h2>

                  <div className="space-y-3">
                    {settings.blockedUsers === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <UserX className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No blocked users</p>
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-slate-700/50 rounded-xl">
                        <p className="text-2xl font-bold mb-1">{settings.blockedUsers}</p>
                        <p className="text-sm text-gray-400">Blocked Users</p>
                        <button className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition-colors">
                          Manage Blocked List
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                  <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Report Abuse
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    If you encounter inappropriate behavior, harassment, or suspicious activity, please report it immediately. Our team reviews all reports within 24 hours.
                  </p>
                  <button className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors">
                    Report a User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}