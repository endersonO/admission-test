import React from "react";
import EnhancedTable from "../components/Table";
import { useNavigate } from "react-router-dom";
let countHome = 0;
let tableInfo = [];

export default function Home(props) {
  const { tableRows } = props;

  if (tableRows.length > 90 && countHome === 0) {
    console.log("llenar table info")
    tableInfo = [...tableRows]
    countHome++
  }

  const navigate = useNavigate();

  const handleEditButton = (row) => (e) => {
    e.stopPropagation();
    const {
      html_image,
      html_types,
      html_my_sprite,
      html_my_types,
      html_my_teammates,
      ...params
    } = row;
    // ! NAVIGATE NOT ACCEPT HTML PARAMS
    navigate(`form/${row.name}`, {
      state: { ...params },
    });
  };

/*   console.log("home", tableRows)
  console.log("home info", tableInfo)
  console.log("length home",tableRows.length) */

  return (
    <div>
      {tableInfo.length > 0 ? (
        <EnhancedTable
          rowsProp={tableInfo}
          handleEditButton={handleEditButton}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
