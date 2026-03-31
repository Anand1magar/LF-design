function Frame() {
  return <div className="bg-[#88b36a] flex-[1_0_0] min-h-px min-w-px w-full" />;
}

function Frame1() {
  return <div className="bg-[#599f38] flex-[1_0_0] min-h-px min-w-px w-full" />;
}

function Frame2() {
  return <div className="bg-[#2d7f0d] flex-[1_0_0] min-h-px min-w-px w-full" />;
}

function Frame3() {
  return <div className="bg-[#086600] flex-[1_0_0] min-h-px min-w-px w-full" />;
}

export default function AboveFooteElesticDivider() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="above foote elestic divider">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}