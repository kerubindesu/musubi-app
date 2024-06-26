import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLogo } from '../../../features/logo/logoSlice';
import Placeholder from '../Placeholder';
import { Link } from 'react-router-dom';

const Logo = ({ variant, link }) => {
    const dispatch = useDispatch()

    const { isLoading, logo } = useSelector((state) => state.logo);

    useEffect(() => {
        dispatch(getLogo())
    }, [dispatch])
    return (
        <Link to={link}>
            {isLoading && <Placeholder variant={"h-[2.5rem] w-[5rem] rounded-lg"} />}
            {!isLoading && logo && <img className={`${variant} object-contain`} src={logo.img_url} alt={logo.name} />}
        </Link>
    )
}

export default Logo