import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, HeadingTitle, Placeholder } from '../../components/atoms';
import { hideNotification } from '../../features/notification/notificationSlice';
import { Notification } from '../../features/notification/components/organism';
import { Link } from 'react-router-dom';
import { RiArticleLine, RiFileUserLine, RiImageLine, RiListIndefinite, RiPriceTag3Line } from 'react-icons/ri';
import { getProducts } from '../../features/products/productsSlice';
import { getCategories } from '../../features/categories/categoriesSlice';
import { getCarousels } from '../../features/carousels/carouselsSlice';
import { getUsers } from '../../features/users/usersSlice';
import { getTags } from '../../features/tags/tagsSlice';
import { Helmet } from 'react-helmet-async';
import VisitorChart from '../../features/visitors/components/molecules/VisitorChart/index.jsx';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { message, type, isOpen } = useSelector((state) => state.notification);
  const { totalRows: totalProductRows, isLoading: isProductLoading } = useSelector((state) => state.products);
  const { totalRows: totalCategoryRows, isLoading: isCategoryLoading } = useSelector((state) => state.categories);
  const { totalRows: totalCarouselRows, isLoading: isCarouselLoading } = useSelector((state) => state.carousels);
  const { totalRows: totalUserRows, isLoading: isUserLoading } = useSelector((state) => state.users);
  const { totalRows: totalTagRows, isLoading: isTagLoading } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(getProducts({ search: "", limit: "", page: "" }))
    dispatch(getCategories({ search: "", limit: "", page: "" }))
    dispatch(getCarousels({ search: "", limit: "", page: "" }))
    dispatch(getUsers({ search: "", limit: "", page: "" }))
    dispatch(getTags({ search: "", limit: "", page: "" }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const pageTitle = "Home"
  
  const breadcrumbs = [
    { text: "Dashboard", url: "/dash/home" },
    { text: pageTitle },
  ];

  return (
    <div className="flex flex-col gap-4 lg-gap-6">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <Breadcrumb items={breadcrumbs} />

      <HeadingTitle variant={"text-lg"} text={pageTitle} />

      <div className="container">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:gap-6">
          {isProductLoading ? (
              <Placeholder variant="aspect-square w-auto rounded-3xl" />
          ) : (
            <Link to="/dash/products" className="aspect-square w-auto flex flex-col justify-center items-center gap-2 bg-neutral-100 border-2 border-neutral-500 hover:border shadow-lg hover:shadow-md rounded-3xl">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex justify-center items-center bg-neutral-500 rounded-full">
                <RiArticleLine className="text-base sm:text-2xl text-white" />
              </div>
              <div className="text-lg font-semibold">{totalProductRows}</div>
              <div className="truncate text-xs text-slate-500">Products</div>
            </Link>
          )}

          {isCategoryLoading ? (
            <Placeholder variant="aspect-square w-auto rounded-3xl" />
          ) : (
            <Link to="/dash/categories" className="aspect-square w-auto flex flex-col justify-center items-center gap-2 bg-neutral-200 border-2 border-neutral-400 hover:border shadow-lg hover:shadow-md rounded-3xl">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex justify-center items-center bg-neutral-400 rounded-full">
                <RiListIndefinite className="text-base sm:text-2xl text-white" />
              </div>
              <div className="text-lg font-semibold">{totalCategoryRows}</div>
              <div className="truncate text-xs text-slate-500">Categories</div>
            </Link>
          )}

          {isCarouselLoading ? (
            <Placeholder variant="aspect-square w-auto rounded-3xl" />
          ) : (
            <Link to="/dash/carousels" className="aspect-square w-auto flex flex-col justify-center items-center gap-2 bg-neutral-300 border-2 border-neutral-300 hover:border shadow-lg hover:shadow-md rounded-3xl">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex justify-center items-center bg-white rounded-full">
                <RiImageLine className="text-base sm:text-2xl" />
              </div>
              <div className="text-lg font-semibold">{totalCarouselRows}</div>
              <div className="truncate text-xs text-slate-500">Carousels</div>
            </Link>
          )}
          
          {isUserLoading ? (
            <Placeholder variant="aspect-square w-auto rounded-3xl" />
          ) : (
            <Link to="/dash/users" className="aspect-square w-auto flex flex-col justify-center items-center gap-2 bg-neutral-400 border-2 border-neutral-200 hover:border shadow-lg hover:shadow-md rounded-3xl">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex justify-center items-center bg-white rounded-full">
                <RiFileUserLine className="text-base sm:text-2xl" />
              </div>
              <div className="text-lg font-semibold text-white">{totalUserRows}</div>
              <div className="truncate text-xs text-white">Users</div>
            </Link>
          )}
            
          {isTagLoading ? (
            <Placeholder variant="aspect-square w-auto rounded-3xl" />
          ) : (
            <Link to="/dash/tags" className="aspect-square w-auto flex flex-col justify-center items-center gap-2 bg-neutral-500 border-2 border-neutral-100 hover:border shadow-lg hover:shadow-md rounded-3xl">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex justify-center items-center bg-white rounded-full">
                <RiPriceTag3Line className="text-base sm:text-2xl" />
              </div>
              <div className="text-lg font-semibold text-white">{totalTagRows}</div>
              <div className="truncate text-xs text-white">Tags</div>
            </Link>
          )}
        </div>
      </div>

      <VisitorChart />
      
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  )
}

export default Dashboard