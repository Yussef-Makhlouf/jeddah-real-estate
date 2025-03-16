"use client"
import { useEffect } from 'react';

export default function ThankYouPage() {
  useEffect(() => {
    // Replace entire history with current page
    window.history.replaceState(null, '', window.location.href);

    // Block all navigation attempts
    const blockNavigation = (e) => {
      e.preventDefault();
      e.returnValue = '';
      alert('لا يمكنك الرجوع إلى الصفحة السابقة أو مغادرة هذه الصفحة');
      return '';
    };

    // Handle back/forward navigation
    window.onpopstate = () => {
      window.history.replaceState(null, '', window.location.href);
      alert('لا يمكنك الرجوع إلى الصفحة السابقة');
    };

    // Handle page refresh or close
    window.addEventListener('beforeunload', blockNavigation);

    // Handle any link clicks
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        alert('لا يمكنك الانتقال من هذه الصفحة');
      }
    });

    // Continuously check and block navigation
    const navigationCheck = setInterval(() => {
      if (window.location.pathname !== '/thank-you') {
        window.history.replaceState(null, '', '/thank-you');
        alert('لا يمكنك الانتقال من هذه الصفحة');
      }
    }, 100);

    // Prevent going back to the homepage
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
      window.location.href = '/thank-you';
    };

    return () => {
      window.removeEventListener('beforeunload', blockNavigation);
      document.removeEventListener('click', blockNavigation);
      clearInterval(navigationCheck);
    };
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
      window.location.href = '/thank-you';
    };
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
      window.location.href = '/thank-you';
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
