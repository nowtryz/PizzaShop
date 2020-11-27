import React, { useRef } from 'react'

const scrollToRef = (ref:Ref<HTMLElement>) => window.scrollTo(0, ref.current.offsetTop)   
// General scroll to element function

 const ScrollDemo = () => {

   const myRef = useRef(null)
   const executeScroll = () => scrollToRef(myRef)

   return (
      <> 
         <div ref={myRef}>I wanna be seen</div> 
         <button onClick={executeScroll}> Click to scroll </button> 
      </>
   )
}

export default ScrollDemo;