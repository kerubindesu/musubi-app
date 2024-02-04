import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { TableSearch } from "../../molecules";
import { Button, HeadingTitle, Loading } from "../../atoms";

const TableResponsive = ({ isLoading, noFoundData, items, title, action, setKeyword }) => {
  const data = useMemo(() => (items ? [...items] : []), [items]);

  const columns = useMemo(
    () =>
      items && items.length > 0
        ? Object.keys(items[0]).map((key) => {
            if (key === "#")
              return {
                Header: key,
                accessor: key,
                Cell: ({ value }) => (
                  <>
                    <div className="text-center">{value}</div>
                  </>
                ),
              };
  
            return { Header: key, accessor: key };
          })
        : [],
    [items]
  );  

  const initialState = { hiddenColumns: ["id"] };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Action",
        Header: "",
        Cell: ({ row }) => (
          <div className="flex justify-center items-center gap-4">
            <Link to={`${row.values.id}/edit`}>
              <span className="py-1 px-2 text-emerald-500 hover:text-white bg-emerald-500/20 hover:bg-emerald-500/80 rounded-sm">Edit</span>
            </Link>
            <button
              value={row.values.id}
              onClick={(e) => action(e.target.value)}
              className="px-2 h-7 text-red-500 hover:text-white bg-red-500/20 hover:bg-red-500/80 rounded-sm"
            >
              Delete
            </button>
          </div>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      initialState,
      columns,
      data,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full flex flex-col items-start justify-center">
          <HeadingTitle text={title} variant={"text-xl"} />
        </div>
        <div className="w-full flex flex-row-reverse gap-4 justify-between items-center md:justify-start">
          <Link className={`${title === "Users" && "hidden"}`} to="add">
            <Button
              variant={"bg-sky-400 hover:bg-sky-500 rounded text-white"}
              text={title}
              icon={<MdOutlineDataSaverOn />}
            />
          </Link>
          <TableSearch
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={state.globalFilter}
            setKeyword={setKeyword}
          />
        </div>
      </div>
      <div className="mt-2 overflow-x-auto relative flex flex-col">
        {isLoading && isLoading?
        (
          <Loading text={true} />
        ):(
          <>
            {noFoundData && noFoundData? (
              <div className="p-4 w-full flex flex-col justify-center items-center">{noFoundData}</div>
            ):(
              <table
                {...getTableProps()}
                className="w-full text-left text-gray-500 whitespace-nowrap border"
              >
                <thead className="text-xs text-gray-700">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="text-center"
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          scope="col"
                          className="py-3 px-2"
                        >
                          {column.render("Header")}
                          {column.isSorted ? (column.isSortedDesc ? " ▾" : " ▴") : ""}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);

                    return (
                      <tr {...row.getRowProps()} className="border-y">
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="p-4 max-w-[16rem] text-ellipsis overflow-hidden border"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TableResponsive;
