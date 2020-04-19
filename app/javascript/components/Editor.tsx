import React, { useState } from "react";
import { times } from "ramda";
import { CirclePicker } from "react-color";
import defaultFrame from "./defaultFrame";
import blankFrame from "./blankFrame";

const width = 48;
const height = 6;

const colors = [
  "#ff4336",
  "#FC429B",
  "#a55eea",
  "#008EFF",
  "#34e7e4",
  "#4cf137",
  "#ffeb3b",
  "#ff9800",
  "#ffffff",
  "#aaaaaa",
  "#555555",
  "#000000",
];

export default ({ data, readonly }) => {
  const [color, setColor] = useState("#ff4336");
  const [frame, setFrame] = useState(data ? JSON.parse(data) : defaultFrame);

  const indexForPosition = (column, row) => {
    return width * row + column;
  };

  const colorForPosition = (column, row) => {
    return frame[indexForPosition(column, row)];
  };

  const paint = (column, row) => {
    const nextFrame = [...frame];
    nextFrame[indexForPosition(column, row)] = color;
    setFrame(nextFrame);
  };

  const renderPixel = (column, row) => {
    return (
      <div
        className="cursor-pointer"
        style={{ flex: 1, padding: 2, paddingTop: "1%", paddingBottom: "1%" }}
        onClick={() => paint(column, row)}
        onMouseEnter={(event) => {
          if (event.buttons) paint(column, row);
        }}
      >
        <div
          className="rounded-sm"
          style={{
            width: "100%",
            paddingTop: "100%",
            backgroundColor: colorForPosition(column, row),
          }}
        />
      </div>
    );
  };

  const renderRow = (row) => {
    return (
      <div className="flex">
        {times((column) => renderPixel(column, row), width)}
      </div>
    );
  };

  return (
    <div>
      {times(renderRow, height)}

      {!readonly && (
        <div>
          <input
            type="hidden"
            value={JSON.stringify(frame)}
            name="frame[data]"
          />

          <div className="flex justify-center">
            <div className="text-center">
              <button
                className="text-white m-5 cursor-pointer"
                onClick={() => {
                  if (readonly) return;
                  const result = confirm("Are you sure you want to reset?");
                  if (result) setFrame(blankFrame);
                }}
              >
                Reset
              </button>
              <CirclePicker
                color={color}
                colors={colors}
                onChangeComplete={({ hex }) => setColor(hex)}
              />

              <div className="mt-5 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="frame[credit]"
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="Add your name (optional)"
                />
              </div>

              <input
                type="submit"
                className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
