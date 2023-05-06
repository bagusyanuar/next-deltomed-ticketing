import React from 'react'
import EmptyRecord from '../components/empty'
import PropTypes from 'prop-types'

function Body({ data, headers, withIndex, page, perPage, pagination }) {

  if (data.length <= 0) {
    let coloumnCount = withIndex ? (headers.length + 1) : headers.length;
    return (
      <tbody>
        <EmptyRecord coloumnCount={coloumnCount} message={`No Record Found`} />
      </tbody>
    )
  }

  return (
    <tbody>
      {
        pagination ?
          <PaginationBody headers={headers} data={data} withIndex={withIndex} page={page} perPage={perPage} />
          : <DefaultBody headers={headers} data={data} withIndex={withIndex} />
      }
    </tbody>
  )
}

Body.defaultProps = {
  withIndex: false,
  pagination: false,
  page: 1,
  perPage: 0,
}

Body.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  withIndex: PropTypes.bool,
  pagination: PropTypes.bool,
  page: PropTypes.number,
  perPage: PropTypes.number,
}

const DefaultBody = ({ headers, data, withIndex }) => {
  return data.map((value, index) => {
    return (
      <tr key={index} className='bg-white border-b'>
        {withIndex ? <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{(index + 1)}</td> : ''}
        {
          headers.map((v, i) => {
            return (
              <td key={i} className={`px-6 py-3 text-gray-500 whitespace-nowrap`}>
                {value['row'][i]}
              </td>
            )
          })
        }
      </tr>
    )
  })
}
const PaginationBody = ({ data, page, perPage, headers, withIndex }) => {
  return data.slice(((page - 1) * perPage), (page * perPage)).map((value, index) => {
    return (
      <tr key={index} className='bg-white border-b'>
        {withIndex ? <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{((index + 1) + ((page - 1) * perPage))}</td> : ''}
        {
          headers.map((v, i) => {
            return (
              <td key={i} className={`px-6 py-3 text-gray-500 whitespace-nowrap`}>
                {value['row'][i]}
              </td>
            )
          })
        }
      </tr>
    )
  })
}



export default Body