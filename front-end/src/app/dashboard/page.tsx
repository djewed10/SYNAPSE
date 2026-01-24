'use client';

import Image from 'next/image';
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
    <div className="max-w-[1600px] mx-auto space-y-8 font-['Product_Sans'] text-(--text-primary)">
      
      {/* Top ROW: Goal, Chart, Points, Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Daily Goal */}
        <div className="lg:col-span-4 rounded-3xl sm:mb-[-20px] p-6 relative overflow-hidden flex flex-col justify-center h-[130px] max-sm:h-[130px] mx-3 shadow-lg transition-all hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(59, 130, 246, 0.4)',
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2), 0 8px 16px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
          <img className='h-12 mt-[-14px] rotate-x-10 rotate-75' src="/6152022_general2_14-removebg-preview.png" alt="" />
          <h2 className="text-xl max-sm:text-lg font-bold text-gray-800  mr-7">Objectif Quotidien</h2>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
          <span className="font-bold text-base text-blue-500 max-sm:text-sm">20/100</span>
          <Edit2 className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" />
              </div>
            </div>
            
            <div className="w-full bg-gradient-to-r from-slate-100 to-slate-50 rounded-full h-3 relative overflow-hidden shadow-lg">
              <div 
          className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl" 
          style={{ width: '20%', transition: 'width 0.5s ease-out' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Chart - shadcn/recharts */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-4 shadow-sm flex flex-col min-h-10">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 px-2">Progression</h3>
          <div className="flex-1 w-full">
            <ProgressionChart />
          </div>
        </div>

        {/* Points & Ranking */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-8">
           <div className="flex flex-col items-center justify-center">
             <h3 className="text-xl font-bold mb-2">Points</h3>
             <div className="flex items-center gap-2">
               <span className="text-5xl font-bold text-(--text-primary)">46</span>
               <div className="w-12 h-12 relative">
                 <Image src="/icons/star.png" alt="Star" fill className="object-contain" />
               </div>
             </div>
           </div>

           <div className="flex flex-col items-center justify-center border-l border-gray-200">
             <h3 className="text-xl font-bold mb-2">Classement</h3>
             <div className="flex items-center gap-2">
               <span className="text-5xl font-bold text-(--text-primary)">725</span>
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

             iconIs3D={true}
           />

           {/* Examen */}
           <DashboardCard 
             title="Examen"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-exam-bg)]"
             titleColor="text-gray-900"
             iconPath="/images/exam.png"
             iconIs3D={true}
           />
           
           {/* Hack */}
           <DashboardCard 
             title="Hack"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-hack-bg)]"
             titleColor="text-amber-500"
             iconPath="/images/hack.png"
             iconIs3D={true} 
           />
           
           {/* Bibliotheque */}
           <DashboardCard 
             title="Bibliotheque"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-biblio-bg)]"
             titleColor="text-emerald-500"
             iconPath="/images/biblio.png"
             iconIs3D={true}
           />

           {/* Résumé qcm */}
           <DashboardCard 
             title="Résumé qcm"
             titleComponent={<span className="text-purple-600">Résumé<span className="text-sm font-normal text-purple-400">qcm</span></span>}
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-resume-bg)]"
             titleColor="text-purple-600"
             iconPath="/images/resumer-qcm.png"
             iconIs3D={true}
           />

           {/* Statistiques */}
           <DashboardCard 
             title="Statistiques"
             subtitle="Le mode standard dont vous pouvez faire vos QCM"
             bgColor="bg-[var(--card-stats-bg)]"
             titleColor="text-sky-500"
             iconPath="/images/stats.png"
             iconIs3D={true}
           />
        </div>

        {/* Right Sidebar: History */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm h-fit">
           <h2 className="text-2xl font-bold mb-6">Historique</h2>
           <div className="space-y-6">
             {historyItems.map((item, index) => (
                <div key={index} className="space-y-2">
                   <div className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                        <span className="font-semibold text-gray-800">{item.title}</span>
                     </div>
                     <span className="font-bold text-gray-800">{item.progress}</span>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 bg-(--primary-blue) text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
                         <Play className="w-4 h-4 fill-current" /> Continuer
                      </button>
                      <button className="flex-1 bg-(--primary-blue) text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
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
  iconPath
}: { 
  title: string, 
  titleComponent?: React.ReactNode,
  subtitle: string, 
  bgColor: string, 
  titleColor: string, 
  iconPath: string
}) {
  return ( 
     <div className={`${bgColor} rounded-3xl p-6 mx-4  relative overflow-hidden min-h-40 flex items-center justify-between transition-transform hover:scale-[1.02] cursor-pointer shadow-md`}>
      <div className="flex flex-col z-10 max-w-[60%]">
         <h3 className={`text-2xl font-bold mb-2 ${titleColor} flex items-center gap-2 font-['Product_Sans_Medium']`}>
             {title === 'Hack' && <img src="/icons/hack_icon.png" alt="Hack Icon" width={48} height={48} className="w-7 h-7" />}
             {title === 'Modules' && <img src="/icons/correct_mark.png" alt="Modules Icon" width={24} height={24} className="w-6 h-6" />}
             {title === 'Bibliotheque' && <img src="/icons/tag-svgrepo-com.png" alt="Library Icon" width={24} height={24} className="w-4 h-8 mt-[-11px]" />}
             {title === 'Examen' && <img src="/icons/chronometer-svgrepo-com.png" alt="Exam Icon" width={24} height={24} className="w-6 h-6 -mt-1" />}
             {title === 'Résumé qcm' && <img src="/icons/resumer-qcm-logo.png" alt="Resume Icon" width={24} height={24} className="w-6 h-6 mt-[-3px]" />}
             {title === 'Statistiques' && <img src="/icons/statistics-svgrepo-com.png" alt="Stats Icon" width={24} height={24} className="w-6 h-6 mt-[-3px]"  />}
             {titleComponent || title}
         </h3>
         <p className="text-sm text-gray-500 leading-tight font-['Product_Sans']">
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
  );
}
