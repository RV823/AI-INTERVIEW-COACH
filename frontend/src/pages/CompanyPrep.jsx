import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Search, Sparkles, ArrowRight, CheckCircle2, Video, BookOpen, Filter
} from 'lucide-react';

export default function CompanyPrep() {
  const [selectedCompany, setSelectedCompany] = useState('Google');

  const companies = [
    { name: 'Google', logoColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10', total: 45 },
    { name: 'Meta', logoColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10', total: 38 },
    { name: 'Amazon', logoColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10', total: 52 },
    { name: 'Microsoft', logoColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10', total: 40 },
    { name: 'Apple', logoColor: 'border-gray-500/40 text-gray-300 bg-gray-500/10', total: 32 },
    { name: 'Netflix', logoColor: 'border-red-500/40 text-red-400 bg-red-500/10', total: 28 },
  ];

  const questionBank = {
    "Google": [
      { q: "How would you design a distributed URL shortening service like Google's goo.gl handling 10B clicks/day?", cat: "System Design", freq: "Very High" },
      { q: "Given a binary tree, find the maximum path sum between any two nodes.", cat: "Data Structures", freq: "High" },
      { q: "Tell me about a time you made a decision based on incomplete data.", cat: "Behavioral (Googliness)", freq: "High" },
      { q: "How do you optimize garbage collection and memory allocation in high-throughput Java applications?", cat: "Technical", freq: "Medium" }
    ],
    "Amazon": [
      { q: "How do you apply Amazon's Leadership Principle 'Customer Obsession' when making technical trade-offs?", cat: "Behavioral (LP)", freq: "Very High" },
      { q: "Design an Amazon Prime Video recommendation engine using microservices.", cat: "System Design", freq: "High" },
      { q: "Implement LRU Cache with O(1) get and put operations.", cat: "Data Structures", freq: "High" }
    ],
    "Meta": [
      { q: "Design Meta News Feed algorithm with real-time updates using WebSockets.", cat: "System Design", freq: "Very High" },
      { q: "Find the lowest common ancestor of two nodes in a binary tree.", cat: "Algorithms", freq: "High" }
    ],
    "Microsoft": [
      { q: "How does Azure Cosmos DB achieve global multi-master data replication?", cat: "Cloud Architecture", freq: "High" },
      { q: "Design a collaborative document editing tool like Microsoft Word Online.", cat: "System Design", freq: "High" }
    ],
    "Apple": [
      { q: "How do you ensure tight hardware-software optimization and memory safety?", cat: "Low-Level Systems", freq: "High" },
      { q: "Describe a time when you pushed back on a product feature for user privacy.", cat: "Behavioral", freq: "High" }
    ],
    "Netflix": [
      { q: "How does Chaos Engineering (Chaos Monkey) improve microservice resilience?", cat: "DevOps & Architecture", freq: "High" },
      { q: "Design a video adaptive bitrate streaming pipeline.", cat: "System Design", freq: "High" }
    ]
  };

  const activeQuestions = questionBank[selectedCompany] || questionBank["Google"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5" />
          <span>Curated Company Question Vault</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Top Tech Company <span className="text-gradient">Interview Question Banks</span>
        </h1>
        <p className="text-sm text-gray-400">
          Practice authentic interview questions asked in recent technical and behavioral rounds at Google, Meta, Amazon, Microsoft, Apple, and Netflix.
        </p>
      </div>

      {/* Company Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {companies.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedCompany(c.name)}
            className={`p-4 rounded-2xl border transition-all text-center space-y-1.5 ${
              selectedCompany === c.name
                ? 'bg-indigo-600/30 border-indigo-500 shadow-lg scale-105'
                : 'bg-gray-950 border-gray-800 hover:border-gray-700'
            }`}
          >
            <span className="font-extrabold text-white text-base block">{c.name}</span>
            <span className="text-[11px] text-gray-400 block">{c.total} Questions</span>
          </button>
        ))}
      </div>

      {/* Active Company Vault Grid */}
      <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{selectedCompany} Question Vault</h3>
            <span className="text-xs text-gray-400">Filtered by frequency & recent hiring manager rounds</span>
          </div>

          <Link
            to="/interview"
            className="glass-button text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 glow-primary"
          >
            <Video className="w-4 h-4" />
            <span>Launch {selectedCompany} AI Mock Session</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeQuestions.map((qItem, idx) => (
            <div key={idx} className="bg-gray-950 border border-gray-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                  {qItem.cat}
                </span>
                <span className="text-amber-400 font-bold">Frequency: {qItem.freq}</span>
              </div>
              <p className="text-xs font-medium text-gray-200 leading-relaxed font-sans">
                "{qItem.q}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
