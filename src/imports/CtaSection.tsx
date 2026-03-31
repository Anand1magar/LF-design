function Text() {
  return (
    <div className="absolute content-stretch flex h-[67px] items-start left-[266.89px] top-[56.47px] w-[245.391px]" data-name="Text">
      <p className="bg-clip-text font-['Figtree:Medium',sans-serif] font-medium leading-[60.48px] relative shrink-0 text-[56px] text-[transparent] tracking-[-1.5px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(26, 26, 26) 0%, rgb(26, 26, 26) 100%), linear-gradient(176.476deg, rgb(255, 107, 53) 7.4906%, rgb(255, 69, 0) 92.509%)" }}>
        innovative
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[120.938px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Figtree:Medium',sans-serif] font-medium leading-[60.48px] left-0 text-[#1a1a1a] text-[56px] top-[-1px] tracking-[-1.5px]">{`Let's make`}</p>
      <p className="absolute font-['Figtree:Medium',sans-serif] font-medium leading-[60.48px] left-0 text-[#1a1a1a] text-[56px] top-[59.47px] tracking-[-1.5px]">{`something `}</p>
      <Text />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[26px] relative shrink-0 w-[380px]" data-name="Paragraph">
      <p className="absolute font-['Figtree:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#555] text-[16px] top-[-1px]">Kick start a project with us today</p>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex items-center justify-center px-[24px] py-[11px] relative rounded-[33554400px] shrink-0" data-name="Link">
      <p className="font-['Figtree:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] tracking-[-0.35px]">Schedule a Call</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Heading />
      <Paragraph />
      <Link />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[160px] py-[180px] relative w-full">
        <Frame />
      </div>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#dfdfdf] h-[598.938px] shrink-0 w-[787px]" data-name="Container" />;
}

export default function CtaSection() {
  return (
    <div className="bg-[#f6f4f0] content-stretch flex items-start relative size-full" data-name="CTA section">
      <Container />
      <Container1 />
    </div>
  );
}