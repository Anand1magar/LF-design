import svgPaths from "./svg-ssy6p3fhwh";
import imgImg from "figma:asset/df6d65f9b5f1653f87c3549babfe3beea6d4d38a.png";
import imgImg1 from "figma:asset/65dae3b7dea52847a7eda87800225ee336b0be96.png";
import imgImg2 from "figma:asset/d5d199d9acabc0227b45b45b0d4fc25fe9764a28.png";
import imgImg3 from "figma:asset/912a7532f86a753b2ac2f96e87ee7fb5cec94474.png";

function Frame() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="2109778876">
          <path d={svgPaths.pace6800} fill="var(--fill-0, black)" fillOpacity="0.3" id="tjlKcqq_S" />
          <path d={svgPaths.p365db980} id="Y_D97Q52v" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p37480b98} id="wf06kpyW8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pace6800} id="Wx0EkSCiK" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2decf400} id="Eesqcmrby" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.59px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[-0.32px] whitespace-nowrap">
        <p className="leading-[25.6px]">Who we are</p>
      </div>
    </div>
  );
}

function SectionName() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[88px]" data-name="section-name">
      <Container1 />
    </div>
  );
}

function Black() {
  return (
    <div className="content-stretch flex gap-[6px] h-[25.59px] items-center overflow-clip pb-px relative shrink-0 w-full" data-name="Black">
      <Frame />
      <SectionName />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[419px]" data-name="Container">
      <Black />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-medium gap-[30px] items-start leading-[0] relative shrink-0 w-full">
      <p className="font-['Figtree:Medium',sans-serif] font-['Figtree:Regular',sans-serif] font-normal relative shrink-0 text-[36px] text-black tracking-[-1px] w-full whitespace-pre-wrap">
        <span className="leading-[45px]">{`Our strength is the tight loop between `}</span>
        <span className="leading-[45px]">concept</span>
        <span className="leading-[45px]">{` and `}</span>
        <span className="leading-[45px]">code</span>
        <span className="leading-[45px]">
          {` — no hand-off gaps, just seamless builds. `}
          <br aria-hidden="true" />
          {`Our strength is the tight loop between `}
        </span>
        <span className="leading-[45px]">concept</span>
        <span className="leading-[45px]">{` and `}</span>
        <span className="leading-[45px]">code</span>
        <span className="leading-[45px]">{` no hand-off gaps, just seamless builds.`}</span>
      </p>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center not-italic relative shrink-0 text-[#7a7a7a] text-[20px] tracking-[-0.8px] w-full">
        <p className="leading-[26px] whitespace-pre-wrap">{`We’re more than a design agency. We’re  a team of thinkers, makers, and problem- solvers who believe in building brands that last.`}</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame2 />
    </div>
  );
}

function TopGrid() {
  return (
    <div className="content-stretch flex items-start max-w-[1190px] overflow-clip relative shrink-0 w-full" data-name="top-grid">
      <Container />
      <Frame1 />
    </div>
  );
}

function Img() {
  return (
    <div className="absolute left-0 size-[381.5px] top-0" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg} />
    </div>
  );
}

function Div() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] left-0 opacity-50 size-[381.5px] to-black top-0" data-name="div" />;
}

function Svg() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute bottom-[23.96%] left-1/2 right-1/2 top-[23.96%]" data-name="Vector">
        <div className="absolute inset-[-6%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 18.666">
            <path d="M1 1V17.666" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[23.96%] right-[23.96%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-6%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.666 2">
            <path d="M17.666 1H1" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[325.5px] size-[32px] top-[24px]" data-name="div">
      <Svg />
    </div>
  );
}

function P() {
  return (
    <div className="h-[30.797px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:SemiBold',sans-serif] font-semibold leading-[30.8px] left-0 text-[20px] text-white top-0 tracking-[-0.88px] whitespace-nowrap">Emma Carter</p>
    </div>
  );
}

function P1() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#e5e5e5] text-[16px] top-[-1px] tracking-[-0.8px] whitespace-nowrap">Creative Director</p>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56.797px] items-start left-[24px] top-[300.7px] w-[110.172px]" data-name="div">
      <P />
      <P1 />
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="overflow-clip relative rounded-[24px] shrink-0 size-[381.5px]" data-name="motion.div">
      <Img />
      <Div />
      <Div1 />
      <Div2 />
    </div>
  );
}

function Img1() {
  return (
    <div className="absolute left-0 size-[381.5px] top-0" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg1} />
    </div>
  );
}

function Div3() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] left-0 opacity-50 size-[381.5px] to-black top-0" data-name="div" />;
}

