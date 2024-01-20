import React, {useState, useEffect} from "react"
import { RiWindowsFill, RiMenuLine, RiAccountCircleLine, RiCloseLine } from "react-icons/ri"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { Logo } from "../../molecules"

const Navbar = () => {
    const [burgerMenu, setBurgerMenu] = useState(false)
    const [userAuth, setUserAuth] = useState(false)
    const [myOption, setMyOption] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [onScrolling, setOnScrolling] = useState(false)

    const handleBurgerMenu = () => {
        setMyOption(false)
        setBurgerMenu(!burgerMenu) 
    }

    const handleMyOption = () => {
        setBurgerMenu(false)
        setMyOption(!myOption) 
    }

    if(burgerMenu || myOption) {
        disableBodyScroll(document);
    } else {
        enableBodyScroll(document)
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingDown = prevScrollPos < currentScrollPos;

            if (isScrollingDown && currentScrollPos > 50) {
                setOnScrolling(true)
              } else {
                setOnScrolling(false)
              }
        
              setPrevScrollPos(currentScrollPos);
            };
        
            window.addEventListener('scroll', handleScroll);
        
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }, [prevScrollPos]);

  return (
    <>
        <div className={`border px-4 h-14 w-screen box-border flex justify-between items-center text-base sticky bg-white backdrop-blur-sm top-0 transition ease-in duration-300 ${onScrolling?'hidden':'bg-opacity-100'}`}>
            <div className="w-[4rem] max-h-max box-border overflow-hidden flex justify-start items-center text-2xl">
                <RiMenuLine onClick={(e) => {e.preventDefault(); handleBurgerMenu()}} className="cursor-pointer"/>
                {/* menu list */}
                {burgerMenu &&(
                    <>
                        <div className="py-2 h-screen max-w-[480px] flex flex-col justify-between items-start bg-white backdrop-blur-sm absolute inset-0 shadow z-20">
                            <ul className="pt-12 w-full flex flex-col text-base">
                                <li className="py-2 px-4 hover:bg-slate-100 cursor-pointer">Apps</li>
                                <li className="py-2 px-4 hover:bg-slate-100 cursor-pointer">Games</li>
                                <li className="py-2 px-4 hover:bg-slate-100 cursor-pointer">Music</li>
                            </ul>
                            <div onClick={(e) => {e.preventDefault(); setBurgerMenu(false)}} className="p-2 bg-white hover:bg-slate-100 rounded absolute top-2 right-2 cursor-pointer">
                                <RiCloseLine/>
                            </div>
                        </div>
                        <div onClick={(e) => {e.preventDefault(); setBurgerMenu(false)}} className="bg-white/65 backdrop-blur absolute inset-0 h-screen w-screen z-10"></div>
                    </>
                )}
            </div>
            <Logo variant="" icon={<RiWindowsFill />} />
            <div className="w-[4rem] max-h-max box-border overflow-hidden flex justify-end items-center text-2xl">
                {userAuth?
                    (
                        <>
                            <RiAccountCircleLine onClick={(e) => {e.preventDefault(); handleMyOption()}} className="cursor-pointer" />
                            {myOption && (
                                <>
                                    <div className="py-2 h-screen min-w-[240px] max-w-[480px] overflow-hidden flex flex-col justify-between items-start bg-white backdrop-blur-sm absolute top-0 right-0 bottom-0 shadow z-20">
                                        <ul className="pt-12 flex flex-col text-base">
                                            <li className="px-4 text-xl text-semibold">Kerubindesu</li>
                                            <li className="px-4 text-gray-500">Kelfin Nurohman</li>
                                        </ul>
                                        <div className="p-4 w-full border-t hover:bg-slate-100 text-base font-semibold cursor-pointer" onClick={() => {setUserAuth(!userAuth); setMyOption(false)}}>Sign-Out</div>
                                        <div onClick={(e) => {e.preventDefault(); setMyOption(false)}} className="p-2 bg-white hover:bg-slate-100 rounded absolute top-2 right-2 cursor-pointer">
                                            <RiCloseLine/>
                                        </div>
                                    </div>
                                    <div onClick={(e) => {e.preventDefault(); setMyOption(false); }} className="bg-white/65 backdrop-blur absolute inset-0 h-screen w-screen z-10"></div>
                                </>
                            )}
                        </>
                        
                    ):(
                        <div className="text-base text-blue-500 font-semibold cursor-pointer" onClick={() => {setUserAuth(!userAuth)}}>Sign-in</div>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default Navbar