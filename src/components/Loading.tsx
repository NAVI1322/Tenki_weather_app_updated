

export function LoadingElement()

{

    return (  <div className='flex space-x-2 justify-center items-center'>
    <span className='sr-only'>Loading...</span>
     <div className='md:h-5 md:w-5 w-3 h-3 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
   <div className='md:h-5 md:w-5 w-3 h-3 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
   <div className='md:h-5 md:w-5  w-3 h-3 bg-slate-300 rounded-full animate-bounce'></div>
</div>
 
 )
}