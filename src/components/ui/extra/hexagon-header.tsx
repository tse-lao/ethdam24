"use client";



 
export const HexagonHeader = ({ hexColor }: {hexColor:string}) => {
// Assuming each side of the hexagon is "a"
// The length of a side of the hexagon
const a = 30;
// The width of the hexagon, which is 2 * the length of a side
const hexWidth = 2 * a;
// The height of the hexagon, calculated using the formula for the height of a regular hexagon
const hexHeight = Math.sqrt(3) * a;
// Number of rows and columns in your pattern
const rows = new Array(10).fill(null); // Adjust the number as needed
const cols = new Array(20).fill(null); // Adjust the number as needed

return (
  <div className="hexagon-pattern" style={{ lineHeight: 0 }}>
    {rows.map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex" style={{ marginTop: rowIndex % 2 ? -a * Math.sqrt(3) / 2 : 0 }}>
        {cols.map((_, colIndex) => (
          <svg
            key={`hex-${rowIndex}-${colIndex}`}
            width={hexWidth}
            height={hexHeight}
            viewBox={`0 0 ${hexWidth} ${hexHeight}`}
            style={{
              marginLeft: rowIndex % 2 ? a * 1.5 : 0,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={`M${a},${0} L${2 * a},${hexHeight / 2} L${a},${hexHeight} L${0},${hexHeight / 2} Z`}
              fill={hexColor}
              stroke="#DDDDDD"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>
    ))}
  </div>
);
};