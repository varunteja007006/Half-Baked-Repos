"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function ChessBoard() {
  const chessBoard = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  const [hoverPoints, setHoverPoints] = React.useState<[number, number] | []>(
    []
  );

  const handleOnHover = (rowIndex: number, colIndex: number) => {
    setHoverPoints([rowIndex, colIndex]);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 50px)",
        border: "1px solid black",
        width: "fit-content",
      }}
      onMouseLeave={() => setHoverPoints([])}
    >
      {chessBoard.map((row, rowIndex) =>
        row.map((_, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 0;
          const [hoveredRow, hoveredCol] = hoverPoints;
          const hovered = hoveredRow === rowIndex && hoveredCol === colIndex;

          if (!hoveredRow && !hoveredCol) {
          }

          let bishopPath =
            Math.abs(rowIndex - hoveredRow!) ===
            Math.abs(colIndex - hoveredCol!);

          return (
            <div
              style={{
                width: "50px",
                height: "50px",
                background: hovered
                  ? "red"
                  : bishopPath
                  ? "#6366f1"
                  : isDark
                  ? "black"
                  : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isDark ? "white" : "black",
                cursor: "pointer",
              }}
              key={`${rowIndex}-${colIndex}`}
              onMouseEnter={() => handleOnHover(rowIndex, colIndex)}
            >
              {rowIndex + 1}
              {colIndex + 1}
            </div>
          );
        })
      )}
    </div>
  );
}
