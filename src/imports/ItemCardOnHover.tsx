import svgPaths from "./svg-7tpy7wy2y6";
import imgMockup21 from "figma:asset/6344a2742e01c5662fe0e4e13522e4812f6b4628.png";

function AppScreens() {
  return (
    <div className="absolute bg-[#c56441] left-0 rounded-[17.205px] size-[914.038px] top-[-229.96px]" data-name="App_screens">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[625.929px] left-[-24.67px] top-[216.51px] w-[938.53px]" data-name="Mockup 2 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMockup21} />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col h-[611px] items-start justify-between left-1/2 pl-[26.916px] pt-[26.916px] top-0 w-[899.458px]" data-name="Card">
      <AppScreens />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#1a1a1a] h-[546.797px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Card />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex font-['Figtree:Medium',sans-serif] font-medium gap-[4px] items-start leading-[36px] relative shrink-0 text-[#333] text-[24px] tracking-[-0.75px]">
      <p className="relative shrink-0">Antaranga.ai</p>
      <p className="opacity-34 relative shrink-0">CaseStuides</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
        <Frame1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-[25px] relative rounded-[33554400px] shrink-0 w-[110px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Figtree:Regular',sans-serif] font-normal leading-[15px] left-[13px] overflow-hidden text-[10px] text-ellipsis text-white top-[5px] tracking-[1px] uppercase">Case studies</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1dd99a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p14d5a980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[754px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Text />
        <Button />
      </div>
    </div>
  );
}

function AntarangLogo() {
  return (
    <div className="absolute inset-[44.24%_46.26%_44.19%_46.27%]" data-name="Antarang_logo">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 60.0784 63.2761">
        <g id="Antarang_logo">
          <g id="Group">
            <path d={svgPaths.p25199280} fill="var(--fill-0, white)" id="Vector" />
            <path d={svgPaths.p21e3c670} fill="var(--fill-0, white)" id="Vector_2" />
          </g>
          <path d={svgPaths.p29e48780} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function OverlayTagLayer() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute backdrop-blur-[15px] bg-[rgba(170,83,17,0.13)] content-stretch flex flex-col h-[547px] items-start justify-between left-1/2 pl-[24px] pt-[24px] rounded-[6px] top-[calc(50%-24.9px)] w-[804px]" data-name="overlay tag layer">
      <Container1 />
      <AntarangLogo />
    </div>
  );
}

export default function ItemCardOnHover() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-center relative size-full" data-name="Item card - onHover">
      <Container />
      <Frame />
      <OverlayTagLayer />
    </div>
  );
}