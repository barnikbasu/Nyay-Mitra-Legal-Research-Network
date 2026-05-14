import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  Menu, 
  X,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Loader2,
  Download,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { cn } from '@/src/lib/utils';
import { ViewState } from './types';
import * as gemini from './services/geminiService';

// Components

const Navbar = ({ currentView, setView }: { currentView: ViewState, setView: (v: ViewState) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Scale },
    { id: 'analyzer', label: 'Analyzer', icon: Search },
    { id: 'checker', label: 'Explorer', icon: HelpCircle },
    { id: 'finder', label: 'Finder', icon: BookOpen },
    { id: 'drafter', label: 'Drafter', icon: FileText },
  ];

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b border-white/10",
        scrolled ? "bg-black/90 backdrop-blur-md py-2" : "bg-[#0F0F0F] py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-col cursor-pointer" onClick={() => setView('home')}>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">Nyaya Mitra</h1>
            <span className="text-[9px] tracking-[0.3em] uppercase opacity-50 mt-1">Legal Research System</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as ViewState)}
                  className={cn(
                    "px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all",
                    currentView === item.id 
                      ? "text-emerald-400 border-b-2 border-emerald-400" 
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white/50 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-legal-dark border-t border-slate-700 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id as ViewState);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center gap-3",
                    currentView === item.id 
                      ? "bg-legal-accent text-white" 
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onAction }: { onAction: (v: ViewState) => void }) => (
  <div className="bg-[#0A0A0A] border-b border-white/10 pt-24 pb-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="flex flex-col items-center text-center"
      >
        <span className="label-micro text-emerald-400 mb-8 border border-emerald-400/30 px-3 py-1">
          Constitutional Framework BNS/BNSS 2024
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.85] mb-10">
          Citizen<br/><span className="text-emerald-400">Justice</span><br/>Network.
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-16 font-medium italic font-serif normal-case">
          Expert legal research for the modern Indian citizen. Analyze, examine, and resolve disputes within the constitutional bounds of India.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button 
            onClick={() => onAction('analyzer')}
            className="flex-1 btn-industrial-primary"
          >
            Start Analysis
          </button>
          <button 
            onClick={() => onAction('checker')}
            className="flex-1 btn-industrial-outline"
          >
            Run Explorer
          </button>
        </div>
      </motion.div>
    </div>
  </div>
);

