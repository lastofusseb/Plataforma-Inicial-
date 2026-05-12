import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Calculator, 
  Microscope, 
  User, 
  Activity, 
  Share2, 
  ChevronRight, 
  BookOpen, 
  Target, 
  Search,
  Menu,
  X,
  Info,
  Lock,
  Layout,
  Download,
  LogOut,
  Sparkles,
  Send,
  Wand2,
  Brain,
  GraduationCap,
  FileText,
  Library,
  CheckCircle2,
  ListChecks,
  ExternalLink,
  Printer
} from 'lucide-react';
import { EVALUATION_DATA, Area, Competency, LEARNING_ACTIVITY_STRUCTURES } from './data';
import { RESOURCES, Resource } from './resourcesData';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { InstitutionalLogo } from './components/Logo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const ICON_MAP: Record<string, any> = {
  MessageSquare,
  Calculator,
  Microscope,
  User,
  Activity,
  Share2
};

const AREA_COLORS: Record<string, { bg: string; text: string; border: string; light: string; iconBg: string }> = {
  'comunicacion': { bg: 'bg-[#ffeb3b]', text: 'text-yellow-900', border: 'border-yellow-200', light: 'bg-yellow-50', iconBg: 'bg-yellow-100' },
  'matematica': { bg: 'bg-[#8bc34a]', text: 'text-emerald-900', border: 'border-emerald-200', light: 'bg-emerald-50', iconBg: 'bg-emerald-100' },
  'ciencia': { bg: 'bg-teal-400', text: 'text-teal-900', border: 'border-teal-100', light: 'bg-teal-50', iconBg: 'bg-teal-100' },
  'personal-social': { bg: 'bg-rose-400', text: 'text-rose-900', border: 'border-rose-100', light: 'bg-rose-50', iconBg: 'bg-rose-100' },
  'psicomotriz': { bg: 'bg-violet-400', text: 'text-violet-900', border: 'border-violet-100', light: 'bg-violet-50', iconBg: 'bg-violet-100' },
  'transversales': { bg: 'bg-orange-400', text: 'text-orange-900', border: 'border-orange-100', light: 'bg-orange-50', iconBg: 'bg-orange-100' },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [selectedAreaId, setSelectedAreaId] = useState(EVALUATION_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'explorer' | 'planner' | 'assistant' | 'resources' | 'achievements'>('explorer');

  // Planner State
  const [sessionTitle, setSessionTitle] = useState('');
  const [selectedAge, setSelectedAge] = useState<'age3' | 'age4' | 'age5'>('age5');
  const [plannerSelections, setPlannerSelections] = useState<{
    areaId: string;
    competencyId: string;
    performanceIndices: number[];
  }[]>([]);
  const [aiDraft, setAiDraft] = useState('');
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

  // Achievements State
  const [achievements, setAchievements] = useState<Record<string, boolean>>({});

  // PDF Export Refs
  const plannerPdfRef = useRef<HTMLDivElement>(null);
  const aiDraftPdfRef = useRef<HTMLDivElement>(null);

  // AI Assistant State
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const generateAiDraft = async () => {
    if (plannerSelections.length === 0 || isGeneratingDraft) return;
    setIsGeneratingDraft(true);
    setAiDraft(''); // Reset
    try {
      const selectedContext = plannerSelections.map(sel => {
        const area = EVALUATION_DATA.find(a => a.id === sel.areaId);
        const comp = area?.competencies.find(c => c.id === sel.competencyId);
        const perfs = sel.performanceIndices.map(idx => comp?.performances[selectedAge][idx]);
        const structures = (LEARNING_ACTIVITY_STRUCTURES as any)[sel.areaId]?.[sel.competencyId];
        
        return `
          AREA: ${area?.name}
          COMPETENCIA: ${comp?.name}
          DESEMPEÑOS: ${perfs.join(', ')}
          ESTRUCTURA SUGERIDA (CNEB):
          - Inicio: ${structures?.inicio || 'Estrategia de motivación y recojo de saberes.'}
          - Desarrollo: ${structures?.desarrollo || 'Procesos didácticos del área.'}
          - Cierre: ${structures?.cierre || 'Meta cognición y reflexión.'}
        `;
      }).join('\n\n');

      const prompt = `Como experto pedagogo de la I.E.I 0009, redacta un borrador detallado y profesional para una sesión de aprendizaje titulada "${sessionTitle || 'Sin título'}".
      Para la edad de: ${selectedAge === 'age3' ? '3 años' : selectedAge === 'age4' ? '4 años' : '5 años'}.
      
      CONTEXTO CURRICULAR:
      ${selectedContext}
      
      INSTRUCCIONES DE REDACCIÓN:
      1. Usa un tono motivador, tierno y profesional (ideal para inicial).
      2. Desarrolla cada momento (Inicio, Desarrollo, Cierre) integrando los desempeños seleccionados.
      3. Incluye ejemplos de preguntas que la docente puede hacer a los niños.
      4. Menciona materiales concretos populares en el aula (bloques, telas, material reciclado, etc).

      ESTRUCTURA REQUERIDA (Markdown):
      # Plan de Sesión: ${sessionTitle || 'Aprendizaje en Acción'}
      
      ## I. Propósito de Aprendizaje
      *Competencias y Desempeños movilizados.*

      ## II. Desarrollo de la Sesión
      ### 🌈 Inicio (Motivación y Saberes)
      (Detalla la asamblea, la sorpresa o el juego inicial)

      ### 🚀 Desarrollo (Gestión y Acompañamiento)
      (Aplica los procesos didácticos: vivencial, concreto, pictórico, gráfico o según el área)

      ### ✨ Cierre (Evaluación y Reflexión)
      (Preguntas de metacognición)
      
      Recuerda que en inicial el juego es libre en los sectores y la exploración es clave.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiDraft(response.text || '');
      
      // Auto-scroll to draft
      setTimeout(() => {
        const draftEl = document.getElementById('ai-draft-section');
        draftEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);

    } catch (error) {
      console.error("AI Draft Error:", error);
      alert("Hubo un error al generar el borrador. Por favor intenta de nuevo.");
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const exportPlannerToPdf = async () => {
    if (!plannerPdfRef.current) {
        alert("Por favor selecciona desempeños primero.");
        return;
    }
    
    try {
      const element = plannerPdfRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Planificacion_${sessionTitle.replace(/\s+/g, '_') || 'Sesion'}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("No se pudo generar el PDF. Revisa la consola para más detalles.");
    }
  };

  const exportAiDraftToPdf = async () => {
    if (!aiDraftPdfRef.current) {
        alert("No hay borrador generado.");
        return;
    }
    
    try {
      const element = aiDraftPdfRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Borrador_${sessionTitle.replace(/\s+/g, '_') || 'Sesion'}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("No se pudo generar el PDF. Revisa la consola para más detalles.");
    }
  };

  const toggleAchievement = (id: string) => {
    setAchievements(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isAiLoading) return;

    const userMsg = userInput.trim();
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsAiLoading(true);

    try {
      const selectedContext = plannerSelections.map(sel => {
        const area = EVALUATION_DATA.find(a => a.id === sel.areaId);
        const comp = area?.competencies.find(c => c.id === sel.competencyId);
        const perfs = sel.performanceIndices.map(idx => comp?.performances[selectedAge][idx]);
        const structures = (LEARNING_ACTIVITY_STRUCTURES as any)[sel.areaId]?.[sel.competencyId];
        
        return `
          AREA: ${area?.name}
          COMPETENCIA: ${comp?.name}
          DESEMPEÑOS: ${perfs.join(', ')}
          ESTRUCTURA DE SESIÓN (Guía):
          - Inicio: ${structures?.inicio || 'N/A'}
          - Desarrollo: ${structures?.desarrollo || 'N/A'}
          - Cierre: ${structures?.cierre || 'N/A'}
        `;
      }).join('\n\n');

      const systemInstruction = `Eres un asistente pedagógico de la I.E.I 0009. Tu misión es ayudar al docente a elaborar sesiones de aprendizaje de calidad para el nivel Inicial (Ciclo II).
      
      Debes guiarte por el Currículo Nacional de Educación Básica (CNEB) y por la estructura institucional que se te proporciona a continuación:
      
      DATOS ACTIVOS DEL DOCENTE:
      - Edad de los niños: ${selectedAge === 'age3' ? '3 años' : selectedAge === 'age4' ? '4 años' : '5 años'}
      - Título de Sesión: ${sessionTitle || 'Sin título'}
      - Contexto Curricular: ${selectedContext || 'El docente aún no ha seleccionado competencias.'}

      REGLAS DE RESPUESTA:
      1. Sé amable, profesional y creativo.
      2. No inventes competencias si el docente ya seleccionó unas.
      3. Respeta estrictamente la estructura de (INICIO, DESARROLLO, CIERRE) proporcionada en el contexto.
      4. Si el docente pregunta algo general, responde basado en las mejores prácticas de educación inicial.
      5. Tus respuestas deben estar en formato Markdown para que se vean bien.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...chatMessages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction
        }
      });

      const text = response.text || "No pude generar una respuesta.";
      setChatMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Lo siento, tuve un problema al procesar tu solicitud. Asegúrate de que la clave API esté configurada." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPass) setIsLoggedIn(true);
  };

  const togglePerformance = (areaId: string, competencyId: string, perfIndex: number) => {
    setPlannerSelections(prev => {
      const existing = prev.find(p => p.areaId === areaId && p.competencyId === competencyId);
      if (existing) {
        if (existing.performanceIndices.includes(perfIndex)) {
          const newIndices = existing.performanceIndices.filter(i => i !== perfIndex);
          if (newIndices.length === 0) return prev.filter(p => p !== existing);
          return prev.map(p => p === existing ? { ...p, performanceIndices: newIndices } : p);
        }
        return prev.map(p => p === existing ? { ...p, performanceIndices: [...p.performanceIndices, perfIndex] } : p);
      }
      return [...prev, { areaId, competencyId, performanceIndices: [perfIndex] }];
    });
  };

  const filteredAreas = useMemo(() => {
    if (!searchQuery) return EVALUATION_DATA;
    const q = searchQuery.toLowerCase();
    return EVALUATION_DATA.map(area => ({
      ...area,
      competencies: area.competencies.filter(comp => 
        comp.name.toLowerCase().includes(q) ||
        area.name.toLowerCase().includes(q)
      )
    })).filter(area => area.competencies.length > 0);
  }, [searchQuery]);

  const selectedArea = useMemo(() => {
    // Priority: search result if search is active
    if (searchQuery) {
      const area = filteredAreas.find(a => a.id === selectedAreaId);
      if (area) return area;
      if (filteredAreas.length > 0) return filteredAreas[0];
    }
    // Fallback: direct selection
    return EVALUATION_DATA.find(a => a.id === selectedAreaId) || EVALUATION_DATA[0];
  }, [selectedAreaId, filteredAreas, searchQuery]);

  const exportAreaMatrix = (area: Area) => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Matriz Institucional</title>
      <style>
        @page { size: landscape; margin: 0.5in; }
        body { font-family: 'Arial', sans-serif; }
        table { border-collapse: collapse; width: 100%; border: 1.5pt solid black; }
        td { border: 1pt solid black; padding: 8pt; vertical-align: top; }
        .header-cyan { background-color: #00B0F0; color: black; font-weight: bold; text-align: center; text-transform: uppercase; }
        .competency-title { font-weight: bold; text-transform: uppercase; font-size: 10pt; margin-bottom: 5pt; }
        .standard-text { font-size: 8.5pt; text-align: justify; color: #1f2937; }
        .list-items { font-size: 8.5pt; padding-left: 15pt; margin: 0; }
        .crit-text { font-size: 8.5pt; color: #111827; }
      </style>
      </head>
      <body>
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="text-decoration: underline; font-weight: 900; font-size: 16pt;">CRITERIOS DE EVALUACIÓN DEL ÁREA ${area.name.toUpperCase()}</h2>
        </div>
        
        <table border="1" cellspacing="0" cellpadding="5">
          <tr>
            <td class="header-cyan" style="width: 20%; font-size: 11pt;">COMPETENCIA</td>
            <td class="header-cyan" style="width: 20%; font-size: 11pt;">CAPACIDADES</td>
            <td class="header-cyan" colspan="3" style="font-size: 11pt;">CRITERIOS</td>
          </tr>
          <tr>
            <td style="border: none; padding: 0;"></td>
            <td style="border: none; padding: 0;"></td>
            <td class="header-cyan" style="width: 20%;">3 años</td>
            <td class="header-cyan" style="width: 20%;">4 años</td>
            <td class="header-cyan" style="width: 20%;">5 años</td>
          </tr>
          <tr>
            <td class="header-cyan" style="font-size: 10pt; text-align: center;">ESTÁNDAR</td>
            <td class="header-cyan" colspan="4"></td>
          </tr>
          ${area.competencies.map(comp => `
            <tr>
              <td>
                <div class="competency-title">${comp.name}</div>
                <div class="standard-text">${comp.standard}</div>
              </td>
              <td>
                <ul class="list-items">
                  ${comp.capacities.map(cap => `<li>${cap}</li>`).join('')}
                </ul>
              </td>
              <td style="text-align: center;">
                <div class="crit-text">${comp.performances.age3.map(p => p.includes('No se evidencia') ? '----------' : p).join('<br/><br/>')}</div>
              </td>
              <td>
                <div class="crit-text">${comp.performances.age4.map(p => p.includes('No se evidencia') ? '----------' : p).join('<br/><br/>')}</div>
              </td>
              <td>
                <div class="crit-text">${comp.performances.age5.map(p => p.includes('No se evidencia') ? '----------' : p).join('<br/><br/>')}</div>
              </td>
            </tr>
          `).join('')}
        </table>
        
        <div style="margin-top: 25px; font-size: 8pt; color: #666; text-align: left; font-style: italic;">
          Matriz Curricular Institucional - I.E.I 0009
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Matriz_${area.name}.doc`;
    link.click();
  };

  const exportToWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Plan de Sesión</title></head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 40px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4f46e5; margin-bottom: 5px; font-size: 28px;">I.E.I 0009 - Planificación de Sesión</h1>
          <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 10px; color: #64748b; font-weight: bold;">Plataforma de Desarrollo Profesional Docente</p>
        </div>
        
        <div style="background-color: #fdfdf0; padding: 20px; border-radius: 10px; margin-bottom: 30px; border: 1px solid #dcfce7;">
          <h2 style="color: #064e3b; margin-top: 0; font-size: 18px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">Datos de la Sesión</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-size: 12px; font-weight: bold; width: 120px;">TÍTULO:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${sessionTitle || 'Sin título'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-size: 12px; font-weight: bold;">EDAD:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${selectedAge === 'age3' ? '3 Años' : selectedAge === 'age4' ? '4 Años' : '5 Años'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-size: 12px; font-weight: bold;">FECHA:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${new Date().toLocaleDateString()}</td>
            </tr>
          </table>
        </div>
        
        <h2 style="color: #064e3b; font-size: 18px; margin-bottom: 20px;">Diseño Curricular (Selección)</h2>
        ${plannerSelections.map(sel => {
          const comp = EVALUATION_DATA.flatMap(a => a.competencies).find(c => c.id === sel.competencyId);
          const area = EVALUATION_DATA.find(a => a.id === sel.areaId);
          return `
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
              <div style="background-color: #10b981; color: white; padding: 8px 15px; border-radius: 5px 5px 0 0; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                ÁREA: ${area?.name}
              </div>
              <div style="padding: 15px; border: 1px solid #dcfce7; border-top: none; border-radius: 0 0 5px 5px; background-color: #ffffff;">
                <p style="margin-top: 0;"><b>Competencia:</b> ${comp?.name}</p>
                <p style="color: #475569; font-size: 13px;"><b>Capacidades:</b> ${comp?.capacities.join(' | ')}</p>
                <div style="margin-top: 10px; background: #f0fdf4; padding: 10px; border-radius: 5px; border: 1px solid #dcfce7;">
                  <p style="margin-top: 0; font-size: 11px; font-weight: bold; color: #059669; text-transform: uppercase;">Criterios de Evaluación Seleccionados:</p>
                  <ul style="margin-bottom: 0; padding-left: 20px;">
                    ${sel.performanceIndices.map(idx => `<li style="font-size: 13px; color: #1e293b; margin-bottom: 5px;">${comp?.performances[selectedAge][idx]}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `;
        }).join('')}
        
        <div style="margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 10px; color: #94a3b8; text-align: center;">
          Este documento fue generado automáticamente por EduMatrix - I.E.I 0009
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sesion_${sessionTitle || 'Plan'}.doc`;
    link.click();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Playful background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-emerald-400 rounded-full blur-2xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white border-4 border-yellow-200 rounded-[3.5rem] p-10 shadow-2xl shadow-orange-200/50">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-40 h-40 bg-white rounded-[3rem] flex items-center justify-center shadow-xl shadow-yellow-100 mb-6 overflow-hidden border-4 border-yellow-400 rotate-2 p-4">
                <InstitutionalLogo className="w-full h-full" />
              </div>
              <h1 className="text-emerald-900 font-black text-3xl tracking-tighter mb-1 uppercase">I.E.I 0009 - INICIAL</h1>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                <p className="text-emerald-700/60 text-xs font-black uppercase tracking-[0.2em]">Plataforma de Planificación</p>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Tu Correo Institucional</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300" />
                  <input 
                    type="email" 
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ejemplo@iei0009.edu.pe"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-slate-700 font-bold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Contraseña Mágica</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300" />
                  <input 
                    type="password" 
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-slate-700 font-bold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded-lg border-slate-200 text-emerald-600 focus:ring-emerald-200" />
                  <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Recordarme</span>
                </label>
                <button type="button" className="text-[10px] text-emerald-500 font-black uppercase tracking-widest hover:text-emerald-600 transition-colors">¿Olvidó su clave?</button>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white font-black text-base uppercase tracking-[0.15em] py-5 rounded-3xl shadow-xl shadow-emerald-200/50 hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all"
              >
                ¡Entrar a Clase!
              </button>
            </form>
          </div>
          
          <p className="text-center mt-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Desarrollado para la excelencia docente • 2026
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f0fdf4] overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-80 bg-[#f0fdf4] border-r border-green-100 shadow-sm z-20">
        <div className="p-6 border-b border-green-100 bg-emerald-50 sticky top-0">
            <div className="flex items-center gap-3 mb-6">
            <div className="bg-white w-14 h-14 rounded-xl shadow-sm border-2 border-yellow-400 overflow-hidden flex items-center justify-center p-1">
              <InstitutionalLogo className="w-full h-full" />
            </div>
            <div>
              <h1 className="font-display font-black text-emerald-950 leading-tight tracking-tighter text-sm uppercase">I.E.I 0009</h1>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">INICIAL II</p>
            </div>
          </div>
          
          <div className="bg-slate-100 p-1 rounded-xl mb-6 grid grid-cols-2 gap-1 overflow-hidden">
            <button 
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === 'explorer' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Search className="w-3 h-3" /> Explorar
            </button>
            <button 
              onClick={() => setActiveTab('planner')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === 'planner' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Target className="w-3 h-3" /> Planear
            </button>
            <button 
              onClick={() => setActiveTab('assistant')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === 'assistant' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Sparkles className="w-3 h-3" /> Asistente
            </button>
            <button 
              onClick={() => setActiveTab('resources')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === 'resources' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Library className="w-3 h-3" /> Recursos
            </button>
            <button 
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === 'achievements' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <CheckCircle2 className="w-3 h-3" /> Logros
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <input 
              type="text" 
              placeholder="Buscar desempeños..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-emerald-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              id="desktop-search"
            />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Áreas Curriculares</p>
          {filteredAreas.map((area) => {
            const Icon = ICON_MAP[area.icon] || BookOpen;
            const isActive = selectedAreaId === area.id;
            const colors = AREA_COLORS[area.id] || AREA_COLORS['comunicacion'];
            
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all group ${
                  isActive 
                  ? `${colors.bg} text-white shadow-xl ${colors.bg.replace('bg-', 'shadow-')}/30 scale-[1.02]` 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
                id={`sidebar-link-${area.id}`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-white/20' : `${colors.light} group-hover:bg-white`
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`flex-1 text-left line-clamp-1 font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>{area.name}</span>
                {isActive && (
                  <motion.div layoutId="active-indicator">
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-emerald-100 bg-emerald-100/20">
          <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm mb-3 hover:bg-emerald-50 transition-colors">
            <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Nota Pedagógica</p>
            <p className="text-[10px] text-emerald-800 leading-tight">Personal Social se da de manera transversal. Prioriza la movilización de capacidades.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-50 transition-colors">
            <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Transversales</p>
            <p className="text-[10px] text-emerald-800 leading-tight">Solo para 5 años. Complementan otras competencias.</p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#f0fdf4] border-b border-green-100 px-4 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-lg border-2 border-yellow-400">
            <InstitutionalLogo className="w-6 h-6" />
          </div>
          <span className="font-display font-black text-emerald-950 tracking-tighter uppercase text-xs">I.E.I 0009 - INICIAL</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
          id="mobile-menu-toggle"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-50 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="space-y-2 mb-8">
                <button 
                  onClick={() => { setActiveTab('explorer'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-base font-bold transition-all ${activeTab === 'explorer' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  <Search className="w-5 h-5" /> Explorar CNEB
                </button>
                <button 
                  onClick={() => { setActiveTab('planner'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-base font-bold transition-all ${activeTab === 'planner' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  <Target className="w-5 h-5" /> Planificador
                </button>
                <button 
                  onClick={() => { setActiveTab('assistant'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-base font-bold transition-all ${activeTab === 'assistant' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  <Sparkles className="w-5 h-5" /> Asistente IA
                </button>
                <button 
                  onClick={() => { setActiveTab('resources'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-base font-bold transition-all ${activeTab === 'resources' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  <Library className="w-5 h-5" /> Recursos
                </button>
                <button 
                  onClick={() => { setActiveTab('achievements'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-base font-bold transition-all ${activeTab === 'achievements' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  <CheckCircle2 className="w-5 h-5" /> Registro Logros
                </button>
              </div>

              <div className="font-display font-bold text-xl text-emerald-900 uppercase tracking-tighter mb-4 px-2">ÁREAS</div>
              <div className="space-y-3">
                {filteredAreas.map((area) => {
                  const Icon = ICON_MAP[area.icon];
                  return (
                    <button
                      key={area.id}
                      onClick={() => {
                        setSelectedAreaId(area.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-sm font-semibold transition-all ${
                        selectedAreaId === area.id 
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-200 shadow-sm' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                      id={`mobile-link-${area.id}`}
                    >
                      <Icon className="w-5 h-5" />
                      {area.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 bg-[#f0fdf4] relative custom-scrollbar">
        {activeTab === 'explorer' ? (
          <>
            <header className="sticky top-0 lg:static bg-[#f0fdf4]/80 backdrop-blur-md lg:bg-transparent px-6 py-6 lg:px-12 lg:py-10 z-10">
              <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={selectedArea.id}
                          className="flex items-center gap-2 mb-3"
                        >
                          <div className="bg-emerald-600 h-1 w-8 rounded-full" />
                          <span className="text-[11px] font-black uppercase text-emerald-600 tracking-widest">
                            Currículo Nacional - I.E.I 0009
                          </span>
                        </motion.div>
                        <h2 className="font-display text-4xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[0.85] mb-4">
                          {selectedArea.name}
                        </h2>
                        <p className="text-slate-500 font-medium text-lg lg:text-xl max-w-2xl leading-snug">
                          Desempeños y criterios de evaluación para la planificación del Ciclo II.
                        </p>
                      </div>
                      <div className="shrink-0 flex gap-3">
                        <button 
                          onClick={() => exportAreaMatrix(selectedArea)}
                          className="flex items-center gap-2 bg-white border border-emerald-100 text-emerald-700 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md hover:bg-emerald-50 transition-all active:scale-95"
                        >
                          <Download className="w-4 h-4" />
                          Exportar Matriz
                        </button>
                      </div>
                    </div>
              </div>
            </header>

            <section className="px-6 pb-24 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedArea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-12"
                  >
                    {selectedArea.competencies.map((comp, idx) => (
                      <div key={comp.id}>
                        <CompetencyCard competency={comp} index={idx} areaName={selectedArea.name} areaId={selectedArea.id} />
                      </div>
                    ))}
                    
                    {selectedArea.competencies.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-32 text-slate-400 text-center">
                        <div className="bg-slate-100 p-6 rounded-full mb-6">
                          <Search className="w-12 h-12 opacity-40 text-slate-400" />
                        </div>
                        <p className="font-display font-bold text-2xl text-slate-900">No hay coincidencias</p>
                        <p className="text-slate-500 max-w-xs mx-auto mt-2">Intenta ajustar tu búsqueda o selecciona otra área curricular.</p>
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="mt-6 font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-6 py-2.5 rounded-xl"
                        >
                          Limpiar búsqueda
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </>
        ) : activeTab === 'planner' ? (
          <div className="max-w-6xl mx-auto px-6 py-10 lg:px-12">
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 h-1 w-8 rounded-full" />
                <span className="text-[11px] font-black uppercase text-emerald-600 tracking-widest">
                  Herramienta de Planificación
                </span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    Planificador de Sesión
                  </h2>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                    Diseña tu sesión de aprendizaje seleccionando las competencias y desempeños que trabajarás.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={generateAiDraft}
                    disabled={plannerSelections.length === 0 || isGeneratingDraft}
                    className="flex items-center gap-2 bg-amber-400 text-amber-950 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md hover:bg-amber-300 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isGeneratingDraft ? (
                      <span className="animate-spin relative inline-flex rounded-full h-4 w-4 border-2 border-amber-950 border-t-transparent" />
                    ) : <Wand2 className="w-4 h-4" />}
                    {isGeneratingDraft ? 'Generando...' : 'Generar Borrador IA'}
                  </button>
                  <button 
                    onClick={exportPlannerToPdf}
                    disabled={plannerSelections.length === 0}
                    className="flex items-center gap-2 bg-white border border-emerald-100 text-emerald-700 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Printer className="w-4 h-4" />
                    Exportar Planificación
                  </button>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-8">
                {/* PDF Content Template - Planificador Only */}
                <div style={{ position: 'absolute', left: '-5000px', top: 0, zIndex: -100 }}>
                  <div ref={plannerPdfRef} className="p-10 bg-white" style={{ minHeight: '297mm', width: '210mm', fontFamily: 'serif', color: '#0f172a', backgroundColor: '#ffffff' }}>
                    <div className="flex items-center justify-between border-b-4 pb-8 mb-10" style={{ borderBottomColor: '#059669' }}>
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 border-2 rounded-2xl p-2 bg-white flex items-center justify-center" style={{ borderColor: '#facc15' }}>
                           <InstitutionalLogo className="w-full h-full" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-black uppercase tracking-tighter" style={{ color: '#064e3b' }}>I.E.I 0009 - Gestión Educativa</h1>
                          <p className="text-[11px] uppercase tracking-[0.3em] font-black" style={{ color: '#059669' }}>Planificación Curricular • Nivel Inicial</p>
                        </div>
                      </div>
                      <div className="text-right border-l pl-6" style={{ borderLeftColor: '#e2e8f0' }}>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>Documento Oficial</p>
                        <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="p-8 rounded-[2rem] border-2 flex items-center justify-between" style={{ backgroundColor: '#ecfdf5', borderColor: '#d1fae5' }}>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#059669' }}>Título de la Sesión</p>
                            <h2 className="text-2xl font-black tracking-tight" style={{ color: '#064e3b' }}>{sessionTitle || 'Sesión de Aprendizaje'}</h2>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#059669' }}>Edad</p>
                            <p className="text-xl font-black" style={{ color: '#064e3b' }}>{selectedAge === 'age3' ? '3 Años' : selectedAge === 'age4' ? '4 Años' : '5 Años'}</p>
                         </div>
                      </div>

                      <div className="space-y-6">
                        <h2 className="text-lg font-black uppercase tracking-widest border-b-2 pb-3 flex items-center gap-3" style={{ color: '#064e3b', borderBottomColor: '#d1fae5' }}>
                          <Target className="w-5 h-5" /> PROPÓSITOS DE APRENDIZAJE
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                          {plannerSelections.map(sel => {
                            const area = EVALUATION_DATA.find(a => a.id === sel.areaId);
                            const comp = area?.competencies.find(c => c.id === sel.competencyId);
                            return (
                              <div key={sel.competencyId} className="bg-white border p-6 rounded-2xl" style={{ borderColor: '#f1f5f9' }}>
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#10b981' }} />
                                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#059669' }}>{area?.name}</p>
                                </div>
                                <p className="text-base font-bold mb-4" style={{ color: '#0f172a' }}>{comp?.name}</p>
                                <div className="space-y-3">
                                  {sel.performanceIndices.map(idx => (
                                    <div key={idx} className="flex gap-3 text-sm leading-relaxed p-3 rounded-xl border" style={{ color: '#475569', backgroundColor: '#f8fafc', borderColor: '#f8fafc' }}>
                                      <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>
                                      <p>{comp?.performances[selectedAge][idx]}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-20 pt-16 flex justify-around text-center border-t" style={{ borderTopColor: '#f1f5f9' }}>
                       <div className="flex flex-col items-center">
                         <div className="w-48 border-t-2 mb-2" style={{ borderTopColor: '#94a3b8' }} />
                         <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>FIRMA DEL DOCENTE</p>
                       </div>
                       <div className="flex flex-col items-center">
                         <div className="w-48 border-t-2 mb-2" style={{ borderTopColor: '#94a3b8' }} />
                         <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>V°B° DIRECTORA</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* PDF Content Template - Borrador IA Only */}
                {aiDraft && (
                  <div style={{ position: 'absolute', left: '-5000px', top: 0, zIndex: -100 }}>
                    <div ref={aiDraftPdfRef} className="p-10 bg-white" style={{ minHeight: '297mm', width: '210mm', fontFamily: 'serif', color: '#0f172a', backgroundColor: '#ffffff' }}>
                      <div className="flex items-center justify-between border-b-4 pb-8 mb-10" style={{ borderBottomColor: '#f59e0b' }}>
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 border-2 rounded-2xl p-2 bg-white flex items-center justify-center" style={{ borderColor: '#facc15' }}>
                             <InstitutionalLogo className="w-full h-full" />
                          </div>
                          <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter" style={{ color: '#0f172a' }}>I.E.I 0009 - Gestión Educativa</h1>
                            <p className="text-[11px] uppercase tracking-[0.3em] font-black" style={{ color: '#d97706' }}>Borrador de Sesión • IA</p>
                          </div>
                        </div>
                        <div className="text-right border-l pl-6" style={{ borderLeftColor: '#e2e8f0' }}>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>Documento de Trabajo</p>
                          <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="p-8 rounded-[2rem] border-2 flex items-center justify-between mb-8" style={{ backgroundColor: '#fffbeb', borderColor: '#fef3c7' }}>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#d97706' }}>Título de la Sesión</p>
                            <h2 className="text-2xl font-black tracking-tight" style={{ color: '#92400e' }}>{sessionTitle || 'Sesión de Aprendizaje'}</h2>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#d97706' }}>Edad</p>
                            <p className="text-xl font-black" style={{ color: '#92400e' }}>{selectedAge === 'age3' ? '3 Años' : selectedAge === 'age4' ? '4 Años' : '5 Años'}</p>
                         </div>
                      </div>

                      <div className="prose prose-sm max-w-none leading-relaxed" style={{ color: '#334155' }}>
                        <ReactMarkdown>{aiDraft}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}

                {aiDraft && (
                  <motion.div 
                    id="ai-draft-section"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-8 border-2 border-amber-100 shadow-xl shadow-amber-50 relative overflow-hidden mb-8"
                  >
                    <div className="absolute top-0 right-0 p-4">
                      <Sparkles className="w-8 h-8 text-amber-200" />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-amber-950">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-slate-900">Borrador Generado por IA</h3>
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Edita y adapta a tu grupo</p>
                      </div>
                    </div>
                    <div className="bg-amber-50/50 rounded-2xl p-6 prose prose-slate max-w-none max-h-[600px] overflow-y-auto custom-scrollbar border border-amber-100 mb-6">
                      <ReactMarkdown>{aiDraft}</ReactMarkdown>
                    </div>
                    <div className="flex gap-3">
                       <button 
                        onClick={exportAiDraftToPdf}
                        className="bg-amber-400 text-amber-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors flex items-center gap-2"
                       >
                         <Printer className="w-4 h-4" />
                         Exportar Borrador
                       </button>
                       <button 
                        onClick={() => setAiDraft('')}
                        className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200"
                       >
                         Descartar
                       </button>
                    </div>
                  </motion.div>
                )}

                {/* 1. Datos Generales */}
                <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Info className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-display font-bold text-xl text-slate-900">1. Datos de la Sesión</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Título de la Sesión</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Explorando colores con mis manos"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                        className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Edad / Nivel</label>
                        <div className="flex bg-slate-50 p-1 rounded-xl">
                          {(['age3', 'age4', 'age5'] as const).map((age) => (
                            <button
                              key={age}
                              onClick={() => setSelectedAge(age)}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${selectedAge === age ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
                            >
                              {age === 'age3' ? '3 Años' : age === 'age4' ? '4 Años' : '5 Años'}
                            </button>
                          ))}
                        </div>
                    </div>
                  </div>
                </div>

                {/* 2. Selección de Competencias */}
                <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-display font-bold text-xl text-slate-900">2. Selección de Competencias y Desempeños</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {EVALUATION_DATA.map((area) => (
                      <div key={area.id} className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] px-2">{area.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {area.competencies.map((comp) => (
                            <div key={comp.id} className="border border-emerald-50 rounded-2xl overflow-hidden bg-emerald-50/20">
                              <div className="p-4 bg-white flex items-center justify-between border-b border-emerald-50">
                                <span className="text-sm font-bold text-slate-700 line-clamp-1">{comp.name}</span>
                              </div>
                              <div className="p-3 space-y-2">
                                {comp.performances[selectedAge].map((perf, idx) => {
                                  const isSelected = plannerSelections.find(p => p.competencyId === comp.id)?.performanceIndices.includes(idx);
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => togglePerformance(area.id, comp.id, idx)}
                                      className={`w-full text-left p-3 rounded-xl text-xs leading-relaxed transition-all border ${
                                        isSelected 
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium ring-2 ring-emerald-500 shadow-sm' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                                      }`}
                                    >
                                      {perf}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Resumen */}
              <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
                <div className="bg-emerald-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 blur-3xl rounded-full" />
                  
                  <h3 className="font-display font-black text-2xl mb-8 tracking-tighter">Mi Planificación</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Nombre de la Sesión</p>
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          value={sessionTitle}
                          onChange={(e) => setSessionTitle(e.target.value)}
                          placeholder="Escribe el título aquí..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        />
                        <div className="grid grid-cols-3 gap-2">
                           {(['age3', 'age4', 'age5'] as const).map(age => (
                             <button
                               key={age}
                               onClick={() => setSelectedAge(age)}
                               className={`py-2.5 rounded-xl text-[10px] font-black transition-all border ${selectedAge === age ? 'bg-white text-slate-950 border-white shadow-lg scale-[1.02]' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}
                             >
                               {age === 'age3' ? '3A' : age === 'age4' ? '4A' : '5A'}
                             </button>
                           ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Elementos Seleccionados</p>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {plannerSelections.length === 0 ? (
                          <div className="text-center py-8">
                            <Target className="w-8 h-8 text-slate-800 mx-auto mb-2 opacity-50" />
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Sin selecciones</p>
                          </div>
                        ) : (
                          plannerSelections.map((sel) => {
                            const area = EVALUATION_DATA.find(a => a.id === sel.areaId);
                            const comp = area?.competencies.find(c => c.id === sel.competencyId);
                            const colors = AREA_COLORS[sel.areaId] || AREA_COLORS['comunicacion'];
                            return (
                               <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={sel.competencyId} 
                                className={`bg-white/10 p-6 rounded-[2.5rem] border-2 ${colors.border.replace('border-', 'border-opacity-30 border-')} group hover:bg-white/20 transition-all`}
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex-1">
                                    <p className={`text-[9px] font-black ${colors.text.replace('text-', 'text-opacity-70 text-')} uppercase tracking-widest mb-1`}>{area?.name}</p>
                                    <p className="text-[10px] font-black text-white uppercase tracking-wider">{comp?.name}</p>
                                  </div>
                                  <button 
                                    onClick={() => setPlannerSelections(p => p.filter(x => x.competencyId !== sel.competencyId))}
                                    className="p-1.5 hover:bg-rose-500/20 rounded-xl text-slate-500 hover:text-rose-400 transition-all"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  {sel.performanceIndices.map(pIdx => (
                                    <div key={pIdx} className="flex gap-3">
                                      <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
                                      <p className="text-[11px] text-slate-300 leading-relaxed font-bold">{comp?.performances[selectedAge][pIdx]}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-3">
                      <button 
                        onClick={exportToWord}
                        disabled={plannerSelections.length === 0}
                        className="w-full bg-emerald-500 text-white py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-600/20 hover:bg-emerald-400 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                      >
                        <Download className="w-4 h-4" />
                        Generar Documento
                      </button>
                      <button 
                         onClick={() => setActiveTab('assistant')}
                         className="w-full bg-amber-400 text-amber-950 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20 hover:bg-amber-300 active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                         <Sparkles className="w-4 h-4" />
                         Consultar a la IA
                      </button>
                      <button 
                         onClick={() => setActiveTab('achievements')}
                         disabled={plannerSelections.length === 0}
                         className="w-full bg-white border-2 border-emerald-100 text-emerald-950 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-50 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                         <CheckCircle2 className="w-4 h-4" />
                         Registrar Logros
                      </button>
                      <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full bg-white/5 text-slate-500 py-3 rounded-2xl font-bold text-[9px] uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-3 h-3" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'resources' ? (
          <div className="max-w-6xl mx-auto px-6 py-10 lg:px-12">
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 h-1 w-8 rounded-full" />
                <span className="text-[11px] font-black uppercase text-emerald-600 tracking-widest">
                  Biblioteca Curricular
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Recursos para el Aula
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                Materiales sugeridos según la edad y competencia, alineados al CNEB.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESOURCES.map((resource) => (
                <div key={resource.id} className="bg-white rounded-3xl border border-emerald-100 p-6 flex flex-col hover:shadow-lg transition-all">
                   <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        resource.type === 'song' ? 'bg-yellow-100 text-yellow-700' :
                        resource.type === 'story' ? 'bg-violet-100 text-violet-700' :
                        resource.type === 'game' ? 'bg-rose-100 text-rose-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {resource.type}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {resource.age === 'all' ? 'Multiedad' : `${resource.age} años`}
                      </span>
                   </div>
                   <h3 className="font-display font-black text-xl text-slate-900 mb-2 leading-tight">
                     {resource.title}
                   </h3>
                   <p className="text-sm text-slate-500 font-medium mb-6 flex-1">
                     {resource.description}
                   </p>
                   <div className="flex gap-2 mt-auto">
                     {resource.links.length > 0 ? (
                       <a 
                        href={resource.links[0]} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-3 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                       >
                         <ExternalLink className="w-3 h-3" /> Ver Recurso
                       </a>
                     ) : (
                       <button disabled className="flex-1 bg-slate-50 text-slate-400 py-3 rounded-xl text-xs font-bold">
                         Próximamente
                       </button>
                     )}
                   </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'achievements' ? (
          <div className="max-w-4xl mx-auto px-6 py-10 lg:px-12">
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 h-1 w-8 rounded-full" />
                <span className="text-[11px] font-black uppercase text-emerald-600 tracking-widest">
                  Registro de Logros
                </span>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                Seguimiento de Desempeños
              </h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-2xl">
                Marca los desempeños logrados por el grupo durante la última sesión.
              </p>
            </header>

            {plannerSelections.length === 0 ? (
               <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-emerald-100">
                  <ListChecks className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold">Planifica una sesión primero para registrar logros.</p>
                  <button 
                    onClick={() => setActiveTab('planner')}
                    className="mt-4 text-emerald-600 font-black text-xs uppercase tracking-widest"
                  >
                    Ir al Planificador
                  </button>
               </div>
            ) : (
              <div className="space-y-6">
                {plannerSelections.map(sel => {
                  const area = EVALUATION_DATA.find(a => a.id === sel.areaId);
                  const comp = area?.competencies.find(c => c.id === sel.competencyId);
                  return (
                    <div key={sel.competencyId} className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm">
                      <div className="mb-6">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{area?.name}</p>
                        <h4 className="font-display font-bold text-lg text-slate-900">{comp?.name}</h4>
                      </div>
                      <div className="space-y-4">
                        {sel.performanceIndices.map(idx => {
                          const id = `${sel.competencyId}-${idx}`;
                          const isDone = achievements[id];
                          return (
                            <button 
                              key={idx}
                              onClick={() => toggleAchievement(id)}
                              className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                                isDone 
                                ? 'bg-emerald-50 border-emerald-500 shadow-inner' 
                                : 'bg-slate-50 border-transparent hover:border-slate-200'
                              }`}
                            >
                              <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                isDone ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-transparent'
                              }`}>
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <span className={`text-sm font-bold leading-relaxed ${isDone ? 'text-emerald-900' : 'text-slate-600'}`}>
                                {comp?.performances[selectedAge][idx]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="bg-emerald-900 text-white p-8 rounded-3xl flex items-center justify-between shadow-xl">
                   <div>
                     <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest mb-1">Resumen del Día</p>
                     <p className="text-lg font-black tracking-tight">{Object.values(achievements).filter(Boolean).length} Desempeños Alcanzados</p>
                   </div>
                   <button className="bg-white text-emerald-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                      Guardar en Siagie
                   </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <header className="px-6 py-6 border-b border-green-100 bg-white/80 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div>
                  <h2 className="font-display font-black text-2xl text-emerald-950 tracking-tight">Asistente Pedagógico IA</h2>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1">I.E.I 0009 - Inteligencia Curricular</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">En Línea</span>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
              <div className="max-w-4xl mx-auto space-y-6">
                {chatMessages.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-yellow-200 p-2 overflow-hidden bg-white">
                      <InstitutionalLogo className="w-full h-full" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-slate-900 mb-2 tracking-tight">¡Hola docente de I.E.I 0009! 👋</h3>
                    <p className="text-slate-500 max-w-sm mx-auto font-medium">
                      Soy tu asistente IA institucional. Selecciona tus competencias en el planificador y te ayudaré a diseñar tu sesión con nuestra estructura oficial.
                    </p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "¿Cómo puedo estructurar una sesión de comunicación?",
                        "Dame ideas para una sesión de matemática sobre conteo.",
                        "¿Qué materiales puedo usar para indagación?",
                        "Ayúdame a redactar el inicio de mi sesión."
                      ].map((hint, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            setUserInput(hint);
                          }}
                          className="bg-white border-2 border-emerald-50 p-4 rounded-3xl text-left text-sm font-bold text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all"
                        >
                          {hint}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-6 rounded-[2.5rem] shadow-sm ${
                      msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white border-2 border-emerald-100 text-slate-800 rounded-tl-none'
                    }`}>
                      <div className="markdown-body text-sm font-medium leading-relaxed">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border-2 border-emerald-100 p-6 rounded-[2.5rem] rounded-tl-none flex gap-2">
                       <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                       <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                       <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            <div className="p-6 border-t border-green-100 bg-white/80 backdrop-blur-md shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.05)]">
              <form onSubmit={handleAiChat} className="max-w-4xl mx-auto flex gap-4">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Pregunta lo que necesites para tu sesión..."
                  className="flex-1 bg-[#fafffa] border-2 border-emerald-50 rounded-[2rem] px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all placeholder:text-emerald-200"
                />
                <button 
                  type="submit"
                  disabled={isAiLoading || !userInput.trim()}
                  className="bg-emerald-600 text-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
              <p className="text-center mt-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">Powered by Gemini 1.5 • I.E.I 0009 AI Suite</p>
            </div>
          </div>
        )}

        <footer className="px-6 lg:px-12 py-12 border-t border-green-100 bg-[#f0fdf4]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-emerald-950 font-black tracking-tight">
                  I.E.I 0009 - Gestión Educativa
                </p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
                  Plataforma Profesional © 2026
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">Portal Docente</a>
              <a href="#" className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">Soporte TI</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function CompetencyCard({ competency, index, areaName, areaId }: { competency: Competency; index: number; areaName: string; areaId: string }) {
  const colors = AREA_COLORS[areaId] || AREA_COLORS['comunicacion'];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group"
      id={`comp-card-${competency.id}`}
    >
      <div className={`bg-white rounded-[3rem] border-4 ${colors.border} shadow-xl shadow-slate-200/50 overflow-hidden transition-all hover:shadow-2xl`}>
        {/* Competency Header */}
        <div className="p-8 lg:p-12 border-b border-slate-50 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 mb-12">
            <div className="lg:pt-2">
              <div className={`w-16 h-16 rounded-3xl ${colors.bg} text-white flex items-center justify-center font-black text-3xl shadow-xl ${colors.bg.replace('bg-', 'shadow-')}/30 grow-0 shrink-0 rotate-2`}>
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <p className={`text-[11px] font-black ${colors.text} uppercase tracking-[0.25em] mb-3`}>{areaName}</p>
              <h3 className="font-display text-3xl lg:text-5xl font-black text-slate-900 leading-[1] mb-8 tracking-tight">
                {competency.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {competency.capacities.map((cap, i) => (
                  <span key={i} className={`px-5 py-2 rounded-2xl ${colors.light} ${colors.text} text-[11px] font-black uppercase tracking-wider border-2 ${colors.border}`}>
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${colors.light} rounded-[2.5rem] p-10 border-2 ${colors.border} flex gap-8 relative overflow-hidden`}>
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bg} opacity-5 rounded-full`} />
            <div className={`${colors.text} shrink-0 mt-1`}>
              <Target className="w-8 h-8" />
            </div>
            <div className="relative z-10">
              <h4 className={`text-[11px] font-black uppercase ${colors.text} tracking-[0.2em] mb-3`}>Estándar de Aprendizaje del Ciclo II</h4>
              <p className="text-lg lg:text-xl text-slate-800 leading-relaxed font-bold italic">
                "{competency.standard}"
              </p>
            </div>
          </div>
        </div>

        {/* Performances Grid */}
        <div className="p-6 lg:p-10 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <PerformanceColumn 
              age="3 AÑOS" 
              items={competency.performances.age3} 
              color="bg-white border-rose-200" 
              labelColor="bg-rose-500" 
              itemColor="text-rose-900" 
              iconColor="text-rose-400"
              areaColor={colors.bg}
            />
            <PerformanceColumn 
              age="4 AÑOS" 
              items={competency.performances.age4} 
              color="bg-white border-sky-200" 
              labelColor="bg-sky-500" 
              itemColor="text-sky-900" 
              iconColor="text-sky-400"
              areaColor={colors.bg}
            />
            <PerformanceColumn 
              age="5 AÑOS" 
              items={competency.performances.age5} 
              color="bg-white border-emerald-200" 
              labelColor="bg-emerald-500" 
              itemColor="text-emerald-900" 
              iconColor="text-emerald-400"
              areaColor={colors.bg}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PerformanceColumn({ 
  age, 
  items, 
  color, 
  labelColor, 
  itemColor, 
  iconColor,
  areaColor
}: { 
  age: string; 
  items: string[]; 
  color: string; 
  labelColor: string; 
  itemColor: string;
  iconColor: string;
  areaColor: string;
}) {
  return (
    <div className={`p-8 rounded-[2.5rem] border-2 min-h-[350px] flex flex-col shadow-sm transition-all hover:shadow-xl ${color} group/col`}>
      <div className="flex items-center justify-between mb-8">
        <span className={`px-5 py-2 rounded-2xl ${labelColor} text-white text-xs font-black uppercase tracking-wider shadow-lg ${labelColor.replace('bg-', 'shadow-')}/20 ring-4 ring-slate-100/50`}>
          {age}
        </span>
        <div className="bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 flex items-center gap-2 opacity-60">
          <Target className={`w-3.5 h-3.5 ${iconColor}`} />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{age.includes('5') ? 'Criterios' : 'Desempeños'}</span>
        </div>
      </div>
      
      <div className="space-y-6 flex-1">
        {items.length > 0 && !items[0].includes('No se evidencia') ? (
          items.map((item, idx) => (
            <div key={idx} className="flex gap-4 group/item">
              <div className={`shrink-0 w-2.5 h-2.5 rounded-full ${areaColor} mt-2 opacity-20 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all`} />
              <p className={`text-sm font-bold leading-relaxed ${itemColor} opacity-80 group-hover/item:opacity-100 transition-opacity`}>
                {item}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-20 text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <X className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Sin Evidencia</p>
          </div>
        )}
      </div>
    </div>
  );
}
