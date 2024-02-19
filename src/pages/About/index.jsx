import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../../features/about/aboutSlice';


const About = () => {
  const dispatch = useDispatch()

  const { about } = useSelector((state) => state.about);

  console.log(about)

  useEffect(() => {
    dispatch(getAbout())
  }, [dispatch])

  return (
    <>
      <div>{about?.title}</div>
      <img src={about?.img_url} alt={about?.image}/>
      <div>{about?.text}</div>
      <div>{about?.maps}</div>
    </>
  )
}

export default About