function Svg1() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute bottom-[23.96%] left-1/2 right-1/2 top-[23.96%]" data-name="Vector">
        <div className="absolute inset-[-6%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 18.666">
            <path d="M1 1V17.666" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[23.96%] right-[23.96%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-6%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.666 2">
            <path d="M17.666 1H1" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[325.5px] size-[32px] top-[24px]" data-name="div">
      <Svg1 />
    </div>
  );
}

function P2() {
  return (
    <div className="h-[30.797px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:SemiBold',sans-serif] font-semibold leading-[30.8px] left-0 text-[20px] text-white top-0 tracking-[-0.88px] whitespace-nowrap">Daniel Brooks</p>
    </div>
  );
}

function P3() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#e5e5e5] text-[16px] top-[-1px] tracking-[-0.8px] whitespace-nowrap">Head of Design</p>
    </div>
  );
}

function Div5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56.797px] items-start left-[24px] top-[300.7px] w-[112.172px]" data-name="div">
      <P2 />
      <P3 />
    </div>
  );
}

function MotionDiv1() {
  return (
    <div className="overflow-clip relative rounded-[24px] shrink-0 size-[381.5px]" data-name="motion.div">
      <Img1 />
      <Div3 />
      <Div4 />
      <Div5 />
    </div>
  );
}

function Img2() {
  return (
    <div className="absolute left-0 size-[381.5px] top-0" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg2} />
    </div>
  );
}

function Div6() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] left-0 opacity-50 size-[381.5px] to-black top-0" data-name="div" />;
}

function Svg2() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute bottom-[23.96%] left-1/2 right-1/2 top-[23.96%]" data-name="Vector">
        <div className="absolute inset-[-6%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 18.666">
            <path d="M1 1V17.666" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[23.96%] right-[23.96%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-6%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.666 2">
            <path d="M17.666 1H1" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Div7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[325.5px] size-[32px] top-[24px]" data-name="div">
      <Svg2 />
    </div>
  );
}

function P4() {
  return (
    <div className="h-[30.797px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:SemiBold',sans-serif] font-semibold leading-[30.8px] left-0 text-[20px] text-white top-0 tracking-[-0.88px] whitespace-nowrap">Sophie Turner</p>
    </div>
  );
}

function P5() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#e5e5e5] text-[16px] top-[-1px] tracking-[-0.8px] whitespace-nowrap">Brand Strategist</p>
    </div>
  );
}

function Div8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56.797px] items-start left-[24px] top-[300.7px] w-[115.172px]" data-name="div">
      <P4 />
      <P5 />
    </div>
  );
}

function MotionDiv2() {
  return (
    <div className="overflow-clip relative rounded-[24px] shrink-0 size-[381.5px]" data-name="motion.div">
      <Img2 />
      <Div6 />
      <Div7 />
      <Div8 />
    </div>
  );
}

function Img3() {
  return (
    <div className="absolute left-0 size-[381.5px] top-0" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg3} />
    </div>
  );
}

function Div9() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] left-0 opacity-50 size-[381.5px] to-black top-0" data-name="div" />;
}

function Svg3() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute bottom-[23.96%] left-1/2 right-1/2 top-[23.96%]" data-name="Vector">
        <div className="absolute inset-[-6%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 18.666">
            <path d="M1 1V17.666" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[23.96%] right-[23.96%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-6%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.666 2">
            <path d="M17.666 1H1" id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[325.5px] size-[32px] top-[24px]" data-name="div">
      <Svg3 />
    </div>
  );
}

function P6() {
  return (
    <div className="h-[30.797px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:SemiBold',sans-serif] font-semibold leading-[30.8px] left-0 text-[20px] text-white top-0 tracking-[-0.88px] whitespace-nowrap">Liam Hayes</p>
    </div>
  );
}

function P7() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Figtree:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#e5e5e5] text-[16px] top-[-1px] tracking-[-0.8px] whitespace-nowrap">Lead Developer</p>
    </div>
  );
}

function Div11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56.797px] items-start left-[24px] top-[300.7px] w-[100.125px]" data-name="div">
      <P6 />
      <P7 />
    </div>
  );
}

function MotionDiv3() {
  return (
    <div className="overflow-clip relative rounded-[24px] shrink-0 size-[381.5px]" data-name="motion.div">
      <Img3 />
      <Div9 />
      <Div10 />
      <Div11 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-[1528px]">
      <MotionDiv />
      <MotionDiv1 />
      <MotionDiv2 />
      <MotionDiv3 />
    </div>
  );
}

export default function Process() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[96px] items-center justify-center px-[240px] py-[180px] relative size-full" data-name="Process">
      <TopGrid />
      <Frame3 />
    </div>
  );
}