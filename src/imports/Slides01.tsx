import imgImage261 from "figma:asset/9e9883e10bfa0a4716f23af030b659806d17d3d8.png";

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Figtree:Light',sans-serif] font-light gap-[12px] items-start left-[64px] top-[58px] w-[460px] whitespace-pre-wrap">
      <p className="leading-[0] min-w-full relative shrink-0 text-[#fefaf2] text-[0px] text-[32px] tracking-[-0.96px] w-[min-content]">
        <span className="font-['Figtree:Regular',sans-serif] font-normal leading-[normal] text-[#111]">{`We are `}</span>
        <span className="font-['Figtree:SemiBold',sans-serif] font-semibold leading-[normal] text-[#87d032]">8x</span>
        <span className="font-['Figtree:Bold',sans-serif] font-bold leading-[normal] text-[#87d032]">{` `}</span>
        <span className="font-['Figtree:Regular',sans-serif] font-normal leading-[normal] text-[#111]">{`faster in character generation, storyboarding & short animations`}</span>
      </p>
      <p className="leading-[21px] opacity-80 relative shrink-0 text-[#333] text-[16px] w-[403px]">We leverage AI throughout our design process to streamline workflows, allowing our team to focus on strategic thinking and creative execution.</p>
    </div>
  );
}

export default function Slides() {
  return (
    <div className="bg-[#f9f9f9] overflow-clip relative rounded-[20px] size-full" data-name="slides 01">
      <div className="absolute h-[513.5px] left-[252px] top-[105px] w-[883px]" data-name="image 261">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage261} />
      </div>
      <Frame />
    </div>
  );
}