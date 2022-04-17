import React, {useEffect, useRef, useState} from 'react';
import {useSize} from "ahooks";
import {useDrop, XYCoord} from "react-dnd";
import {BoxTypes, Direction, DragDiv, DragDivProps, DragId} from "./DragDiv";
import {CustomDragLayer} from "./CustomDragLayer";


export const DragLayout = () => {
  const ref = useRef(null);
  const size = useSize(ref);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [pos1, setPos1] = useState<XYCoord>({x: 240, y: 0});
  const [pos2, setPos2] = useState<XYCoord>({x: 0, y: 240});
  const [pos3, setPos3] = useState<XYCoord>({x: 240, y: 240});

  const [, drop] = useDrop(
    () => ({
      accept: BoxTypes.Box,
      drop(item: DragDivProps, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number
          y: number
        }
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        switch (item.id) {
          case DragId.pos1:
            setPos1({x: left, y: top});
            break;
          case DragId.pos2:
            setPos2({x: left, y: top});
            break;
          case DragId.pos3:
            setPos3({x: left, y: top});
            break;
        }
        return undefined
      },
    }),
    [pos1],
  )
  useEffect(() => {
    if (typeof size !== "undefined") {
      setHeight(size.height);
      setWidth(size.width);
    }
  }, [size]);
  return (
    <div ref={drop}>
      <div ref={ref} style={{
        display: 'flex',
        height: '100vh'
      }}>
        <div style={{
          width: pos1.x,
          background: 'green'
        }}/>
        <DragDiv size={{width: 15, height: height}} id={DragId.pos1} direction={Direction.Vertical} left={pos1.x}
                 top={pos1.y}/>
        <CustomDragLayer pos2={pos2} pos3={pos3} pos1={pos1}/>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            background: 'brown'
          }}
        >
          <div style={{height: pos2.y, background: 'orange'}}/>
          <DragDiv size={{width: width - pos1.x, height: 15}} id={DragId.pos2} direction={Direction.Horizontal}
                   left={pos2.x}
                   top={pos2.y}/>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: pos3.x, background: '#cfa8c3'}}></div>
            <DragDiv size={{width: 15, height: height - pos2.y}} id={DragId.pos3} direction={Direction.Vertical}
                     left={pos3.x}
                     top={pos3.y}/>
            <div style={{flex: 1, background: 'blue'}}></div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DragLayout;
