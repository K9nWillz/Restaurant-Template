import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi there! Welcome to Lumina. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsExpanded(true), 1500);
    const timer2 = setTimeout(() => setIsExpanded(false), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI
    const updatedMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Format history for Gemini API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, history }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages([...updatedMessages, { role: 'model', text: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...updatedMessages, 
        { role: 'model', text: 'Sorry, I am having trouble connecting right now. Please try again later or contact us at +1 (234) 567-890.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed bottom-6 right-6 z-[60] bg-stone-900 dark:bg-white text-white dark:text-stone-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open support chat"
      >
        <MessageSquare size={28} className="shrink-0" />
        <AnimatePresence initial={false}>
          {isExpanded && !isOpen && (
            <motion.span
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap font-medium text-sm pr-2"
            >
              Have a question? Ask Lumina AI!
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[70] w-[90vw] max-w-[380px] h-[500px] max-h-[80vh] bg-white dark:bg-stone-950 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 dark:border-stone-800"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold font-serif leading-tight">Lumina Support</h3>
                  <p className="text-primary-100 text-xs">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-900/50 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300' : 'bg-primary-100 dark:bg-primary-900/40 text-primary-600'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div 
                    className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                      msg.role === 'user' 
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-tr-sm' 
                        : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-100 dark:border-stone-700 shadow-sm rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary-100 dark:bg-primary-900/40 text-primary-600">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 shadow-sm rounded-tl-sm flex items-center gap-1 text-stone-500">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800 z-10">
              <form 
                onSubmit={handleSubmit}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-stone-100 dark:bg-stone-900 border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none text-stone-900 dark:text-white transition-shadow"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors shadow-sm"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
