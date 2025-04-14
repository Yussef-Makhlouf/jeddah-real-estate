'use client';

// Helper function to track Google Analytics events
export const trackGoogleEvent = (eventName: string, data = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, data);
    }
}; 