import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLogo } from '../../../features/settings/settingsSlice';
import Loading from '../Loading';

const Logo = ({ variant }) => {
    const dispatch = useDispatch()

    const { loading, logo } = useSelector((state) => state.settings);

    useEffect(() => {
        dispatch(getLogo())
    }, [dispatch])
    return (
        <>
            {loading && <Loading />}
            {logo && <img className={`${variant} object-contain`} src={logo.img_url} alt={logo.name} />}
        </>
    )
}

export default Logo