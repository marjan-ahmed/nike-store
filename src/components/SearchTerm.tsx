import React from 'react'

function SearchTerm({ term }: { term: string }) {
  return (
    <div className='px-4 text-[16px] font-semibold h-[36px] flex justify-center items-center rounded-full bg-[#F5F5F5] hover:bg-[#eeeded]'>
        {term}
    </div>
  )
}

export default SearchTerm;