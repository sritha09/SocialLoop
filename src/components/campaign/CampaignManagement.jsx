import React, { useState } from 'react';
import { 
  Briefcase, Users, Eye, CheckCircle2, XCircle, Clock, Star, 
  Sparkles, MessageSquare, PauseCircle, PlayCircle, Trash2, ArrowUpRight, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CampaignManagement = ({ onChatClick, openCreateModal }) => {
  const { currentUser, users } = useAuth();
  const { campaigns, applications, updateCampaignStatus, deleteCampaign, updateApplicationStatus } = useData();

  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  const myCampaigns = campaigns.filter(c => c.businessId === currentUser.id);

  const activeCampaign = campaigns.find(c => c.id === selectedCampaignId) || myCampaigns[0];

  const currentApps = activeCampaign 
    ? applications.filter(a => a.campaignId === activeCampaign.id) 
    : [];

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-500" />
            <span>Campaign Management Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review applicant proposals, screen creators with AI scores, and initiate deals.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all self-start sm:self-auto"
        >
          + Post New Campaign
        </button>
      </div>

      {myCampaigns.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Campaigns Created Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Start connecting with creators by creating your first promotional or collaboration campaign.
          </p>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 rounded-xl gradient-bg text-white font-bold text-xs shadow-xl shadow-indigo-500/30"
          >
            Create Your First Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CAMPAIGN LIST (LEFT COLUMN) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              <span>Your Posted Campaigns ({myCampaigns.length})</span>
            </h3>

            <div className="space-y-3">
              {myCampaigns.map((camp) => {
                const isSelected = activeCampaign?.id === camp.id;
                const appsCount = applications.filter(a => a.campaignId === camp.id).length;

                return (
                  <div
                    key={camp.id}
                    onClick={() => setSelectedCampaignId(camp.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-500/10 border-indigo-500 dark:border-indigo-500 shadow-md'
                        : 'glass-panel border-slate-200/80 dark:border-white/10 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        camp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                        camp.status === 'Paused' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                        'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                      }`}>
                        {camp.status}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCampaignStatus(camp.id, camp.status === 'Active' ? 'Paused' : 'Active');
                          }}
                          className="p-1 rounded text-slate-400 hover:text-amber-500"
                          title={camp.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                        >
                          {camp.status === 'Active' ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCampaign(camp.id);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-500"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1 line-clamp-1">
                      {camp.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      Payout: <span className="font-bold text-emerald-500">${camp.budget}</span> • {camp.city}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/50 dark:border-white/5">
                      <span className="flex items-center gap-1 font-semibold text-indigo-500">
                        <Users className="w-3.5 h-3.5" />
                        {appsCount} Applicants
                      </span>
                      <span>Expires {camp.deadline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* APPLICANT SCREENING & AI MATCHMAKER (RIGHT COLUMN) */}
          <div className="lg:col-span-7 space-y-6">
            {activeCampaign && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-6">
                
                {/* ACTIVE CAMPAIGN HEADER */}
                <div className="pb-4 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Screening Applicants For</span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{activeCampaign.title}</h3>
                    <p className="text-xs text-slate-500">{activeCampaign.venue} • Payout: ${activeCampaign.budget}</p>
                  </div>
                </div>

                {/* APPLICANTS LIST */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span>Submitted Creator Applications ({currentApps.length})</span>
                  </h4>

                  {currentApps.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 text-xs text-slate-500">
                      No applications submitted for this campaign yet.
                    </div>
                  ) : (
                    currentApps.map((app) => {
                      const creator = users.find(u => u.id === app.influencerId) || {
                        name: 'Maya Lin',
                        username: '@mayacreates',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                        followersCount: 85000,
                        engagementRate: 5.4,
                        rating: 4.95,
                        category: 'Food & Lifestyle',
                        isVerified: true
                      };

                      // Calculated AI Match Score (Mock logic)
                      const aiScore = 96;

                      return (
                        <div
                          key={app.id}
                          className="p-5 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-4 hover:border-indigo-500/40 transition-all"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img 
                                src={creator.avatar} 
                                alt={creator.name} 
                                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" 
                              />
                              <div>
                                <h5 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                                  {creator.name}
                                  {creator.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                                </h5>
                                <p className="text-xs text-slate-500">{creator.username} • {creator.category}</p>
                              </div>
                            </div>

                            {/* AI COMPATIBILITY BADGE */}
                            <div className="flex items-center gap-2">
                              <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-500/20 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                                <span>{aiScore}% AI Match</span>
                              </div>
                            </div>
                          </div>

                          {/* METRICS ROW */}
                          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 text-[11px]">
                            <div>
                              <span className="text-slate-400 block">Followers</span>
                              <span className="font-bold text-slate-900 dark:text-white">{(creator.followersCount / 1000).toFixed(0)}K</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Engagement</span>
                              <span className="font-bold text-emerald-500">{creator.engagementRate}%</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Proposed Quote</span>
                              <span className="font-bold text-indigo-500">${app.expectedPrice}</span>
                            </div>
                          </div>

                          {/* COVER MESSAGE */}
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-900/20 p-3 rounded-xl">
                            "{app.message}"
                          </p>

                          {/* ACTION BUTTONS: ACCEPT / REJECT / CHAT */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/50 dark:border-white/5">
                            <button
                              onClick={() => onChatClick(creator.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Chat</span>
                            </button>

                            <div className="flex items-center gap-2">
                              {app.status === 'Accepted' ? (
                                <span className="px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Accepted & Deal Created</span>
                                </span>
                              ) : (
                                <>
                                  <button
                                    onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 text-xs font-semibold hover:bg-rose-500 hover:text-white transition-all"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => updateApplicationStatus(app.id, 'Accepted')}
                                    className="px-4 py-1.5 rounded-xl gradient-bg text-white text-xs font-extrabold shadow-md hover:scale-105 transition-all flex items-center gap-1"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Accept & Lock Deal</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
