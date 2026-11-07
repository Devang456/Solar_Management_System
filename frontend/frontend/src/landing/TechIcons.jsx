import React from "react";

export const ReactIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const ViteIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M29.6 4.7L16.8 28.5c-.4.7-1.4.7-1.8 0L2.4 4.7c-.5-.9.2-2 1.2-1.9l12.7 1.4c.5.1 1.1.1 1.6 0L30.6 2.8c1-.1 1.7 1 1.2 1.9h-2.2z" fill="#bd34fe" />
    <path d="M22.8 1.9L12.5 4l-4.7 13.9 14.8-15.8c.2-.2 0-.2.2-.2z" fill="#41d1ff" />
    <path d="M16 11.2l-2.4 4.6 4.2-.6-3.8 8.8 7.4-10.4-4.4.6 3.6-5.8-4.6 2.8z" fill="#ffea83" />
  </svg>
);

export const NodeIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 2.5l11.7 6.7v13.6L16 29.5 4.3 22.8V9.2L16 2.5z" fill="#539e43" />
    <path d="M16 4.8L6.3 10.4v11.2L16 27.2l9.7-5.6V10.4L16 4.8z" fill="#333333" />
    <path d="M14.5 12h3v8h-3v-8zm0-3h3v2h-3V9z" fill="#ffffff" />
  </svg>
);

export const ExpressIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1e293b" />
    <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="sans-serif">EX</text>
  </svg>
);

export const MongoIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 2.5c-.3 0-.6.2-.7.4C14.1 6.5 7 13.8 7 19.8 7 24.9 10.9 29 16 29.5c5.1-.5 9-4.6 9-9.7 0-6-7.1-13.3-8.3-16.9-.1-.2-.4-.4-.7-.4z" fill="#13aa52" />
    <path d="M16 2.5v27c5.1-.5 9-4.6 9-9.7 0-6-7.1-13.3-8.3-16.9-.1-.2-.4-.4-.7-.4z" fill="#119246" />
  </svg>
);

export const TimescaleIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#fdb515" />
    <path d="M16 6a10 10 0 100 20 10 10 0 000-20zm1 10.5h-5v-1.5h3.5V9.5H17v7z" fill="#1f2937" />
  </svg>
);

export const RedisIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#dc382d" />
    <path d="M8 12l8-4 8 4-8 4-8-4z" fill="#ffffff" opacity="0.9" />
    <path d="M8 16l8 4 8-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 20l8 4 8-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RechartsIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0b3d3a" />
    <path d="M6 24h20" stroke="#5c6f68" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 20l5-8 5 5 6-9" stroke="#e8a33d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="13" cy="12" r="2" fill="#2f8f5b" />
    <circle cx="18" cy="17" r="2" fill="#2f8f5b" />
    <circle cx="24" cy="8" r="2" fill="#e8a33d" />
  </svg>
);

export const LeafletIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#199900" />
    <path d="M16 6c-4.4 0-8 3.6-8 8 0 6 8 13 8 13s8-7 8-13c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" fill="#ffffff" />
  </svg>
);

export const TanStackIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#ff4154" />
    <path d="M10 8h12v4H10V8zm2 6h8v4h-8v-4zm2 6h4v4h-4v-4z" fill="#ffffff" />
  </svg>
);

export const FormikIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0052cc" />
    <path d="M9 9h14v3H9V9zm0 6h11v3H9v-3zm0 6h8v3H9v-3z" fill="#ffffff" />
    <circle cx="23" cy="22" r="3" fill="#36b37e" />
  </svg>
);

export const PdfIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#ea4335" />
    <path d="M9 8h10l5 5v11a2 2 0 01-2 2H9a2 2 0 01-2-2V10a2 2 0 012-2z" fill="#ffffff" opacity="0.9" />
    <path d="M19 8v5h5" fill="#e0e0e0" />
    <text x="16" y="21" textAnchor="middle" fill="#ea4335" fontSize="7" fontWeight="bold">PDF</text>
  </svg>
);

export const SocketIoIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#010101" />
    <path d="M17.5 7L10 17h5l-1.5 8L22 15h-5.5l1-8z" fill="#ffffff" />
  </svg>
);

