import React from 'react';

const About2 = () => {
  return (
    <section className="relative w-full overflow-hidden  bg-white">
      <div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 'clamp(480px, 55vw, 800px)',
        }}
      >
        {/* Background Image with Wave Mask */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/images/about4.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitMaskImage: `url('/images/mask4.svg')`,
            maskImage: `url('/images/mask4.svg')`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            WebkitMaskImage: `url('/images/mask4.svg')`,
            maskImage: `url('/images/mask4.svg')`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 py-16 sm:py-20 md:py-28 lg:py-40">
          <h2 className="text-[#FAA821] text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl mb-12 sm:mb-8">
            Harness Zipline<br className="hidden sm:block" />
            and Adventure Resort!
          </h2>
          <p className="text-white text-[1.05rem] sm:text-lg md:text-2xl max-w-3xl leading-relaxed drop-shadow-md">
            Our story, our journey: zipline through treetops, then unwind in
            Nepal's first igloo rooms—adventure meets comfort. Your luxury
            escape awaits. Come for the thrill, stay for the magic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About2;