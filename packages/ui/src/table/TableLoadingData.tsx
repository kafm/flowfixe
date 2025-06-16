import { range } from "@flowfixe/common";
export const TableLoadingCells = ({ numCells }: { numCells: number }) => {
  return (
    <>
      {range(numCells).map((i) => (
        <div key={i}>
          <div className="ff-loading-cell">
            <div className="ff-loading-cell-bar"></div>
          </div>
        </div>
      ))}
    </>
  );
};
