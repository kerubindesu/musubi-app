import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWhatsappNumber } from '../../../features/contact/contactSlice';
import { Link } from 'react-router-dom';
import { RiWhatsappLine } from 'react-icons/ri';
import { Loading } from '../../atoms';

const WhatsappBubbleComponent = () => {
    const dispatch = useDispatch()

    const {
        isWhatsappNumberLoading,
        whatsappNumber
    } = useSelector((state) => state.contact)

    const createWhatsAppLink = (number, message) => {
        const baseUrl = "https://wa.me/";
        const formattedNumber = number.replace('+', ''); // Menghilangkan tanda '+'
        const urlEncodedText = encodeURIComponent(message); // Encode teks pesan
        return `${baseUrl}${formattedNumber}?text=${urlEncodedText}`;
    };

    useEffect(() => {
        dispatch(getWhatsappNumber())
    }, [dispatch])

    return (
        <div className="fixed bottom-16 left-0 right-0 mx-auto px-3 max-w-7xl">
            <div className="container mx-auto flex justify-end items-center bg-transparent">
                {isWhatsappNumberLoading ? (
                    <div className="h-12 w-12 rounded-full bg-slate-200 animate-pulse flex justify-center items-center">
                        <Loading />
                    </div>
                ) : (
                    <Link
                        to={whatsappNumber ? createWhatsAppLink(whatsappNumber.whatsapp_number, `Halo, saya tertarik dengan produk Anda!`) : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 w-12 flex justify-center items-center gap-1 bg-emerald-400 shadow-lg hover:shadow-none rounded-full text-white"
                    >
                        <RiWhatsappLine className="text-3xl" />
                    </Link>
                )}
            </div>
        </div>

    )
}

export default WhatsappBubbleComponent