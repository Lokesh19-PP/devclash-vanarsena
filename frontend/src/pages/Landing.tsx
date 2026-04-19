import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, ShieldAlert, Target, Database, Search, Brain, Box, Globe, Code2, Sparkles, Network, FileText, Component, Activity } from 'lucide-react';
import VantaFog from '../components/Visualization/VantaFog';
import VantaDots from '../components/Visualization/VantaDots';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: Network, title: 'Architecture Graph', desc: 'Visualize dependencies instantly in a real-time, interactive 3D WebGL environment.', color: 'text-indigo-400' },
    { icon: FileText, title: 'AI Summaries', desc: 'Auto-generated conversational documentation for every file and folder in the repo.', color: 'text-emerald-400' },
    { icon: Search, title: 'Natural Language Querying', desc: 'Ask questions about your codebase and receive contextually accurate answers.', color: 'text-cyan-400' },
    { icon: Component, title: 'Component Isolation', desc: 'Filter out the noise. Isolate specific components, services, or modules effortlessly.', color: 'text-purple-400' },
    { icon: ShieldAlert, title: 'Risk Detection', desc: 'Identify circular dependencies, deprecated imports, and high-churn bottleneck files.', color: 'text-red-400' },
    { icon: Zap, title: 'Instant Ingestion', desc: 'Connect your GitHub via URL and watch the entire architecture render in seconds.', color: 'text-amber-400' }
  ];

  return (
    <div className="relative min-h-screen w-full text-white bg-[#0a0a0a] font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Global Accent Theme: Neon Indigo (#6366f1) and Emerald/Cyan */}
      
      {/* Structural Dot Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.06] z-10"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />

      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 backdrop-blur-xl bg-black/20 flex items-center px-8 md:px-16 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-transparent border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.6)]">
            <Zap size={20} className="text-indigo-400" fill="currentColor" />
          </div>
          <span className="font-bold text-2xl italic tracking-tight text-white">RepoSensei</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center z-20">
        <VantaDots />
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-12 pointer-events-none">
          <h1 className="text-7xl md:text-[9rem] font-bold tracking-tight leading-[0.9] mb-16" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="text-white block">Architect your</span>
            <span className="text-white/70 block">understanding</span>
          </h1>
          
          <button 
            onClick={() => navigate('/onboarding')}
            className="group relative px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-white/30 transition-all overflow-hidden pointer-events-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center gap-3 text-sm font-black tracking-widest uppercase font-mono text-white drop-shadow-md">
              GET STARTED NOW
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* 3. Problem & Solution Context Matrix */}
      <section className="relative py-32 px-8 z-20 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px border border-white/5 rounded-[40px] overflow-hidden bg-white/5 shadow-2xl">
          <div className="p-16 bg-[#0a0a0a]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-8">
              <ShieldAlert size={14} className="text-red-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">The Problem</span>
            </div>
            <h3 className="text-4xl font-bold mb-6 tracking-tight">Flying Blind</h3>
            <p className="text-white/50 font-mono text-sm leading-relaxed">
              Manually tracing imports across hundreds of files is impossible. When developers fly blind scrolling through thousands of lines of legacy spaghetti code, technical debt compounds and delivery grinds to a halt.
            </p>
          </div>
          
          <div className="p-16 bg-[#0a0a0a]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
              <Target size={14} className="text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Our Solution</span>
            </div>
            <h3 className="text-4xl font-bold mb-6 tracking-tight">Deep Static Analysis</h3>
            <p className="text-white/50 font-mono text-sm leading-relaxed">
              We instantly ingest, parse, and map your repository using intelligent AST traversal. Our neural engine visualizes the invisible, turning monolithic confusion into a clear, navigable network.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Workflow Pipeline */}
      <section className="relative py-32 px-8 z-20 max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4 tracking-tight">From Repo to Reality in Seconds</h2>
        <p className="text-white/40 text-base mb-24 max-w-2xl mx-auto">A fully automated pipeline that handles the heavy lifting.</p>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <div className="hidden md:block absolute top-[48px] left-[15%] w-[70%] h-[1px] bg-indigo-500/20 z-0" />
          
          {[{ name: '1. Ingest Repository', icon: Globe, desc: 'Paste any GitHub URL. Our engine securely clones the codebase for analysis.' }, 
            { name: '2. Static Analysis', icon: Activity, desc: 'AST parsing extracts dependencies, modules, and call graphs autonomously.' }, 
            { name: '3. AI Synthesis', icon: Brain, desc: 'Our neural engine generates plain-English summaries for every logic block.' }, 
            { name: '4. Graph Render', icon: Network, desc: 'Navigate the interactive 3D map of your newly demystified architecture.' }].map((stage, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center group w-full md:w-56">
              <div className="w-24 h-24 rounded-full bg-[#030303] flex items-center justify-center mb-6 shadow-xl relative ring-1 ring-white/5 group-hover:ring-indigo-500/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                  <stage.icon size={22} className="text-indigo-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white tracking-tight mb-3">{stage.name}</span>
              <p className="text-xs text-white/40 leading-relaxed font-sans max-w-[200px]">{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bento Grid Platform Capabilities */}
      <section className="relative py-32 px-8 z-20 max-w-6xl mx-auto flex flex-col items-center">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-indigo-500 uppercase mb-8">PLATFORM CAPABILITIES</span>
        <h2 className="text-6xl md:text-7xl font-bold mb-20 tracking-tight text-center max-w-4xl leading-[1.1]">
          Everything you need to navigate complex code.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-indigo-500/[0.03] hover:border-indigo-500/20 transition-all duration-300 group">
               <div className={`w-12 h-12 rounded-2xl mb-8 flex items-center justify-center ${f.color} bg-black border border-white/5 group-hover:border-indigo-500/30 shadow-lg`}>
                 <f.icon size={20} />
               </div>
               <h4 className="text-xl font-bold mb-3 tracking-tight">{f.title}</h4>
               <p className="text-sm text-white/50 font-mono leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Code vs. Node Split Visualizer Panel */}
      <section className="relative py-32 px-8 z-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 max-w-xl">
            <h2 className="text-5xl font-bold mb-6 tracking-tight leading-[1.1]">Stop reading code.<br />Start seeing it.</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10">
              A file tree and thousands of lines of text don't tell the whole story. By translating source code into an interactive 3D constellation, we give your brain the structural map it naturally craves.
            </p>
            <ul className="space-y-5">
              <li className="flex items-center gap-4 text-sm text-white/80 tracking-wide">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center"><Zap size={10} className="text-indigo-400" fill="currentColor"/></div>
                Identifies Core Business Logic vs Utilities
              </li>
              <li className="flex items-center gap-4 text-sm text-white/80 tracking-wide">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center"><Zap size={10} className="text-indigo-400" fill="currentColor"/></div>
                Highlights External Integrations
              </li>
              <li className="flex items-center gap-4 text-sm text-white/80 tracking-wide">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center"><Zap size={10} className="text-indigo-400" fill="currentColor"/></div>
                Analyzes Commit History Evolution
              </li>
            </ul>
          </div>

          <div className="flex-1 w-full flex h-[400px] rounded-[32px] overflow-hidden border border-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.8)] bg-[#050505]">
            {/* Left Side: Code Editor */}
            <div className="w-[45%] p-10 border-r border-white/5 flex flex-col justify-center relative bg-[#080808]">
               <pre className="font-mono text-[11px] md:text-xs leading-loose select-none overflow-hidden relative z-10 text-white/40">
                  <span className="text-white/30">import</span><br/>
                  {'{'} <span className="text-white/80">AuthProvider</span> {'}'}<br/>
                  <span className="text-white/30">from</span><br/>
                  <span className="text-emerald-400/70">'./auth'</span><br/>
                  ;<br/><br/>
                  <span className="text-white/30">export</span><br/>
                  <span className="text-white/30">const</span><br/>
                  <span className="text-white/80">App</span> = () =&gt; {'{'}<br/><br/>
                  <span className="text-white/30">return</span><br/>
                  (<br/>
                  &nbsp;&nbsp;&lt;<span className="text-white/60">AuthProvider</span>&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-white/60">MainLayout</span>&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-white/60">Dashboard</span> /&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-white/60">MainLayout</span>&gt;<br/>
                  &nbsp;&nbsp;&lt;/<span className="text-white/60">AuthProvider</span>&gt;<br/>
                  )<br/>
               </pre>
            </div>
            
            {/* Right Side: Dataflow Visualizer */}
            <div className="flex-1 relative bg-[#0a0a0a] flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 w-[1px] h-32 bg-white/10 -translate-x-1/2 -translate-y-1/2 z-0" />
              
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <ShieldAlert size={16} className="text-emerald-400" />
                </div>
              </div>

              <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-14 h-14 rounded-[16px] border border-indigo-500/40 flex items-center justify-center bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Box size={20} className="text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Performance Stats Banner */}
      <section className="relative py-32 px-8 z-20 flex flex-col items-center border-y border-white/5 bg-[#0a0a0a]">
        <div className="text-center w-full mb-20">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">ENGINEERED FOR PERFORMANCE</span>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 text-center">
          {[
            { v: '0.4s', l: 'BLAZING FAST SYNTHESIS' }, 
            { v: '60fps', l: '3D RENDER PERFORMANCE' }, 
            { v: '12ms', l: 'NEURAL PROCESSING LATENCY' }, 
            { v: '100%', l: 'SERVER UPTIME GUARANTEED' }
          ].map((s, i) => (
             <div key={i} className="cursor-default flex flex-col items-center max-w-[140px]">
               <div className="text-7xl font-sans font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 via-indigo-300 to-white pb-2 leading-none">
                 {s.v}
               </div>
               <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/30 uppercase mt-8 leading-[1.6]">
                 {s.l}
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* 8. Advanced Footer */}
      <footer className="relative border-t border-white/10 z-10 overflow-hidden">
        <VantaFog />
        
        <div className="relative z-10 pt-48 pb-20 px-8 md:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
            
            {/* Brand Left */}
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-indigo-400" size={28} />
                <span className="font-sans font-black text-3xl italic tracking-tight text-white drop-shadow-md">RepoSensei</span>
              </div>
              <p className="text-white/60 font-mono text-sm leading-relaxed mb-10 drop-shadow-md">
                Illuminating the dark corners of your darkest codebases. We turn sprawling legacy monoliths into comprehensible, beautiful visual maps.
              </p>
              <div className="flex gap-6 text-white/50">
                 <Globe size={24} className="hover:text-indigo-400 transition-colors cursor-pointer drop-shadow-md" />
                 <Code2 size={24} className="hover:text-indigo-400 transition-colors cursor-pointer drop-shadow-md" />
                 <Network size={24} className="hover:text-indigo-400 transition-colors cursor-pointer drop-shadow-md" />
              </div>
            </div>
            
            {/* Sitemap Right */}
            <div className="flex gap-24 font-mono text-sm mt-4 drop-shadow-md">
              <div className="flex flex-col gap-6">
                 <span className="font-bold text-white mb-2 uppercase tracking-[0.2em] text-xs">Product</span>
                 <span className="text-white/70 hover:text-white cursor-pointer transition-colors">Analysis</span>
                 <span className="text-white/70 hover:text-white cursor-pointer transition-colors">Security</span>
                 <span className="text-white/70 hover:text-white cursor-pointer transition-colors">Pricing</span>
              </div>
              <div className="flex flex-col gap-6">
                 <span className="font-bold text-white mb-2 uppercase tracking-[0.2em] text-xs">Company</span>
                 <span className="text-white/70 hover:text-white cursor-pointer transition-colors">About</span>
                 <span className="text-white/70 hover:text-white cursor-pointer transition-colors">Careers</span>
                 <span className="text-white/70 hover:text-white cursor-pointer transition-colors">Blog</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/30 drop-shadow-md">
            <span>© 2026 RepoSensei.</span>
            <div className="flex gap-8">
              <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white/60 cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
