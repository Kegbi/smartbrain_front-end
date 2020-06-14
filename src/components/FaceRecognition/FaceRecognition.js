import React from 'react';
import Box from "./Box";


const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                <div>
                  {boxes.map((element, i) => {
                    return <Box key={i} top={boxes[i].topRow} right={boxes[i].rightCol} bottom={boxes[i].bottomRow} left={boxes[i].leftCol} />
                  })}
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;