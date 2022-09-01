import React, { useState, useMemo, useRef, useCallback } from "react";
import { makeData } from "../utilities/makeData";

import { AgGridReact } from "ag-grid-react";

//styles
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const FreeTable = () => {
  const gridRef = useRef<any>();
  const [rowData] = useState(makeData(100000));
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", filter: false, editable: false, rowDrag: true },
    {
      field: "name",
      filter: "agTextColumnFilter",
    },
    {
      field: "age",
      filter: "agNumberColumnFilter",
    },
    {
      field: "gender",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["female", "male"],
      },
    },
    {
      field: "isWorking",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [true, false],
      },
    },
    {
      field: "country",
      filterParams: {
        filters: [
          {
            filter: "agTextColumnFilter",
          },
        ],
      },
    },
  ]);

  const onRowValueChanged = useCallback((event: any) => {
    var data = event.data;
    console.log(data);
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
      flex: 1,
      resizable: true,
      menuTabs: ["filterMenuTab"],
      editable: true,
    }),
    []
  );

  const sideBar = useMemo(() => {
    return {
      toolPanels: ["filters"],
    };
  }, []);

  return (
    <div className="ag-theme-alpine"  style={{ height: "80vh", width: "80%", margin: "40px auto" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        editType={"fullRow"}
        onRowValueChanged={onRowValueChanged}
        rowDragManaged={true}
      ></AgGridReact>
    </div>
  );
};

export default FreeTable;
