// app/components/JsonLd.js
'use client';
import { useEffect } from 'react';

export default function JsonLd({ data }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
  
  return null;
}