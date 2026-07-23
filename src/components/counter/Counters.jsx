import React from 'react';
import CountUp from 'react-countup';
import { PartyPopper, HeartHandshake, Building2, Cake, Users, Star, CalendarCheck } from 'lucide-react';

const stats=[
{icon:<PartyPopper className='w-10 h-10 text-purple-600'/>,end:300,suffix:'+',title:'Successful Events',subtitle:'Completed with Excellence'},
{icon:<HeartHandshake className='w-10 h-10 text-purple-600'/>,end:100,suffix:'+',title:'Luxury Weddings',subtitle:'Planned Beautifully'},
{icon:<Building2 className='w-10 h-10 text-purple-600'/>,end:75,suffix:'+',title:'Corporate Events',subtitle:'Organized Perfectly'},
{icon:<Cake className='w-10 h-10 text-purple-600'/>,end:200,suffix:'+',title:'Birthday Celebrations',subtitle:'Made Extra Special'},
{icon:<Users className='w-10 h-10 text-purple-600'/>,end:500,suffix:'+',title:'Happy Families',subtitle:'Trust Our Services'},
{icon:<Star className='w-10 h-10 text-purple-600 fill-purple-600'/>,end:4.9,decimals:1,suffix:'/5',title:'Client Rating',subtitle:'Based on 100+ Reviews'},
];

export default function Counters(){
return(
<section className='relative overflow-hidden bg-gradient-to-b from-white to-purple-50 py-20'>
<div className='absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl'></div>
<div className='absolute top-10 right-10 w-56 h-56 rounded-full bg-fuchsia-200/30 blur-3xl'></div>
<div className='relative max-w-7xl mx-auto px-6'>
<div className='text-center mb-14'>
<p className='uppercase tracking-[5px] text-purple-600 font-semibold'>Trusted by Hundreds of Happy Clients</p>
<h2 className='mt-4 text-4xl md:text-6xl font-bold text-slate-800'>Creating Memories,<br/><span className='bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>Celebrating Moments</span></h2>
<p className='max-w-3xl mx-auto mt-6 text-gray-600 text-lg'>From intimate gatherings to grand celebrations, we deliver unforgettable experiences.</p>
</div>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
{stats.map((item,index)=>(
<div key={index} className='bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-10 text-center'>
<div className='w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6'>{item.icon}</div>
<h3 className='text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent'><CountUp end={item.end} duration={2.5} decimals={item.decimals||0}/>{item.suffix}</h3>
<h4 className='mt-3 text-2xl font-semibold text-slate-800'>{item.title}</h4>
<p className='mt-2 text-gray-500'>{item.subtitle}</p>
<div className='w-12 h-1 bg-purple-500 rounded-full mx-auto mt-6'></div>
</div>))}
</div>
<div className='mt-16 rounded-3xl bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-700 p-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-white'>
<div><h3 className='text-4xl font-bold'>Your Dream.</h3><p className='text-3xl italic text-purple-200'>Our Passion.</p><p className='mt-4 text-purple-100'>Every celebration deserves creativity, planning and flawless execution.</p></div>
<button className='flex items-center gap-3 bg-white text-purple-700 px-8 py-4 rounded-2xl font-semibold'><CalendarCheck className='w-5 h-5'/>Plan Your Event</button>
</div>
</div>
</section>
)}