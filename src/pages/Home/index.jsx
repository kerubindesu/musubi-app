import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarousels } from '../../features/carousels/carouselsSlice';
import { Carousel } from 'flowbite-react';
import { Placeholder } from '../../components/atoms';

const Home = () => {
  const dispatch = useDispatch()

  const { carousels, loading: loadingCarousels } = useSelector((state) => state.carousels);

  useEffect(() => {
    dispatch(getCarousels({ search: "", page: "", limit: "" }))
  }, [dispatch])

  return (
    <>
    {loadingCarousels ? <Placeholder variant={"h-56 sm:h-64 md:h-80 xl:h-[28rem] w-full rounded-xl"} /> : (
      <div className="aboslute inset-0 h-56 sm:h-64 md:h-80 xl:h-[28rem] rounded-b">
        <Carousel leftControl={true} rightControl={true}>
          {carousels?.map((carousel, index) => (
              <img key={index + 1} src={carousel.img_url} alt={carousel.image} className="h-full w-full object-cover"/>
          ))}
        </Carousel>
      </div>
    )}
      
    {/* Products */}
      <div>Products</div>

    {/* About */}
      <div>About</div>

    </>
  )
}

export default Home