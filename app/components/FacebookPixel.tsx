'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

declare global {
    interface Window {
        fbq: any;
    }
}

const FB_PIXEL_ID = 'YOUR_PIXEL_ID_HERE';

const FacebookPixel = () => {
    const pathname = usePathname();

    useEffect(() => {
        // This pageview only triggers the first time the page loads
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, []);

    useEffect(() => {
        // This pageview triggers on route change
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [pathname]);

    return (
        <>
            <Script id="fb-pixel" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${FB_PIXEL_ID}');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
};

export default FacebookPixel;

// Helper function to track custom events
export const trackFBEvent = (eventName: string, options = {}) => {
    if (window.fbq) {
        window.fbq('track', eventName, options);
    }
}; 