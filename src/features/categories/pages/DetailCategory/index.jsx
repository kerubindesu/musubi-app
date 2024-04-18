import React, { useEffect } from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { ProductsByCategory } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../categoriesSlice';
import { Helmet } from 'react-helmet-async';

const AddCategory = () => {
  const dispatch = useDispatch();
  const categoryId = useParams().id
  
  const { category, isLoading } = useSelector((state) => state.categories);
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  useEffect(() => {
    dispatch(getCategory({ id: categoryId, dispatch }))
  }, [categoryId, dispatch])

  let pageTitle = isLoading ? "Loading..." : category?.name;

  const breadcrumbs = [
    { text: "Dashboard", url: "/dash/home" },
    { text: "Categories", url: "/dash/categories" },
    { text: pageTitle },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <Breadcrumb items={breadcrumbs} />

      <HeadingTitle
        text={ pageTitle }
        back={true} 
        mainVariant={"mb-9"}
        variant={"text-lg"}
      />
      
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}

      <ProductsByCategory categoryId={categoryId} />
    </>
  )
}

export default AddCategory