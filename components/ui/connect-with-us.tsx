"use client"

import React, { useState } from 'react';
import { Facebook, Youtube, Instagram, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialConnectProps {
  isDark?: boolean;
}

export const SocialConnect = ({ isDark = true }: SocialConnectProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 py-16 font-sans w-full">
      <div className="w-full max-w-3xl mx-auto text-center mb-10">
        <h2 className={cn("font-display text-4xl md:text-5xl font-bold mb-4", isDark ? "text-white" : "text-[#1b2a67]")}>
          Conecta <span className={cn(isDark ? "text-[#e4cf8d]" : "text-primary")}>Conmigo</span>
        </h2>
        <p className={cn("text-lg max-w-2xl mx-auto", isDark ? "text-[#d7dcff]" : "text-[#50608e]")}>
          Únete a nuestra comunidad y mantente al tanto de los últimos mensajes, eventos y contenido exclusivo.
        </p>
      </div>
      
      <div className="relative w-full max-w-2xl">
        {/* 3D Glowing Container */}
        <div 
          className={cn(
            "rounded-[2rem] border overflow-hidden p-6 sm:p-8",
            isDark 
              ? "bg-[#0b165f]/80 border-primary/20 backdrop-blur-3xl shadow-[0_0_40px_rgba(36,59,130,0.4)]"
              : "bg-white/90 border-[#cdd9fa] backdrop-blur-3xl shadow-[0_0_40px_rgba(76,114,255,0.15)]"
          )}
        >
          <div className="grid grid-cols-4 justify-items-center gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
            <a href="https://www.facebook.com/Alfonso.Aponte.TRV/" target="_blank" rel="noreferrer" className="social-icon facebook">
              <div className={cn("icon-container", !isDark && "light-mode")}>
                <Facebook className={cn("h-8 w-8", isDark ? "text-white" : "text-[#1b2a67]")} />
              </div>
              <span className={cn("icon-label", isDark ? "text-white" : "text-[#1b2a67]")}>Facebook</span>
            </a>
            
            <a href="https://www.youtube.com/@dralfonsoaponte" target="_blank" rel="noreferrer" className="social-icon youtube">
              <div className={cn("icon-container", !isDark && "light-mode")}>
                <Youtube className={cn("h-8 w-8", isDark ? "text-white" : "text-[#1b2a67]")} />
              </div>
              <span className={cn("icon-label", isDark ? "text-white" : "text-[#1b2a67]")}>YouTube</span>
            </a>
            
            <a href="https://instagram.com/alfonsoaponte" target="_blank" rel="noreferrer" className="social-icon instagram">
              <div className={cn("icon-container", !isDark && "light-mode")}>
                <Instagram className={cn("h-8 w-8", isDark ? "text-white" : "text-[#1b2a67]")} />
              </div>
              <span className={cn("icon-label", isDark ? "text-white" : "text-[#1b2a67]")}>Instagram</span>
            </a>
            
            <a href="mailto:dralfonsoaponte@gmail.com" className="social-icon email">
              <div className={cn("icon-container", !isDark && "light-mode")}>
                <Mail className={cn("h-8 w-8", isDark ? "text-white" : "text-[#1b2a67]")} />
              </div>
              <span className={cn("icon-label", isDark ? "text-white" : "text-[#1b2a67]")}>Email</span>
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .social-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          z-index: 1;
          -webkit-tap-highlight-color: transparent;
        }
        
        .icon-container {
          display: inline-flex;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          transition:
            transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
            background 250ms ease,
            box-shadow 250ms ease;
          position: relative;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .icon-container.light-mode {
          background: rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 24px rgba(36, 59, 130, 0.1);
          border: 1px solid rgba(76, 114, 255, 0.2);
        }
        
        .icon-container.light-mode svg {
          color: white !important;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-5px) rotate(-5deg); }
          40% { transform: translateX(5px) rotate(5deg); }
          60% { transform: translateX(-5px) rotate(-5deg); }
          80% { transform: translateX(5px) rotate(5deg); }
        }
        
        .icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .social-icon:active {
          transform: scale(0.94);
        }

        @media (max-width: 639px) {
          .icon-container {
            width: 64px;
            height: 64px;
          }
          .icon-label {
            font-size: 0.8rem;
          }
        }

        /* Hover effects only where a real pointer exists — on touch they stick */
        @media (hover: hover) and (pointer: fine) {
        .social-icon:hover .icon-container {
          transform: translateY(-10px) scale(1.1);
        }
        
        .social-icon:hover .icon-label {
          opacity: 1;
          transform: translateY(5px);
        }
        
        .icon-label {
          margin-top: 12px;
          font-weight: 500;
          opacity: 0.7;
          transition:
            opacity 250ms ease,
            transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .social-icon.instagram:hover .icon-container {
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          box-shadow: 0 0 20px rgba(225, 48, 108, 0.6);
        }
        .social-icon.instagram:hover .icon-container svg { color: white !important; }
        
        .social-icon.facebook:hover .icon-container {
          background: #1877f2;
          box-shadow: 0 0 20px rgba(24, 119, 242, 0.6);
        }
        .social-icon.facebook:hover .icon-container svg { color: white !important; }
        
        .social-icon.youtube:hover .icon-container {
          background: #ff0000;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
        }
        .social-icon.youtube:hover .icon-container svg { color: white !important; }
        
        .social-icon.email:hover .icon-container {
          background: #f1d16b;
          box-shadow: 0 0 20px rgba(241, 209, 107, 0.6);
        }
        .social-icon.email:hover .icon-container svg { color: #0b165f !important; }
        
        .social-icon:hover svg {
          animation: shake 0.5s;
        }
        
        .social-icon:hover .icon-container::before {
          opacity: 1;
        }
        }

        @media (prefers-reduced-motion: reduce) {
          .social-icon:hover svg {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
