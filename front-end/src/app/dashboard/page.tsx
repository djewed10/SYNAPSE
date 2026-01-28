'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, RotateCw, Edit2 } from 'lucide-react';
import { ProgressionChart } from '@/components/charts';

export default function DashboardHome() {
  const historyItems = [
    { title: 'Tissu musculaire strié', progress: '40/110', id: 1 },
    { title: 'Néoglucogenese', progress: '25/127', id: 2 },
    { title: 'Néoglucogenese', progress: '25/127', id: 3 },
    { title: 'Néoglucogenese', progress: '25/127', id: 4 },
    { title: 'Néoglucogenese', progress: '25/127', id: 5 },
  ];

  return (
    <div className="mx-auto space-y-8 font-['Product_Sans'] text-[var(--text-primary)] transition-colors duration-300">
      
      {/* Top ROW: Goal, Chart, Points, Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 dashboard-grid items-stretch">
        
        {/* Daily Goal */}
        <div className="lg:col-span-4 rounded-3xl lg:mt-[70px] p-6 relative overflow-hidden flex flex-col justify-center h-[130px] max-sm:h-[130px] mx-3 shadow-lg transition-all duration-300 hover:shadow-xl dashboard-cards-width"
          style={{
            background: 'var(--daily-goal-bg)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid var(--daily-goal-border)',
            boxShadow: 'var(--shadow-lg)'
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 dark:from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img className='h-12 mt-[-14px] rotate-x-10 rotate-75' src="/3d-objective.png" alt="" />
                <h2 className="text-lg max-sm:text-lg font-bold text-[var(--text-primary)] mr-7">Objectif Quotidien</h2>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <span className="font-bold text-base p-0 text-[var(--primary)] max-sm:text-sm">20/100</span>
                <Edit2 className="w-4 h-4 cursor-pointer hover:text-[var(--primary-hover)] transition-colors" />
              </div>
            </div>
            
            <div className="w-full bg-[var(--surface)] rounded-full h-3 relative overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <div 
                className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent-blue)]" 
                style={{ width: '20%', transition: 'width 0.5s ease-out', boxShadow: '0 0 10px var(--primary)' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Chart - shadcn/recharts */}
        <div className="lg:col-span-4 bg-[var(--chart-bg)] mx-3 rounded-3xl p-4 shadow-sm flex flex-col min-h-10 dashboard-cards-width border border-[var(--border)] transition-colors duration-300" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2 px-2">Progression</h3>
          <div className="max-h-[250px] flex-1 w-full">
            <ProgressionChart />
          </div>
        </div>

        {/* Points & Ranking */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-8   dashboard-cards-width">
           <div className="flex flex-col ml-3 items-center justify-center bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] transition-colors duration-300" style={{ boxShadow: 'var(--shadow-card)' }}>
             <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Points</h3>
             <div className="flex items-center gap-2">
               <span className="text-5xl font-bold text-[var(--text-primary)]">46</span>
               <div className="w-12 h-12 relative">
                 <Image src="/icons/star.png" alt="Star" fill className="object-contain" />
               </div>
             </div>
           </div>

           <div className="flex flex-col mr-3 items-center justify-center bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] transition-colors duration-300" style={{ boxShadow: 'var(--shadow-card)' }}>
             <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Classement</h3>
             <div className="flex items-center gap-2">
               <span className="text-5xl font-bold text-[var(--text-primary)]">725</span>
               <div className="w-12 h-12 relative">
                 <Image src="/icons/yellow_trophy_cup_winner_success_champion_icon_sign_or_symbol_3d_illustration.png" alt="Trophy" fill className="object-contain" />
               </div>
             </div>
           </div>
        </div>

      </div>

      {/* Bottom Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           
           {/* Modules */}
           <DashboardCard 
             title="Modules"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-modules-bg)]"
             titleColor="text-blue-600"
             iconPath="/images/modules.png"
             href="/dashboard/modules"
           />

           {/* Examen */}
           <DashboardCard 
             title="Examen"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-exam-bg)]"
             titleColor="text-[var(--text-primary)]"
             iconPath="/images/exam.png"
             href="/dashboard/examen"
           />
           {/* Dernierevu */}
           
          
           {/* Hack */}
           <DashboardCard 
             title="Hack"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-hack-bg)]"
             titleColor="text-amber-500"
             iconPath="/images/hack.png"
             href="/dashboard/hack"
           />
           
           {/* Bibliotheque */}
           <DashboardCard 
             title="Bibliotheque"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-biblio-bg)]"
             titleColor="text-emerald-500"
             iconPath="/images/biblio.png"
             href="/dashboard/bibliotheque"
           />

           {/* Résumé qcm */}
           <DashboardCard 
             title="Résumé qcm"
             titleComponent={<span className="text-purple-600">Résumé<span className="text-sm font-normal text-purple-400">qcm</span></span>}
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-resume-bg)]"
             titleColor="text-purple-600"
             iconPath="/images/resumer-qcm.png"
             href="/dashboard/resume-qcm"
           />

           {/* Statistiques */}
           <DashboardCard 
             title="Statistiques"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-stats-bg)]"
             titleColor="text-sky-500"
             iconPath="/images/stats.png"
             href="/dashboard/statistiques"
           />
            <DashboardCard 
             title="Dernierevu"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-derniervu-bg)]"
             titleColor="text-[var(--text-primary)]"
             iconPath="/images/eye.png"
             href="/dashboard/dernierevu"
           />
        </div>

        {/* Right Sidebar: History */}
        <div className="lg:col-span-4 mx-3 bg-[var(--history-bg)] rounded-3xl p-6 h-fit border border-[var(--border)] transition-colors duration-300" style={{ boxShadow: 'var(--shadow-card)' }}>
           <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Historique</h2>
           <div className="space-y-6">
             {historyItems.map((item, index) => (
                <div key={index} className="space-y-2">
                   <div className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--history-dot)]"></div>
                        <span className="font-semibold text-[var(--text-primary)]">{item.title}</span>
                     </div>
                     <span className="font-bold text-[var(--text-primary)]">{item.progress}</span>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 bg-[var(--primary)] text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium hover:bg-[var(--primary-hover)] transition-all duration-300">
                         <Play className="w-4 h-4 fill-current" /> Continuer
                      </button>
                      <button className="flex-1 bg-[var(--primary)] text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium hover:bg-[var(--primary-hover)] transition-all duration-300">
                         <RotateCw className="w-4 h-4" /> Refaire
                      </button>
                   </div>
                </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  titleComponent,
  subtitle, 
  bgColor, 
  titleColor, 
  iconPath,
  href
}: { 
  title: string, 
  titleComponent?: React.ReactNode,
  subtitle: string, 
  bgColor: string, 
  titleColor: string, 
  iconPath: string,
  href: string
}) {
  return ( 
    <Link href={href} className="block">
     <div className={`${bgColor} rounded-3xl p-6 mx-4 relative overflow-hidden min-h-40 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-[var(--border)]`} style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="flex flex-col z-10 max-w-[60%]">
         <h3 className={`text-2xl font-bold mb-2 ${titleColor} flex items-center gap-2 font-['Product_Sans_Medium']`}>
             {title === 'Hack' && <img src="/icons/hack_icon.png" alt="Hack Icon" width={48} height={48} className="w-7 h-7" />}
             {title === 'Modules' && <img src="/icons/correct_mark.png" alt="Modules Icon" width={24} height={24} className="w-6 h-6" />}
             {title === 'Bibliotheque' && <img src="/icons/tag-svgrepo-com.png" alt="Library Icon" width={24} height={24} className="w-4 h-8 mt-[-11px]" />}
             {title === 'Examen' && <img src="/icons/chronometer-svgrepo-com.png" alt="Exam Icon" width={24} height={24} className="w-6 h-6 -mt-1" />}
             {title === 'Résumé qcm' && <img src="/icons/resumer-qcm-logo.png" alt="Resume Icon" width={24} height={24} className="w-6 h-6 mt-[-3px]" />}
             {title === 'Statistiques' && <img src="/icons/statistics-svgrepo-com.png" alt="Stats Icon" width={24} height={24} className="w-6 h-6 mt-[-3px]"  />}
             {title === 'Dernierevu' && <img src="/icons/eye_icon.png" alt="Dernierevu Icon" width={24} height={24} className="w-6 h-6 mt-[-3px]" />}
            
             {titleComponent || title}
         </h3>
         <p className="text-sm text-[var(--text-secondary)] leading-tight font-['Product_Sans']">
           {subtitle}
         </p>
      </div>
      
      {/* 3D Icon Image */}
      <div className="absolute -right-2.5 -bottom-2.5 w-32 h-32 md:w-40 md:h-40">
         <Image 
           src={iconPath} 
           alt={title} 
           fill 
           className="object-contain drop-shadow-xl"
         />
      </div>
    </div>
    </Link>
  );
}
