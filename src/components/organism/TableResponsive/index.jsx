import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { TableSearch } from "../../molecules";
import { Button, Loading } from "../../atoms";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setImagePreview, setImgProperties } from "../../../features/imagePreview/imagePreviewSlice";
import { ImagePreview } from "../../../features/imagePreview/components/organism";
import { RiAddLine, RiFullscreenLine } from "react-icons/ri";

const TableResponsive = ({ isLoading, noFoundData, items, title, action, setKeyword, page, totalPage, setPage, totalRows, noAddData, noEdit, noDelete, noActions, pageSize }) => {
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
              Cell: ({value}) => (
                <>
                  <div className="text-center">{value}</div>
                </>
              ),
            };
            if (key === "Tags")
            return {
              Header: key,
              accessor: key,
              Cell: ({value}) => (
                <div className="flex flex-grow justify-start items-start gap-2">
                  {value?.map((tag, index) => (
                    <div key={index + 1} className="max-w-max max-h-max bg-slate-100 border rounded shadow-sm text-xs">
                      {tag.name}
                    </div>
                  ))}
                </div>
              ),
            };
            if (key.toLowerCase() === "image")
            return {
              Header: key,
              accessor: key,
              Cell: ({value}) => (
                <>
                  <div
                    onClick={() => {
                      dispatch(setImagePreview(true))
                      dispatch(setImgProperties({url: value[0], alt: value[1]}))
                    }}
                    className="absolute inset-0 z-10 flex flex-col justify-center items-center text-2xl text-transparent hover:text-white cursor-pointer hover:bg-black/10">
                    <RiFullscreenLine />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <img 
                      src={value[0]} 
                      className="w-full max-w-[16rem] object-cover" 
                      alt={value[1]}
                    />
                  </div>
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
        Cell: ({row}) => (
          <div className="flex h-auto w-full justify-center items-center gap-4">
            {!noEdit && (
              <>
                <Link to={`edit/${row.values.id}`}>
                  <span className="py-1 px-2 text-emerald-500 hover:bg-inherit rounded-sm">Edit</span>
                </Link>
              </>
            )}
            {!noDelete && (
              <>
                <button
                  value={row.values.id}
                  onClick={(e) => action(e.target.value)}
                  className="px-2 h-7 text-red-500 bg-red-500/20 hover:bg-red-700/20 rounded-sm shadow"
                >
                  Delete
                </button>
              </>
            )}
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
    noActions ? "" : tableHooks,
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
      <div className="mb-4 w-full flex flex-col justify-cener items-center">
        <div className="w-full flex flex-row-reverse gap-4 justify-between items-center">
          <TableSearch
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={state.globalFilter}
            setKeyword={setKeyword}
          />
          {!noAddData && (
            <>
              <Link to="add">
                <Button
                  variant={"bg-orange-500 hover:bg-orange-500/90 border rounded shadow text-white"}
                  text={title}
                  icon={<RiAddLine />}
                />
              </Link>
            </>
          )}
        </div>
      </div>
      
      {isLoading && isLoading ? <Loading text={true} /> : (
        <>
          {noFoundData && (
            <div className="p-4 w-full flex flex-col justify-center items-center">{noFoundData}</div>
          )}
          
          {rows.length !== 0 && (
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
                              className="p-2 max-w-[16rem] relative truncate border"
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
          )}
        </>
      )}

      {totalPage !== undefined && totalPage > 0 && (
        <div className="py-4 w-full flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="text-gray-700">
            Showing {(page * pageSize) + 1} to {Math.min((page + 1) * pageSize, totalRows)} of {totalRows}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            containerClassName="py-2 flex justify-center items-center gap-4 border-t md:border-none text-gray-700"
            pageCount={Math.min(10,totalPage)}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            activeLinkClassName={"text-emerald-500"}
            disabledLinkClassName={"text-slate-200"}
          />
        </div>
      )}
    </>
  );
};

export default TableResponsive;
