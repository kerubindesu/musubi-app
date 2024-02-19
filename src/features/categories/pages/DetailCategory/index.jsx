import React, { useEffect } from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { PostsByCategory } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../categoriesSlice';

const AddCategory = () => {
  const dispatch = useDispatch();
  const categoryId = useParams().id
  
  const { category, loading } = useSelector((state) => state.categories);
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  useEffect(() => {
    dispatch(getCategory({ id: categoryId, dispatch }))
  }, [categoryId, dispatch])

  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Categories', url: '/dash/categories' },
    { text: loading ? "Loading..." : category?.name },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle
        text={ loading ? "Loading..." : category?.name }
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

      <PostsByCategory categoryId={categoryId} />
    </>
  )
}

export default AddCategory