import React, { useState, useEffect } from 'react';

const LazyLoadedImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px' } // Sesuaikan dengan kebutuhan Anda
    );

    observer.observe(document.getElementById(`image-${src}`));

    return () => observer.disconnect();
  }, [src]);

  return (
    <div id={`image-${src}`} style={{ height: '100px' }}>
      {isVisible && <img src={src} alt={alt} />}
    </div>
  );
};

export default LazyLoadedImage;
