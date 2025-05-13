import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const VideoBanner = () => {
  const videos = [
    '/videos/bannerVideo1.mp4',
    '/videos/bannerVideo2.mp4'
  ];
  
  const videoRefs = [useRef(null), useRef(null)];
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Preload videos and hide loader when ready
  useEffect(() => {
    let loadedCount = 0;
    
    const checkLoadStatus = () => {
      loadedCount++;
      if (loadedCount >= videos.length) {
        setIsLoading(false);
      }
    };

    videos.forEach((src, index) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.onloadeddata = checkLoadStatus;
      video.onerror = checkLoadStatus; // Count as loaded even if error occurs
    });
  }, []);

  // Handle smooth transitions
  useEffect(() => {
    if (isLoading) return;

    const currentVideo = videoRefs[activeIndex].current;
    if (!currentVideo) return;

    const handleEnded = () => {
      setIsTransitioning(true);
      const nextVideoIndex = (activeIndex + 1) % videos.length;
      setNextIndex(nextVideoIndex);
      
      // Show loader briefly during transition
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setActiveIndex(nextVideoIndex);
        setIsTransitioning(false);
      }, 500); // Match this duration with your CSS transition
    };

    currentVideo.addEventListener('ended', handleEnded);
    return () => currentVideo.removeEventListener('ended', handleEnded);
  }, [activeIndex, isLoading]);

  // Auto-play handling
  useEffect(() => {
    if (isLoading) return;

    const playVideo = async (video) => {
      try {
        if (video && video.readyState > 2) {
          await video.play().catch(e => console.debug('Autoplay prevented'));
        }
      } catch (err) {
        console.warn('Video play error:', err);
      }
    };

    videoRefs.forEach(ref => {
      if (ref.current) {
        playVideo(ref.current);
      }
    });
  }, [activeIndex, isLoading]);

  return (
    <div className="banner-container">
      {/* Loader Container - Only shows when isLoading is true */}
      {isLoading && (
        <div className='loader-container'>
          <span className="loader"></span>
        </div>
      )}

      {/* Dual Video Elements */}
      {videoRefs.map((ref, index) => (
        <video
          key={`video-${index}`}
          ref={ref}
          muted
          playsInline
          className={`video-layer ${
            index === activeIndex ? 'active' : 
            (index === nextIndex && isTransitioning) ? 'next' : 'hidden'
          }`}
          src={videos[index]}
        />
      ))}

      {/* Content Overlay */}
      {/* <div className="banner-content">
        <h1>Modern Living Room</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <Link href="/collection">
          <button className="shop-button">SHOP NOW</button>
        </Link>
      </div> */}

      {/* CSS Styles */}
      <style jsx>{`
        .banner-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        
     
        
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .video-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease-in-out;
        }
        
        .video-layer.active {
          opacity: 1;
          z-index: 1;
        }
        
        .video-layer.next {
          opacity: 1;
          z-index: 2;
        }
        
        .video-layer.hidden {
          opacity: 0;
          z-index: 0;
        }
        
        .banner-content {
          position: relative;
          z-index: 3;
          color: white;
          text-align: center;
          padding-top: 20vh;
        }
      `}</style>
    </div>
  );
};

export default VideoBanner;