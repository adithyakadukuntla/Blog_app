import React from 'react'
import './css/loader.css'
function Loader() {
  return (
    // <div className="loader-container mt-5">
    //   <div className="loader mt-5"></div>
    // </div>

  //   <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 p-4">
    
  //     <div className="col" >
  //       <div className="card h-100 fs-5">
  //         <div className="card-header">
  //           <p className="my-auto"></p>
  //         </div>
  //         <div className="card-body mb-1">
  //           <h5 className='card-title ' style={{ color: 'var(--mid-blue)' }}></h5>
  //           <p className="card-text"></p>
  //           <button className='btn' style={{ backgroundColor: 'var(--light-olive)' }}>
              
  //           </button>
  //         </div>
  //         <div className="card-footer">
  //           <small className="text-body-secondary"></small>
  //         </div>
  //       </div>
  //     </div>
    
  // </div>

<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 p-4">
      <div className="col">
        <div className="card h-100 fs-5">
          <div className="card-header">
            <div className="loader"></div> {/* Loader for card header */}
          </div>
          <div className="card-body mb-1">
            <div className="loader"></div> {/* Loader for card title */}
            <div className="loader" style={{ height: '60px' }}></div> {/* Loader for card text */}
            <button className="btn loader"></button> {/* Loader for button */}
          </div>
          <div className="card-footer">
            <div className="loader" style={{ height: '20px' }}></div> {/* Loader for footer text */}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100 fs-5">
          <div className="card-header">
            <div className="loader"></div> {/* Loader for card header */}
          </div>
          <div className="card-body mb-1">
            <div className="loader"></div> {/* Loader for card title */}
            <div className="loader" style={{ height: '60px' }}></div> {/* Loader for card text */}
            <button className="btn loader"></button> {/* Loader for button */}
          </div>
          <div className="card-footer">
            <div className="loader" style={{ height: '20px' }}></div> {/* Loader for footer text */}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100 fs-5">
          <div className="card-header">
            <div className="loader"></div> {/* Loader for card header */}
          </div>
          <div className="card-body mb-1">
            <div className="loader"></div> {/* Loader for card title */}
            <div className="loader" style={{ height: '60px' }}></div> {/* Loader for card text */}
            <button className="btn loader"></button> {/* Loader for button */}
          </div>
          <div className="card-footer">
            <div className="loader" style={{ height: '20px' }}></div> {/* Loader for footer text */}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100 fs-5">
          <div className="card-header">
            <div className="loader"></div> {/* Loader for card header */}
          </div>
          <div className="card-body mb-1">
            <div className="loader"></div> {/* Loader for card title */}
            <div className="loader" style={{ height: '60px' }}></div> {/* Loader for card text */}
            <button className="btn loader"></button> {/* Loader for button */}
          </div>
          <div className="card-footer">
            <div className="loader" style={{ height: '20px' }}></div> {/* Loader for footer text */}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100 fs-5">
          <div className="card-header">
            <div className="loader"></div> {/* Loader for card header */}
          </div>
          <div className="card-body mb-1">
            <div className="loader"></div> {/* Loader for card title */}
            <div className="loader" style={{ height: '60px' }}></div> {/* Loader for card text */}
            <button className="btn loader"></button> {/* Loader for button */}
          </div>
          <div className="card-footer">
            <div className="loader" style={{ height: '20px' }}></div> {/* Loader for footer text */}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100 fs-5">
          <div className="card-header">
            <div className="loader"></div> {/* Loader for card header */}
          </div>
          <div className="card-body mb-1">
            <div className="loader"></div> {/* Loader for card title */}
            <div className="loader" style={{ height: '60px' }}></div> {/* Loader for card text */}
            <button className="btn loader"></button> {/* Loader for button */}
          </div>
          <div className="card-footer">
            <div className="loader" style={{ height: '20px' }}></div> {/* Loader for footer text */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Loader