const FeatureGrid = ({ onAction }: { onAction: (v: ViewState) => void }) => {
  const features = [
    { 
      id: 'analyzer',
      title: 'Incident Analysis', 
      code: '88-INC',
      desc: 'Deep statutory analysis of events and disputes.'
    },
    { 
      id: 'checker',
      title: 'Law Checker', 
      code: '04-CHK',
      desc: 'Verify legality of actions under current statutes.'
    },
    { 
      id: 'finder',
      title: 'Statute Finder', 
      code: '21-BNS',
      desc: 'Locate relevant sections in national legal codes.'
    },
    { 
      id: 'drafter',
      title: 'Notice Draft', 
      code: '09-DFT',
      desc: 'Generate authoritative factual documents.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 max-w-7xl mx-auto px-0 py-0 border-b border-white/10">
      {features.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onAction(f.id as ViewState)}
          className="p-10 border-r border-white/10 last:border-r-0 hover:bg-white hover:text-black transition-all cursor-pointer group flex flex-col"
        >
          <span className="label-micro mb-12 block group-hover:text-black group-hover:opacity-100">{f.code}</span>
          <h3 className="text-3xl font-black tracking-tighter uppercase mb-4 leading-none">{f.title}</h3>
          <p className="text-white/40 text-[11px] leading-tight group-hover:text-black/60 font-bold uppercase tracking-widest">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

const AnalysisView = () => {
  const [incident, setIncident] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!incident.trim()) return;
    setIncident('');
    setLoading(true);
    try {
      const res = await gemini.analyzeIncident(incident);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0 min-h-[calc(100vh-64px)]">
      <div className="col-span-12 lg:col-span-4 bg-[#0F0F0F] border-r border-white/10 p-10 flex flex-col">
        <span className="label-micro text-emerald-400 mb-2">Operation: Analyze</span>
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-none">
          Incident<br/>Input.
        </h2>
        
        <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-10 leading-relaxed">
          Describe the situation with factual precision. include timeline, actors, and specific outcomes.
        </p>

        <textarea
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="ENTER CASE DATA..."
          className="flex-1 bg-white/5 border border-white/10 p-6 text-white font-serif italic text-lg outline-none focus:border-white transition-colors placeholder:text-white/10 resize-none pb-12"
        />
        
        <button
          onClick={handleAnalyze}
          disabled={loading || !incident}
          className="mt-8 btn-industrial-primary flex justify-center items-center gap-4"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Process Data"}
        </button>
      </div>

      <div className="col-span-12 lg:col-span-8 bg-[#0A0A0A] p-10 lg:p-20 relative overflow-hidden">
        <AnimatePresence>
          {!result && !loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
              className="absolute inset-0 flex items-center justify-center p-20 pointer-events-none"
            >
              <Scale size={400} strokeWidth={0.5} />
            </motion.div>
          )}
          
          {loading && (
            <motion.div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="animate-spin text-emerald-400 mb-6" size={48} />
              <span className="label-micro animate-pulse">Analyzing statutory documentation...</span>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-10">
                <div>
                  <span className="label-micro text-amber-500 mb-2 block">System Output #ANALYSIS</span>
                  <h3 className="text-6xl font-black tracking-tighter uppercase leading-none">Legal<br/>Report.</h3>
                </div>
                <button 
                  onClick={() => window.print()} 
                  className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
                >
                  Download .PDF
                </button>
              </div>
              
              <div className="markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const QuickCheckView = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await gemini.quickCheck(query);
      setAnswer(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "IS IT LEGAL FOR POLICE TO SEARCH MY PHONE?",
    "CAN SALARY BE WITHHELD FOR EXITING WITHOUT NOTICE?",
    "IS RECORDING A PUBLIC SERVANT IN DUTY LEGAL?",
    "CONSENT AND MARRIAGE AGE IN INDIA 2024?",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-20">
        <span className="label-micro text-emerald-400 mb-4 block">Operation: Explorer</span>
        <h2 className="text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.85]">
          Is it <br/><span className="text-emerald-400">Legal?</span>
        </h2>
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Direct statutory interpretation for common citizen queries.</p>
      </div>

      <div className="bg-[#0F0F0F] p-8 border border-white/10 flex flex-col md:flex-row gap-4 mb-12">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER QUERY EX: LANDLORD ENTRY WITHOUT NOTICE..."
          className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-xl font-serif italic outline-none focus:border-emerald-400 transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
        />
        <button 
          onClick={handleCheck}
          disabled={loading || !query}
          className="btn-industrial-primary md:w-64"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : 'RUN CHECK'}
        </button>
      </div>

      {!answer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setQuery(s)}
              className="p-6 text-left text-[11px] font-bold uppercase tracking-widest bg-[#0A0A0A] border border-white/10 hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center justify-between group"
            >
              {s}
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          ))}
        </div>
      )}

      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-black p-12 border-L-8 border-emerald-400 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Scale size={200} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8 border-b border-black/10 pb-4">
              <span className="font-black uppercase tracking-tighter text-2xl">Statutory Ruling</span>
            </div>
            <div className="markdown-body !text-black prose-invert max-w-none">
              <Markdown>{answer}</Markdown>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SectionFinderView = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<string | null>(null);

  const handleFind = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await gemini.findSections(topic);
      setSections(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-0 py-0 grid grid-cols-12 min-h-screen">
      <div className="col-span-12 lg:col-span-4 bg-[#0A0A0A] border-r border-white/10 p-12">
        <span className="label-micro text-amber-500 mb-4 block">Operation: Find</span>
        <h2 className="text-6xl font-black tracking-tighter uppercase mb-8 leading-none">Statute<br/>Finder.</h2>
        <p className="text-white/30 font-bold uppercase tracking-widest text-[10px] mb-12">Search national statutes including the new Bharatiya Nyaya Sanhita (BNS) 2024 and IT Act.</p>
        
        <div className="space-y-6">
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="EX: ONLINE FRAUD VIA WHATSAPP"
            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-lg font-serif italic outline-none focus:border-amber-500 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleFind()}
          />
          <button 
            onClick={handleFind}
            disabled={loading || !topic}
            className="w-full py-4 border border-white/20 text-white font-black uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Query Statutes'}
          </button>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 bg-[#0F0F0F] p-12 lg:p-24 overflow-y-auto">
        <AnimatePresence>
          {sections ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl"
            >
              <div className="markdown-body">
                <Markdown>{sections}</Markdown>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-10">
              <BookOpen size={200} strokeWidth={0.5} />
              <span className="label-micro mt-8">Awaiting Input Query</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DraftingView = () => {
  const [selectedType, setSelectedType] = useState('FIR Draft');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const draftTypes = [
    { title: "FIR Draft", code: "DFT-01" },
    { title: "Legal Notice", code: "DFT-02" },
    { title: "Consumer Complaint", code: "DFT-03" },
    { title: "Cybercrime Report", code: "DFT-04" },
    { title: "RTI Application", code: "DFT-05" },
    { title: "Employment Grievance", code: "DFT-06" }
  ];

  const handleDraft = async () => {
    if (!details.trim()) return;
    setLoading(true);
    try {
      const res = await gemini.draftDocument(selectedType, details);
      setDraft(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-0 py-0 grid grid-cols-12 min-h-screen">
      <div className="col-span-12 lg:col-span-4 bg-[#141414] border-r border-white/10 p-12 flex flex-col">
        <span className="label-micro text-emerald-400 mb-4 block">Operation: Draft</span>
        <h2 className="text-6xl font-black tracking-tighter uppercase mb-10 leading-none">Legal<br/>Drafter.</h2>
        
        <div className="space-y-2 flex-1">
          {draftTypes.map((type) => (
            <button
              key={type.title}
              onClick={() => setSelectedType(type.title)}
              className={cn(
                "w-full px-6 py-4 text-left font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-between border-b border-white/5",
                selectedType === type.title 
                  ? "bg-white text-black" 
                  : "text-white/40 hover:text-white"
              )}
            >
              <div className="flex gap-4">
                <span className="opacity-40">{type.code}</span>
                <span>{type.title}</span>
              </div>
              <ChevronRight size={14} className={selectedType === type.title ? "opacity-100" : "opacity-0"} />
            </button>
          ))}
        </div>

        <div className="p-6 border border-emerald-400/20 bg-emerald-400/5 mt-10">
          <h4 className="label-micro text-emerald-400 mb-3 flex items-center gap-2">
            <ShieldCheck size={14} /> Critical Guidelines
          </h4>
          <p className="text-[10px] text-white/50 uppercase tracking-widest leading-relaxed">
            Stick to factual evidence. avoid emotional embellishment. verify all dates and party IDs before filing officially.
          </p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 bg-[#0A0A0A] p-0 flex flex-col">
        <div className="p-12 lg:p-20 border-b border-white/10">
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={`ENTER DETAILS FOR ${selectedType.toUpperCase()}...`}
            className="w-full h-64 bg-white/5 border border-white/10 p-10 text-xl font-serif italic outline-none focus:border-white transition-all placeholder:text-white/10"
          />
          <button
            onClick={handleDraft}
            disabled={loading || !details}
            className="mt-8 btn-industrial-primary w-full max-w-sm"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Execute Drafting'}
          </button>
        </div>

        <div className="flex-1 p-12 lg:p-20 bg-[#0F0F0F] relative">
          <AnimatePresence>
            {draft ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl relative"
              >
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
                   <span className="label-micro">Generated Document Output</span>
                   <button 
                    onClick={() => navigator.clipboard.writeText(draft)}
                    className="label-micro text-emerald-400 hover:text-white transition-colors"
                   >
                     Copy to Clipboard
                   </button>
                </div>
                <div className="markdown-body font-serif whitespace-pre-wrap text-xl leading-relaxed">
                  {draft}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-5">
                <FileText size={300} strokeWidth={0.5} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="h-10 border-t border-white/10 flex items-center justify-between px-10 bg-black text-[9px] uppercase tracking-widest opacity-40 font-mono">
    <div>System Status: SECURE • BNS/BNSS 2.0</div>
    <div className="hidden sm:block">© 2024 National Legal Research Initiative</div>
    <div>Nyaya Mitra Legal Network</div>
  </footer>
);

// Application Root

export default function App() {
  const [view, setView] = useState<ViewState>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero onAction={setView} />
            <FeatureGrid onAction={setView} />
            <div className="max-w-7xl mx-auto px-10 py-32 border-b border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div>
                  <span className="label-micro text-emerald-400 mb-6 block">Doctrine / Purpose</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-none">Statutory<br/>Clarity for All.</h2>
                  <div className="space-y-6 text-white/50 font-bold uppercase tracking-widest text-xs leading-relaxed">
                    <p>INDIA'S LEGAL ECOSYSTEM IS VAST AND OFTEN COMPLEX. MANY CITIZENS REFRAIN FROM SEEKING JUSTICE DUE TO INTIMIDATION OR LACK OF UNDERSTANDING.</p>
                    <p>NYAYA MITRA BRIDGES THIS GAP BY TRANSLATING 'LEGALESE' INTO COMMON TONGUE, IDENTIFYING YOUR RIGHTS ACCURATELY, AND GUIDING YOU TOWARD THE RIGHT LAWFUL STEPS.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                  {[
                    { label: 'Responsibility', icon: ShieldCheck },
                    { label: 'Integrity', icon: Scale },
                    { label: 'Evidence', icon: AlertCircle },
                    { label: 'Awareness', icon: BookOpen },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#0A0A0A] p-12 flex flex-col items-center text-center group hover:bg-white hover:text-black transition-all">
                      <item.icon className="text-emerald-400 mb-6 group-hover:text-black" size={48} strokeWidth={1} />
                      <span className="text-[10px] font-black tracking-widest uppercase">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 'analyzer': return <AnalysisView />;
      case 'checker': return <QuickCheckView />;
      case 'finder': return <SectionFinderView />;
      case 'drafter': return <DraftingView />;
      default: return <Hero onAction={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={view} setView={setView} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
