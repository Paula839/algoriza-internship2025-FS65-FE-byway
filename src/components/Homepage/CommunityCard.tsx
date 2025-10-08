interface CommunityCardProps {
  avatars: string[]; 
  text: string;
  top: number;
  left: number;
}

const CommunityCard = ({ avatars, text, top, left }: CommunityCardProps) => {
  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg"
      style={{
        width: "167px",
        height: "104px",
        top: `${top}px`,
        left: `${left}px`,
        boxShadow: "0px 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      <div className="flex flex-row items-center absolute" style={{ top: "12px", left: "12px" }}>
        {avatars.map((avatar, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"
            style={{
              marginLeft: i === 0 ? 0 : "-15px",
              filter: "drop-shadow(-1px 0px 2px rgba(0,0,0,0.12))",
            }}
          >
            <img src={avatar} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div
        className="absolute font-inter font-semibold text-[12px] leading-[15px] text-[#0F172A]"
        style={{ top: "62px", left: "12px", width: "143px" }}
      >
        {text}
      </div>
    </div>
  );
};

export default CommunityCard;
