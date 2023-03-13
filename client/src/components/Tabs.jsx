import React from 'react'

const Tabs = ({setTab}) => {
    
  return (
    <div className='tabs-container'>
        <div className='tab' onClick={()=>setTab(0)}>Add Book</div>
        <div className='tab' onClick={()=>setTab(1)}>Get Book</div>
        <div className='tab' onClick={()=>setTab(2)}>Update Book</div>
        <div className='tab' onClick={()=>setTab(3)}>Token</div>
    </div>
  )
}

export default Tabs