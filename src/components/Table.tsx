import React, { useState, useMemo, useRef, useCallback } from "react";
import { makeData, makePets } from '../utilities/makeData';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

//styles
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const Table = () => {
  const gridRef = useRef<any>();
  const [rowData] = useState(makeData(250000));
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
      filter: false,
      editable: false,
      rowDrag: true,
      cellRenderer: "agGroupCellRenderer",
    },
    {
      field: "name",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agTextColumnFilter",
          },
        ],
      },
    },
    {
      field: "age",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agNumberColumnFilter",
          },
        ],
      },
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

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "id" },
          { field: "name", minWidth: 150 },
          { field: "age" },
          { field: "animal", minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params:any) => {
        // simulate delayed supply of data to the detail pane
        setTimeout(function () {
          params.successCallback(makePets(6));
        }, 1000);
      },
    };
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
      flex: 1,
      minWidth: 200,
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
    <div
      className="ag-theme-alpine"
      style={{ height: "80vh", width: "80%", margin: "40px auto" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowGroupPanelShow="always"
        sideBar={sideBar}
        editType={"fullRow"}
        onRowValueChanged={onRowValueChanged}
        rowDragManaged={true}
        detailCellRendererParams={detailCellRendererParams}
        masterDetail={true}
      ></AgGridReact>
    </div>
  );
};

export default Table;
