import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../../features/navbar/componets/organism';
import { Footer } from '../../organism';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSEOData } from '../../../features/seoData/seoDataSlice';
import { WhatsappBubbleComponent } from '../../molecules';

const GuestTemplate = () => {
  const dispatch = useDispatch()

  const { seoData } = useSelector((state) => state.seoData)

  useEffect(() => {
    dispatch(getAllSEOData({ search: "", page: "", limit: "" }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        {seoData?.map((item, index) => (
          <meta key={index + 1} name="keywords" content={item?.keyword} />
        ))}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
      <Navbar />
      <div className="relative mx-auto pt-16 px-3 min-h-[100vh] w-full max-w-7xl bg-white">
        <Outlet />
        <WhatsappBubbleComponent />
      </div>
      <Footer />
    </>
  );
};

export default GuestTemplate;
