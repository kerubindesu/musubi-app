import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { TableSearch } from "../../molecules";
import { Button, HeadingTitle, Loading } from "../../atoms";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setImagePreview, setimgProperties } from "../../../features/imagePreview/imagePreviewSlice";
import ImagePreview from "../../../features/imagePreview/components/ImagePreview";

const TableResponsive = ({ isLoading, noFoundData, items, title, action, setKeyword, page, totalPage, setPage, totalRows }) => {
  const dispatch = useDispatch()

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
            if (key.toLowerCase() === "image")
            return {
              Header: key,
              accessor: key,
              Cell: ({ value }) => (
                <>
                  <img 
                    onClick={() => { 
                      dispatch(setImagePreview(true))
                      dispatch(setimgProperties({url: value[0], alt: value[1]}))
                    }}
                    src={value[0]} 
                    className="absolute inset-0 lg:relative h-full w-full max-h-[4rem] object-cover hover:filter hover:contrast-50 cursor-pointer" 
                    alt={value[1]}
                  />
                  <ImagePreview />
                </>
              ),
            };
  
            return { Header: key, accessor: key };
          })
        : [],
    [items, dispatch]
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
            <Link to={`${row.values.id}`}>
              <span className="py-1 px-2 text-emerald-500 hover:bg-inherit rounded-sm">Edit</span>
            </Link>
            <button
              value={row.values.id}
              onClick={(e) => action(e.target.value)}
              className="px-2 h-7 text-red-500 bg-red-500/20 hover:bg-inherit rounded-sm"
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

  const handlePageClick = async({ selected }) => {
    await setPage(selected)
  }

  return (
    <>
      <div className="mb-4 w-full flex flex-col md:flex-row items-center justify-between gap-4">
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
      {isLoading && isLoading?
      (
        <Loading text={true} />
      ):(
        <>
          {noFoundData && noFoundData? (
            <div className="p-4 w-full flex flex-col justify-center items-center">{noFoundData}</div>
          ):(
            <>
              <div className="overflow-x-auto relative flex flex-col bg-white">
                <table
                  {...getTableProps()}
                  className="w-full text-left text-gray-500 whitespace-nowrap border"
                >
                  <thead className="text-gray-700">
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
                                className="px-2 max-w-xs relative text-ellipsis border"
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
              </div>
            </>
          )}
        </>
      )}
      
      <>
      {items && (
        <div className="py-4 w-full flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="text-gray-700">Showing {page +1} to {totalPage} of {totalRows}</div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            containerClassName="py-2 flex justify-center items-center gap-4 border-t text-gray-700"
            pageCount={Math.min(10,totalPage)}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            activeLinkClassName={"text-emerald-500"}
            disabledLinkClassName={"text-slate-200"}
          />
        </div>
      )}
      </>
    </>
  );
};

export default TableResponsive;
