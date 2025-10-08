const HeroDotsRect = () => {
  return (
    <div
      className="absolute top-[-200px] left-[976px] w-[68px] h-[92px] transform rotate-[-81.92deg] bg-transparent"
    >
      <div className="grid grid-cols-5 grid-rows-6 gap-[12px] w-full h-full">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="w-[4px] h-[4px] rounded-full bg-[#E2E8F0]"></span>
          
        ))}
      </div>
    </div>
  );
};

export default HeroDotsRect;
