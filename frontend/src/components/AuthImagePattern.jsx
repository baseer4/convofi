import { useEffect, useState } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [bubbles, setBubbles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBubbles(true);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative">
      <div className="max-w-md text-center relative">
        {/* Container for bubbles */}
        <div className="relative h-[60vh] flex items-end justify-center">
          <div className="absolute top-0 left-0 flex gap-3 mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square w-16 h-16 rounded-2xl bg-primary/10 transition-all duration-1000 ease-in-out transform ${
                  !bubbles
                    ? `animate-fall-left-${i}`
                    : `transform translate-y-0 scale-100 opacity-100`
                }`}
                style={{
                  animationDuration: "1s",
                  animationDelay: `${i * 0.2}s`,
                  animationName: !bubbles
                    ? `fall-left-${i}`
                    : "none",
                }}
              />
            ))}
          </div>
          <div className="absolute top-0 right-0 flex gap-3 mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square w-16 h-16 rounded-2xl bg-primary/10 transition-all duration-1000 ease-in-out transform ${
                  !bubbles
                    ? `animate-fall-right-${i}`
                    : `transform translate-y-0 scale-100 opacity-100`
                }`}
                style={{
                  animationDuration: "1s",
                  animationDelay: `${i * 0.2}s`,
                  animationName: !bubbles
                    ? `fall-right-${i}`
                    : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>

     
    </div>
  );
};

export default AuthImagePattern;
