import './LeftHeader.css'


export const LeftHeader = () => {
  return (
    <div 
      className='LeftHeader'
      style={{
        height: '100px',
        backgroundColor: '#264040',
        color: 'white',
        // textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div>back button</div>
      <img width='100' src='https://dynamic.brandcrowd.com/asset/logo/c3cf1bd1-4261-4d85-a6c6-52dbce75799d/logo-search-grid-1x?v=637678103961270000' />
      <div style={{margin: '0px 5px'}}>Save</div>
      <div style={{margin: '0px 5px'}}>Options</div>
      <div style={{margin: '0px 5px'}}>Add Tier</div>
    </div>
  )
}