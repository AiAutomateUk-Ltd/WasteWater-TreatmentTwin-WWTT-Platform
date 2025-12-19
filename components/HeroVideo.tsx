
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Play, 
  Loader2, 
  ShieldCheck, 
  ExternalLink, 
  Film, 
  Sparkles,
  RefreshCcw,
  Zap,
  Info,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';

const LOADING_MESSAGES = [
  "Synchronizing Neural Assets...",
  "Compiling Digital Twin Logic...",
  "Visualizing IoT Connectivity...",
  "Mapping Predictive Maintenance Hub...",
  "Finalizing Industrial Vision...",
];

const HeroVideo: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if we can start automatically on mount
  useEffect(() => {
    const checkAutoStart = async () => {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (hasKey) {
          generateVideo();
        }
      } catch (e) {
        console.debug("Auto-start check failed (Expected if no key selected yet)");
      }
    };
    checkAutoStart();
  }, []);

  const handleKeyRequest = async () => {
    try {
      setError(null);
      await window.aistudio.openSelectKey();
      // Assume success after dialog trigger per guidelines
      generateVideo();
    } catch (err) {
      setError("Authorization failed. Please ensure an API key is selected.");
    }
  };

  const generateVideo = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let msgIndex = 0;
    
    const messageInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
      setStatusMessage(LOADING_MESSAGES[msgIndex]);
    }, 12000);

    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A sleek cinematic 3D isometric animation of a smart factory floor. Glowing emerald data lines connect robotic arms to a central digital twin hologram. A dashboard screen showing data graphs is visible in the background. High-tech, futuristic, clean dark-slate and emerald aesthetic, 4k, smooth drone camera motion.',
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("No video data returned.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("not found")) {
        setError("API Key verification failed. Please re-select your key.");
      } else {
        setError("Neural Render Timeout. This can happen during peak load. Please retry.");
      }
    } finally {
      setLoading(false);
      clearInterval(messageInterval);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative group">
      {!videoUrl ? (
        <div className="relative aspect-video rounded-[40px] overflow-hidden bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-12 text-center group-hover:border-emerald-500/30 transition-all duration-700 shadow-2xl">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10b98122_0%,transparent_70%)]" />
            <div className="w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          {loading ? (
            <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-700">
              <div className="relative inline-block">
                <div className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
                <Film className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white tracking-tight">{statusMessage}</h3>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm text-slate-500 font-mono">RENDERING FRAME: LATEST</p>
                  <p className="text-xs text-emerald-500/60 uppercase tracking-widest font-bold">AI Synthesis in Progress</p>
                </div>
              </div>
              <div className="w-64 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-emerald-500 animate-[loading_3s_infinite_linear]" style={{ width: '30%' }} />
              </div>
            </div>
          ) : (
            <div className="relative z-10 space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                <Zap className="w-3 h-3" /> System Overview
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-white tracking-tight leading-tight">Visualize Your Industrial Future</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  Initiate the AI vision engine to generate a cinematic explainer of the AiAutomateUK ecosystem.
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3 animate-in slide-in-from-top-2">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <button 
                  onClick={handleKeyRequest}
                  className="group px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-2xl shadow-emerald-500/20"
                >
                  <Play className="w-5 h-5 fill-current" />
                  INITIALIZE EXPLAINER
                </button>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2 border-b border-transparent hover:border-slate-500 pb-1 transition-all"
                >
                  Billing & API Policy <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-video rounded-[40px] overflow-hidden bg-black border border-slate-800 shadow-[0_35px_60px_-15px_rgba(16,185,129,0.15)] group/player animate-in fade-in duration-1000">
          <video 
            ref={videoRef}
            src={videoUrl} 
            autoPlay 
            loop 
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-90 group-hover/player:opacity-100 transition-opacity duration-500"
          />
          
          {/* Neural HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start opacity-0 group-hover/player:opacity-100 transition-opacity duration-500">
              <div className="p-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Simulation</p>
                <p className="text-xs font-mono text-emerald-400">VE-VISUALIZER-PRO-3.1</p>
              </div>
              <div className="p-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Core Telemetry</p>
                <p className="text-xs font-mono text-emerald-400">FPS: 60 | RENDER: AI</p>
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-sm border border-slate-800/30 p-6 rounded-[24px] max-w-sm self-center translate-y-4 group-hover/player:translate-y-0 opacity-0 group-hover/player:opacity-100 transition-all duration-700 delay-100">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Application Usage
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience seamless integration of Digital Twins, real-time IoT lifecycle monitoring, and Gemini-driven Predictive Maintenance.
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="absolute bottom-8 right-8 flex gap-3 opacity-0 group-hover/player:opacity-100 transition-all duration-300 translate-y-4 group-hover/player:translate-y-0">
            <button 
              onClick={toggleMute}
              className="p-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl text-white hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-xl pointer-events-auto"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setVideoUrl(null)}
              className="p-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl text-white hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-xl pointer-events-auto"
              title="Refresh Vision"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={() => videoRef.current?.requestFullscreen()}
              className="p-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl text-white hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-xl pointer-events-auto"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
};

export default HeroVideo;
