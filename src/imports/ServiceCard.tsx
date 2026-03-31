function Frame5() {
  return (
    <div className="content-stretch flex flex-col font-normal h-[83px] items-start relative shrink-0 text-[#1a1a1a] w-full whitespace-pre-wrap">
      <p className="font-['Syne:Regular',sans-serif] leading-[47.693px] relative shrink-0 text-[32px] tracking-[-1px] w-full">Visual Branding</p>
      <p className="font-['Inter:Regular',sans-serif] leading-[23px] not-italic opacity-76 relative shrink-0 text-[16px] w-full">{`Launch a project crafted for resonance. `}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-start justify-between py-[12px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.3)] border-b-[0.795px] border-dashed inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Figtree:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px opacity-78 relative text-[16px] text-black whitespace-pre-wrap">Brand Strategy</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start justify-between py-[12px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.3)] border-b-[0.795px] border-dashed inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Figtree:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px opacity-78 relative text-[16px] text-black whitespace-pre-wrap">AI Powered Brand Identity Guidelines and Assets</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start justify-between py-[12px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.3)] border-b-[0.795px] border-dashed inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Figtree:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px opacity-78 relative text-[16px] text-black whitespace-pre-wrap">Web Design and Development</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame />
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame1 />
    </div>
  );
}

function Frame6() {
  return <div className="bg-[#c5c5c5] h-[223px] rounded-[4px] shrink-0 w-full" />;
}

export default function ServiceCard() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-start justify-center overflow-clip px-[28px] py-[33px] relative rounded-[18px] shadow-[0px_4px_75.3px_0px_rgba(0,0,0,0.04)] size-full" data-name="service card">
      <Frame3 />
      <Frame6 />
    </div>
  );
}