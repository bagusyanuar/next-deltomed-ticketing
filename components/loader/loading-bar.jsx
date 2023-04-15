import React from 'react'
import LoadingBar from 'react-top-loading-bar'
import PropTypes from 'prop-types';

function TopLoadingBar({ progress, onFinished }) {
  return (
    <div>
        <LoadingBar height={3} progress={progress} color='#28b485' onLoaderFinished={onFinished}/>
    </div>
  )
}

TopLoadingBar.propTypes = {
    progress: PropTypes.number.isRequired,
    onFinished: PropTypes.func.isRequired
}
export default TopLoadingBar