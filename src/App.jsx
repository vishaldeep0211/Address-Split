import React from 'react'

export default function App() {
  const [data, setdata] = React.useState([])
  const [selectedData, setselectedData] = React.useState({})
  const [isSelected, setisSelected] = React.useState(false)
  const [addVal, setaddVal] = React.useState('')
  const [isChanged, setisChanged] = React.useState(false)
  const ddc = React.useRef(null)

  const handleChange = (e) => {
    setisChanged(true)
    setaddVal(e.target.value)
    //ddc.current.style.display = 'block'
    fetch('http://localhost:8080/rest/webapi/address/' + e.target.value)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setdata(data)
      })
  }

  if (data.length > 0 && !isSelected) ddc.current.style.display = 'block'
  if (data.length === 0 && isChanged) ddc.current.style.display = 'none'

  const displayFields = (e) => {
    let jsonAdd = JSON.parse(e.target.id)
    let add =
      jsonAdd.address2 === ''
        ? `${jsonAdd.address1}, ${jsonAdd.city}, ${jsonAdd.state}, ${jsonAdd.postalCode}`
        : `${jsonAdd.address1}, ${jsonAdd.address2}, ${jsonAdd.city}, ${jsonAdd.state}, ${jsonAdd.postalCode}`

    setaddVal(add)
    setisSelected(true)
    console.log(JSON.parse(e.target.id))
    ddc.current.style.display = 'none'
    setselectedData(JSON.parse(e.target.id))
  }

  return (
    <div>
      <div className='form-group' style={{ width: '300px' }}>
        <label htmlFor='Address'>Enter Address:</label>
        <input
          className='form-control'
          type='text'
          id='Address'
          name='address'
          value={addVal}
          onChange={handleChange}
        />
      </div>
      <div className='dropdown-list' ref={ddc}>
        {data.map((address) => (
          <div key={address.address1} className='resultPara'>
            <p
              id={JSON.stringify(address)}
              onClick={displayFields}
            >{`${address.address1}, ${address.address2}, ${address.city}, ${address.state}, ${address.postalCode}`}</p>
          </div>
        ))}
      </div>

      {isSelected && (
        <div className='container-div'>
          <form style={{ margin: '20px 0px' }}>
            <div className='form-group'>
              <label htmlFor='Address1'>Address Line 1:</label>
              <input
                className='form-control'
                type='text'
                name='add1'
                id='Address1'
                defaultValue={selectedData.address1}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='Address2'>Address Line 2:</label>
              <input
                className='form-control'
                type='text'
                name='add2'
                id='Address2'
                defaultValue={selectedData.address2}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='city'>City:</label>
              <input
                className='form-control'
                type='text'
                name='city'
                id='city'
                defaultValue={selectedData.city}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='state'>State:</label>
              <input
                className='form-control'
                type='text'
                name='state'
                id='state'
                defaultValue={selectedData.state}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='postalcode'>Postal Code:</label>
              <input
                className='form-control'
                type='text'
                name='postalcode'
                id='postalcode'
                defaultValue={selectedData.postalCode}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
