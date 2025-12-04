# 📹 دليل دمج Agora للفيديو والصوت - VeXa Chat World

## 🎯 نظرة عامة

Agora.io هي منصة عالمية للاتصالات الفورية (RTC) تُستخدم في تطبيقات مثل Clubhouse و Tinder. سنستخدمها لإضافة:
- ✅ مكالمات فيديو HD
- ✅ مكالمات صوتية
- ✅ دردشة فيديو جماعية
- ✅ بث مباشر

---

## 🚀 الخطوة 1: إنشاء حساب Agora

### 1.1 التسجيل
```
1. اذهب إلى https://www.agora.io
2. اضغط "Sign Up" (مجاني - 10,000 دقيقة شهرياً)
3. سجل بـ Email أو GitHub
4. أكمل التحقق
```

### 1.2 إنشاء Project
```
1. Dashboard → Projects → Create
2. اسم المشروع: "VeXa Chat World"
3. Use Case: Social
4. Authentication: Testing mode (للتطوير)
   أو Secured mode (للإنتاج)
```

### 1.3 الحصول على المفاتيح
```
App ID: [نسخه من Dashboard]
App Certificate: [فعّل وانسخه]
```

---

## 📦 الخطوة 2: تثبيت المكتبات

```bash
npm install agora-rtc-react agora-rtc-sdk-ng
```

---

## ⚙️ الخطوة 3: إعداد Environment Variables

أضف في `.env.local`:

```env
NEXT_PUBLIC_AGORA_APP_ID=your_app_id_here
AGORA_APP_CERTIFICATE=your_certificate_here
```

---

## 🎥 الخطوة 4: إنشاء Video Call Hook

أنشئ `src/hooks/useVideoCall.js`:

```javascript
'use client';

import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

export const useVideoCall = () => {
  const [client] = useState(() => AgoraRTC.createClient({ 
    mode: 'rtc', 
    codec: 'vp8' 
  }));
  
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  // الانضمام للقناة
  const join = async (channel, token, uid) => {
    try {
      // الانضمام
      await client.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID,
        channel,
        token,
        uid
      );

      // إنشاء Video & Audio Tracks
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);

      // نشر الـ Tracks
      await client.publish([videoTrack, audioTrack]);

      setIsJoined(true);

      // الاستماع للمستخدمين الجدد
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        
        if (mediaType === 'video') {
          setRemoteUsers(prev => [...prev, user]);
        }
        
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user) => {
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      });

      return { success: true };
    } catch (error) {
      console.error('Error joining channel:', error);
      return { success: false, error };
    }
  };

  // مغادرة القناة
  const leave = async () => {
    try {
      localVideoTrack?.close();
      localAudioTrack?.close();
      await client.leave();
      setIsJoined(false);
      setRemoteUsers([]);
    } catch (error) {
      console.error('Error leaving channel:', error);
    }
  };

  // تشغيل/إيقاف الفيديو
  const toggleVideo = async () => {
    if (isVideoOn) {
      await localVideoTrack?.setEnabled(false);
    } else {
      await localVideoTrack?.setEnabled(true);
    }
    setIsVideoOn(!isVideoOn);
  };

  // تشغيل/إيقاف الصوت
  const toggleAudio = async () => {
    if (isAudioOn) {
      await localAudioTrack?.setEnabled(false);
    } else {
      await localAudioTrack?.setEnabled(true);
    }
    setIsAudioOn(!isAudioOn);
  };

  // مشاركة الشاشة
  const shareScreen = async () => {
    try {
      const screenTrack = await AgoraRTC.createScreenVideoTrack();
      await client.unpublish(localVideoTrack);
      await client.publish(screenTrack);
      
      screenTrack.on('track-ended', async () => {
        await client.unpublish(screenTrack);
        await client.publish(localVideoTrack);
      });
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  return {
    client,
    localVideoTrack,
    localAudioTrack,
    remoteUsers,
    isJoined,
    isVideoOn,
    isAudioOn,
    join,
    leave,
    toggleVideo,
    toggleAudio,
    shareScreen,
  };
};
```

---

## 🎬 الخطوة 5: إنشاء Video Call Component

أنشئ `src/components/VideoCall.js`:

```javascript
'use client';

import { useEffect, useRef } from 'react';
import { useVideoCall } from '@/hooks/useVideoCall';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor } from 'lucide-react';

export default function VideoCall({ channelName, onLeave }) {
  const {
    localVideoTrack,
    localAudioTrack,
    remoteUsers,
    isJoined,
    isVideoOn,
    isAudioOn,
    join,
    leave,
    toggleVideo,
    toggleAudio,
    shareScreen,
  } = useVideoCall();

  const localVideoRef = useRef(null);
  const remoteVideoRefs = useRef({});

  // الانضمام عند التحميل
  useEffect(() => {
    const uid = Math.floor(Math.random() * 100000);
    join(channelName, null, uid); // token = null للـ Testing mode

    return () => {
      leave();
    };
  }, []);

  // تشغيل الفيديو المحلي
  useEffect(() => {
    if (localVideoTrack && localVideoRef.current) {
      localVideoTrack.play(localVideoRef.current);
    }
  }, [localVideoTrack]);

  // تشغيل الفيديو للمستخدمين الآخرين
  useEffect(() => {
    remoteUsers.forEach(user => {
      if (user.videoTrack && remoteVideoRefs.current[user.uid]) {
        user.videoTrack.play(remoteVideoRefs.current[user.uid]);
      }
    });
  }, [remoteUsers]);

  const handleLeave = async () => {
    await leave();
    onLeave?.();
  };

  return (
    <div className="relative w-full h-full bg-slate-900">
      {/* Remote Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 h-full">
        {remoteUsers.map(user => (
          <div 
            key={user.uid} 
            ref={el => remoteVideoRefs.current[user.uid] = el}
            className="relative bg-slate-800 rounded-xl overflow-hidden"
          />
        ))}
        
        {remoteUsers.length === 0 && (
          <div className="flex items-center justify-center text-gray-400">
            <p>Waiting for others to join...</p>
          </div>
        )}
      </div>

      {/* Local Video (Picture-in-Picture) */}
      <div className="absolute bottom-20 right-4 w-32 h-40 bg-slate-800 rounded-xl overflow-hidden border-2 border-white/20">
        <div ref={localVideoRef} className="w-full h-full" />
        {!isVideoOn && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <VideoOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 to-transparent">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full transition-all ${
              isVideoOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500/20 hover:bg-red-500/30'
            }`}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>

          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full transition-all ${
              isAudioOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500/20 hover:bg-red-500/30'
            }`}
          >
            {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          <button
            onClick={shareScreen}
            className="p-4 rounded-full bg-slate-700 hover:bg-slate-600 transition-all"
          >
            <Monitor className="w-6 h-6" />
          </button>

          <button
            onClick={handleLeave}
            className="p-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg transition-all"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔐 الخطوة 6: إنشاء Token Server (للأمان)

للإنتاج، تحتاج Token Server لتوليد tokens آمنة.

أنشئ `src/app/api/agora/token/route.js`:

```javascript
import { NextResponse } from 'next/server';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

