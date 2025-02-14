import React from "react";

interface VectorProps {
  // src prop is a React component that renders an SVG
  src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  fill?: string;
  stroke?: string;
  width?: number | string;
  height?: number | string;
  testId?: string;
}

const Vector: React.FC<VectorProps> = ({
  src: SvgComponent,
  fill,
  stroke,
  width = "20px",
  height = "20px",
  testId,
}) => {
  return (
    <div className={`inline-block`} style={{ width, height }} data-testid={testId}>
      {/* SvgComponent is a React component that renders an SVG */}
      <SvgComponent style={{ fill, stroke }} width={width} height={height} />
    </div>
  );
};

export default Vector;
