import {useEffect, useState} from "react";

/**
 * a hook change change component behavior based on scroll state
 * @param initialBreakpoint the value corresponding to which the scroll state changes
 * @author Damien (Nowtryz)
 * @return [scroll, setBreakpoint] if the scroll state is over the breakpoint and a function to change the breakpoint
 */
const useScroll = (initialBreakpoint: number) => {
    const [scroll, setScroll] = useState(false)
    const [breakpoint, setBreakpoint] = useState(initialBreakpoint)

    useEffect(() => {
        const onScroll = () => {
            const scrollCheck = (window.scrollY / window.innerHeight) > breakpoint
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        }
        document.addEventListener("scroll", onScroll)
        return () => document.removeEventListener("scroll", onScroll)
    }, [breakpoint, scroll])

    return [scroll, setBreakpoint]
}

export default useScroll