export async function POST(request) {
  try {
    const { channelName, uid } = await request.json();

    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    const role = RtcRole.PUBLISHER;
    const expirationTime = 3600; // 1 hour
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTime + expirationTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    return NextResponse.json({ token, uid });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
```

وثبت المكتبة:
```bash
npm install agora-access-token
```

---

## 📱 الخطوة 7: استخدام في الصفحات

في `src/app/video-call/[channelId]/page.js`:

```javascript
'use client';

import { useParams, useRouter } from 'next/navigation';
import VideoCall from '@/components/VideoCall';

export default function VideoCallPage() {
  const params = useParams();
  const router = useRouter();
  const channelId = params.channelId;

  const handleLeave = () => {
    router.push('/dashboard');
  };

  return (
    <div className="h-screen">
      <VideoCall 
        channelName={channelId} 
        onLeave={handleLeave}
      />
    </div>
  );
}
```

---

## 🎤 الخطوة 8: Voice Call Component

أنشئ `src/components/VoiceCall.js`:

```javascript
'use client';

import { useEffect } from 'react';
import { useVideoCall } from '@/hooks/useVideoCall';
import { Mic, MicOff, PhoneOff } from 'lucide-react';

export default function VoiceCall({ channelName, onLeave }) {
  const {
    isAudioOn,
    join,
    leave,
    toggleAudio,
  } = useVideoCall();

  useEffect(() => {
    const uid = Math.floor(Math.random() * 100000);
    join(channelName, null, uid);

    return () => {
      leave();
    };
  }, []);

  const handleLeave = async () => {
    await leave();
    onLeave?.();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-8xl">
            🎤
          </div>
          {isAudioOn && (
            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ping"></div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold">Voice Call</h2>
          <p className="text-gray-300">Crystal clear audio</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleAudio}
            className={`p-6 rounded-full transition-all ${
              isAudioOn ? 'bg-slate-700' : 'bg-red-500/20'
            }`}
          >
            {isAudioOn ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
          </button>

          <button
            onClick={handleLeave}
            className="p-6 rounded-full bg-gradient-to-r from-red-500 to-red-600"
          >
            <PhoneOff className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🧪 الخطوة 9: Testing

### 9.1 Testing Mode (Development)
```javascript
// في useVideoCall.js
await client.join(
  appId,
  channel,
  null, // token = null في Testing mode
  uid
);
```

### 9.2 Production Mode
```javascript
// احصل على Token من API
const response = await fetch('/api/agora/token', {
  method: 'POST',
  body: JSON.stringify({ channelName, uid }),
});
const { token } = await response.json();

await client.join(appId, channel, token, uid);
```

---

## 📊 الخطوة 10: Analytics & Monitoring

في Agora Dashboard:
- **Usage**: راقب الدقائق المستخدمة
- **Quality**: جودة المكالمات
- **Analytics**: عدد المستخدمين النشطين

---

## 💰 التسعير

### Free Tier:
- 10,000 دقيقة/شهر مجاناً
- جودة HD
- عدد غير محدود من المستخدمين

### Paid Plans:
- $0.99 لكل 1000 دقيقة (Video)
- $0.49 لكل 1000 دقيقة (Audio)

---

## 🔧 Troubleshooting

### المشكلة: الكاميرا لا تعمل
```javascript
// تحقق من Permissions
const permissions = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});
```

### المشكلة: لا صوت
```javascript
// تأكد من تشغيل audio track
user.audioTrack?.play();
```

### المشكلة: Latency عالي
- استخدم `mode: 'live'` للبث المباشر
- استخدم `mode: 'rtc'` للمكالمات

---

## ✅ Checklist

- [ ] حساب Agora منشأ
- [ ] App ID و Certificate منسوخة
- [ ] المكتبات مثبتة
- [ ] useVideoCall Hook جاهز
- [ ] VideoCall Component جاهز
- [ ] Token Server جاهز (للإنتاج)
- [ ] Testing نجح
- [ ] نشر على vexachat.world

---

## 🎉 النتيجة النهائية

الآن لديك:
✅ مكالمات فيديو HD
✅ مكالمات صوتية نقية
✅ مشاركة الشاشة
✅ جودة عالية
✅ أمان كامل

**vexachat.world جاهز للإطلاق! 🚀**