import imgItemImage2PfvybLspq8TPAwvcGFmcXqzcUPng from "figma:asset/178f7216a82be74a8009132bf401cdbe519ee8c1.png";
import imgItemImage3DnDPhom637Fu8YzDrg93GyfjAPng from "figma:asset/fb126bc1a37962deea6d301aa9d5ca6d1ec883a5.png";
import imgItemImage1ObOlFzr4HytfFf3Ho5C1QwYBpU8Png from "figma:asset/73a2d6ea6382e3982394d6c9220f6b8295dfbff8.png";

function Helper() {
  return <div className="h-px opacity-0 shrink-0 w-[480px]" data-name="Helper" />;
}

function ItemImage2PfvybLspq8TPAwvcGFmcXqzcUPng() {
  return (
    <div className="h-full relative rounded-[16px] shrink-0 w-[960px]" data-name="Item → Image#2 → PFVYBLspq8tPAwvcGFmcXqzcU.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute h-[103.47%] left-0 max-w-none top-[-1.73%] w-full" src={imgItemImage2PfvybLspq8TPAwvcGFmcXqzcUPng} />
      </div>
    </div>
  );
}

function ItemImage3DnDPhom637Fu8YzDrg93GyfjAPng() {
  return (
    <div className="h-full relative rounded-[16px] shrink-0 w-[960px]" data-name="Item → Image#3 → DnDPhom637FU8YzDRG93GyfjA.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute h-[139.09%] left-0 max-w-none top-[-19.55%] w-full" src={imgItemImage3DnDPhom637Fu8YzDrg93GyfjAPng} />
      </div>
    </div>
  );
}

function ItemImage1ObOlFzr4HytfFf3Ho5C1QwYBpU8Png() {
  return (
    <div className="h-full relative rounded-[16px] shrink-0 w-[960px]" data-name="Item → Image#1 → obOlFZR4hytfFF3Ho5c1qwYBpU8.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute h-[139.09%] left-0 max-w-none top-[-19.55%] w-full" src={imgItemImage1ObOlFzr4HytfFf3Ho5C1QwYBpU8Png} />
      </div>
    </div>
  );
}

function ItemImage2PfvybLspq8TPAwvcGFmcXqzcUPng1() {
  return (
    <div className="h-full relative rounded-[16px] shrink-0 w-[960px]" data-name="Item → Image#2 → PFVYBLspq8tPAwvcGFmcXqzcU.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute h-[103.47%] left-0 max-w-none top-[-1.73%] w-full" src={imgItemImage2PfvybLspq8TPAwvcGFmcXqzcUPng} />
      </div>
    </div>
  );
}

function ItemImage3DnDPhom637Fu8YzDrg93GyfjAPng1() {
  return (
    <div className="h-full relative rounded-[16px] shrink-0 w-[960px]" data-name="Item → Image#3 → DnDPhom637FU8YzDRG93GyfjA.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute h-[139.09%] left-0 max-w-none top-[-19.55%] w-full" src={imgItemImage3DnDPhom637Fu8YzDrg93GyfjAPng} />
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center justify-center min-h-px min-w-px pl-[964px] relative w-[5780px]" data-name="List">
      <ItemImage2PfvybLspq8TPAwvcGFmcXqzcUPng />
      <ItemImage3DnDPhom637Fu8YzDrg93GyfjAPng />
      <ItemImage1ObOlFzr4HytfFf3Ho5C1QwYBpU8Png />
      <ItemImage2PfvybLspq8TPAwvcGFmcXqzcUPng1 />
      <ItemImage3DnDPhom637Fu8YzDrg93GyfjAPng1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[520px] items-start justify-center left-[-2892px] top-0 w-[3852px]" data-name="Container">
      <List />
    </div>
  );
}

function Section() {
  return (
    <div className="h-[520px] relative shrink-0 w-full" data-name="Section">
      <Container1 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[520px] items-start justify-center relative shrink-0 w-[960px]" data-name="Container">
      <Section />
    </div>
  );
}

export default function BottomWrapper() {
  return (
    <div className="content-stretch flex items-end relative size-full" data-name="bottom-wrapper">
      <Helper />
      <Container />
    </div>
  );
}