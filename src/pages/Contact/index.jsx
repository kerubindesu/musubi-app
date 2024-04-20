import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../../features/contact/contactSlice';
import { Helmet } from 'react-helmet-async';
import { MyMap } from '../../components/organism';
import { Link } from 'react-router-dom';
import { Placeholder } from '../../components/atoms';

const Contact = () => {
  const dispatch = useDispatch()

  const { isLoading, contact } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContact())
  }, [dispatch])

  const createWhatsAppLink = (number, message) => {
    const baseUrl = "https://wa.me/";
    const formattedNumber = number.replace('+', ''); // Menghilangkan tanda '+'
    const urlEncodedText = encodeURIComponent(message); // Encode teks pesan
    return `${baseUrl}${formattedNumber}?text=${urlEncodedText}`;
  };

  const createEmailLink = (email, subject, body) => {
    const emailEncoded = encodeURIComponent(email);
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(body);
    return `mailto:${emailEncoded}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const formatWhatsappNumber = (number) => {
    if (!number) return '';
  
    // Menghapus karakter non-numerik kecuali '+'
    const cleanNumber = number.replace(/[^\d+]/g, '');
  
    // Memeriksa apakah format sudah benar, jika tidak gunakan format standar
    if (!/^(\+62)(\d{2,3})(\d{4})(\d{4})$/.test(cleanNumber)) return number;
  
    // Menggabungkan kembali dengan format yang diinginkan
    return cleanNumber.replace(/^(\+62)(\d{2,3})(\d{4})(\d{4})$/, '$1 $2-$3-$4');
  };  

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <Helmet>
        <title>Kontak</title>
      </Helmet>

      <div className="container mx-auto">
        {isLoading ? (
          <Placeholder variant={"h-[16rem] lg:h-[26rem] w-full rounded-lg"} />
        ) : (
          <>
            {contact?.location && (
              <MyMap
                latitude={contact?.location?.coordinates[0]}
                longitude={contact?.location?.coordinates[1]}
              />
            )}
          </>
        )}
      </div>

      {isLoading ? (
        <div className="my-8 container mx-auto grid grid-cols-1 sm:col-span-2 md:grid-cols-3 gap-4 md:gap-10">
          <div className="px-3 md:px-0 -mx-3 md:mx-auto col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 flex justify-center items-center rounded w-full">
            <Placeholder variant={"aspect-video w-full h-auto object-cover rounded-lg"} />
          </div>
          <div className="md:pl-10 col-span-1 md:col-span-2 flex flex-col gap-6 md:border-l">
            <Placeholder variant={"h-8 w-[12rem] rounded-lg"} />
            <Placeholder variant={"h-8 w-full rounded-lg"} />
            <Placeholder variant={"h-8 w-full rounded-lg"} />
            <Placeholder variant={"h-8 w-3/4 rounded-lg"} />
            <Placeholder variant={"h-8 w-[16rem] rounded-lg"} />
            <Placeholder variant={"h-8 w-[16rem] rounded-lg"} />
            <Placeholder variant={"h-8 w-3/4 rounded-lg"} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:col-span-2 md:grid-cols-3 gap-4 md:gap-10">
          <div className="hidden px-3 md:px-0 -mx-3 md:mx-auto col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 md:flex justify-center items-center border md:border-none rounded">
            <img className="aspect-auto w-full h-auto object-cover bg-white" src={contact?.img_url} alt={contact?.image} />
          </div>

          <div className="md:pl-10 col-span-1 md:col-span-2 flex flex-col gap-6 md:border-l">
            <div className="container mx-auto">
              <h1 className="text-2xl font-semibold text-slate-900">{contact?.company_name}</h1>
            </div>

            <div className="container mx-auto flex flex-col gap-4">
              <div className="w-full flex gap-2">
                <div className="w-32 truncate text-sm font-semibold text-slate-500">WhatsApp</div>
                <div className="w-full">
                  <Link
                    to={contact ? createWhatsAppLink(contact.whatsapp_number, `Halo, saya tertarik dengan produk Anda!`) : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                  >
                    {contact ? formatWhatsappNumber(contact.whatsapp_number) : 'N/A'}
                  </Link>
                </div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-32 truncate text-sm font-semibold text-slate-500">Email</div>
                <div className="w-full">
                  <Link
                    to={contact ? createEmailLink(contact.email, "Informasi Produk", "Saya tertarik dengan produk Anda, mohon informasi lebih lanjut.") : "#"}
                    className="text-sm"
                  >
                    {contact?.email}
                  </Link>
                </div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-32 truncate text-sm font-semibold text-slate-500">Alamat</div>
                <Link
                  to={`https://www.google.com/maps?q=${contact?.location?.coordinates[0]},${contact?.location?.coordinates[1]}`}
                  target="_blank"
                  className="w-full text-sm text-sky-500"
                >
                  <div>{contact?.address}</div>
                </Link>
              </div>
            </div>
            
            <div className="container mx-auto">
              <p className="py-2 text-base text-start">{contact?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact