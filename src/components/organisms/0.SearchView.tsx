"use client"

import React, { useEffect, useState } from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";
import ResultsTable from "../molecules/5.ResultsTable";
import LoadingWheel from "../atoms/1.LoadingWheel";

const tableNames = ["departamento", "municipio", "vivienda", "persona",];

export interface Table {
  headers: Array<{ name: string, type: string, modifiable: boolean}>;
  data: Array<{ [key: string | number]: string | number | Date }>;  // Cada entrada en `data` tiene claves de tipo string y valores que pueden ser string, number o Date.
}

async function getTable(table: string): Promise<Table> {

  try {
    const response = await fetch(`/api/${table}`);
    
    if (response.ok) {
      const data = await response.json(); // Esto convierte la respuesta a un objeto JavaScript
      return {
        headers: data.headers,
        data: data.data,
      };
    } else {
      console.error('Error al obtener los datos:', response.statusText);
      return {
        headers: [],
        data: [],
      };
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {
      headers: [],
      data: [],
    };
  }

};

export default function SearchView() {
  const defaultTable: Table = {
    headers: [],
    data: [],
  };
  
  const [tableName, setTableName] = useState<string>(tableNames[0]);
  const [tableData, setTableData] = useState<Table | null>(defaultTable);
  const [isLoading, setLoading] = useState(false)

  // Hacer la búsqueda a la BD ahora que se cambió de pestaña
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);    
      const t = await getTable(tableName);
      setTableData(t);
      setLoading(false);      
    }
    
    fetchData();

  }, [tableName])

  return (
    <>
      <div className="h-[63vh]">
        <SelectorBar botones={tableNames} clickFunction={setTableName} activeTable={tableName}/>
        <div className="max-w relative z-30 w-full bg-white shadow-lg">
          <div className="flex justify-center px-3 pt-3">
            <SearchBar headers={tableData?.headers} />
          </div>
          <div className="p-4">
            {/* Aquí va el contenido de la búsqueda */}
              <ResultsTable tableData={tableData}/>
          </div>
        </div>
      </div>
      {isLoading && <LoadingWheel />}
    </>
  );
}
