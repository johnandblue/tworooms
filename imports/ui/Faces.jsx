
import React from 'react';

const borderColor={};

const renderFaces=(props)=>{
  return ['sad worst', 'sad', 'regular', 'smile', 'smile best'].map((face, i)=>{
    const className=`circle ${face}`;
    const style={};
    let fillContainerClass='';
    if (props.average>0) {
      fillContainerClass="fill-container"
      style.borderColor="#FFCA3A";
    }
    const percentage = Math.floor((props.average/5)*100);
    style.background=`linear-gradient(to right, #FFCA3A ${percentage}%, white 0%)`;
    //Each container is 120px so I move each one its index times 120px
    style.left=-120*i;
    // multiply 700px which is the total length of the rating bar
    style.width=700;
    style.backgroundColor='#FFCA3A'

    return (
      <div
        key={face}
        onClick={()=>{
          props.handleClick('daily', i);
        }}
        >
          <div className="outside">
            <div className="inside">
              <div className="hole"/>
            </div>
          </div>

          <div
            style={props.borderColor}
            className={className} >
            <div
              className={fillContainerClass}
              style={style}
              >
                <div
                  className="fill"/>
                </div>
              </div>
            </div>
          );
        });
      }
      export default renderFaces;
