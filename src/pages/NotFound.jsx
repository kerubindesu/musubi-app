import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const NotFound = () => {
  // Referensi untuk elemen yang ingin Anda kunci scroll-nya
  const ref = React.useRef(null);

  useEffect(() => {
    // Pastikan elemen sudah ada di DOM
    const targetElement = ref.current;
    if (targetElement) {
      disableBodyScroll(targetElement);
    }

    // Cleanup function untuk mengaktifkan kembali scroll saat komponen di-unmount
    return () => {
      if (targetElement) {
        enableBodyScroll(targetElement);
      }
    };
  }, []); // Kosong array dependencies berarti efek ini hanya dijalankan sekali ketika komponen dipasang

  return (
    <>
      <Helmet>
        <title>Halaman tidak ditemukan</title>
      </Helmet>

      <div ref={ref} className="fixed inset-0 z-50 w-full flex flex-col sm:flex-row justify-center items-center gap-4 bg-white overflow-hidden">
        <div className="">
          <h1 className="pr-4 border-r text-2xl">404</h1>
        </div>
        <div className="w-max">
          <p className="text-base">Halaman ini tidak dapat ditemukan.</p>
        </div>
      </div>
    </>
  );
}

export default NotFound;
