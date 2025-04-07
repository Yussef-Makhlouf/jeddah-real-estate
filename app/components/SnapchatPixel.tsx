'use client';

import Script from 'next/script';

const SNAPCHAT_PIXEL_ID = 'YOUR_SNAPCHAT_PIXEL_ID';

const SnapchatPixel = () => {
    return (
        <>
            <Script id="snap-pixel" strategy="afterInteractive">
                {`
                    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
                    {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                    a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
                    r.src=n;var u=t.getElementsByTagName(s)[0];
                    u.parentNode.insertBefore(r,u);})(window,document,
                    'https://sc-static.net/scevent.min.js');
                    
                    snaptr('init', '${SNAPCHAT_PIXEL_ID}', {
                        'user_email': '__OPTIONAL_USER_EMAIL__'
                    });
                    
                    snaptr('track', 'PAGE_VIEW');
                `}
            </Script>
        </>
    );
};

export default SnapchatPixel;

// Helper function to track Snapchat events
export const trackSnapEvent = (eventName: string, data = {}) => {
    if ((window as any).snaptr) {
        (window as any).snaptr('track', eventName, data);
    }
}; 