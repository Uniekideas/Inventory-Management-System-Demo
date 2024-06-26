import React from 'react'
import { BeatLoader } from 'react-spinners';


function Loading({loading}) {
    return (
        <div className="spinner-container al">
          <BeatLoader color="rgb(83, 128, 0)" loading={loading} size={30} />
        </div>
      );
}

export default Loading
