import React from 'react'
import Select from 'react-select';

const ranges = [
  {label: "3 miles", value: 3},
  {label: "5 miles", value: 5},
  {label: "10 miles", value: 10},
  {label: "15 miles", value: 15},
  {label: "20 miles", value: 20}
]

const SelectDropdown = ({ handleSelect, range }) => {

  return (
    <div className="select-dropdown">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Select 
            options={ranges}
            value={range}
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999, width: "80%" }) }}
            onChange={(rangeObj) => handleSelect(rangeObj)}
          />
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}

export default SelectDropdown