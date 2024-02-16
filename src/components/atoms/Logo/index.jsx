import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLogo } from '../../../features/logo/logoSlice';
import Placeholder from '../Placeholder';

const Logo = ({ variant }) => {
    const dispatch = useDispatch()

    const { loading, logo } = useSelector((state) => state.logo);

    useEffect(() => {
        dispatch(getLogo())
    }, [dispatch])
    return (
        <>
            {loading && <Placeholder variant={"h-[2.5rem] w-[5rem] rounded-sm"} />}
            {!loading && logo && <img className={`${variant} object-contain`} src={logo.img_url} alt={logo.name} />}
        </>
    )
}

export default Logo