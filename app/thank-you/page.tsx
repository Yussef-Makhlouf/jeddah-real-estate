"use client";
import { useEffect } from 'react';

export default function ThankYouPage() {
  useEffect(() => {
    window.history.replaceState(null, '', window.location.href);
    window.onpopstate = () => {
      alert('لا يمكنك الرجوع إلى الصفحة السابقة.');
      window.history.replaceState(null, '', window.location.href);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-amber-500 mb-4">شكراً لتواصلك معنا</h1>
        <p className="text-gray-600">سيتم التواصل معك في أقرب وقت ممكن</p>
        <p className="text-sm text-gray-400 mt-4">هذه الصفحة مؤمنة ولا يمكنك مغادرتها</p>
      </div>
    </div>
  );
}