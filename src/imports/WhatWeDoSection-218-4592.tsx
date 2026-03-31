import svgPaths from "./svg-zzzst94n87";

function TdesignArrowRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="tdesign:arrow-right">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="tdesign:arrow-right">
          <path d={svgPaths.p2f980a80} id="Vector" stroke="var(--stroke-0, #87D032)" strokeLinecap="square" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <p className="font-['Figtree:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#87d032] text-[14px] tracking-[-0.1px] whitespace-pre">{`LET’S  BUILD THE FUTURE TOGETHER, WITH INTENT`}</p>
      <TdesignArrowRight />
    </div>
  );
}

function Frame1() {
  return (
    <div className="max-w-[900px] relative shrink-0 w-[900px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[22px] items-start max-w-[inherit] relative w-full">
        <p className="font-['Figtree:Light',sans-serif] font-light h-[192px] leading-[48px] relative shrink-0 text-[#333] text-[32px] tracking-[-0.1px] w-full">We provide the single, sophisticated creative engine your product needs to stand apart. We design high-conversion experiences that translate complex requirements into seamless digital journeys.</p>
        <Frame />
      </div>
    </div>
  );
}

export default function WhatWeDoSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center px-[298px] py-[160px] relative size-full" data-name="what we do section">
      <Frame1 />
    </div>
  );
}