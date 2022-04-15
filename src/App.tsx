import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {useSize} from "ahooks";
import {DndProvider, XYCoord} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Direction, DragDiv} from "./DragDiv";


const App = () => {
  const ref = useRef(null);
  const size = useSize(ref);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [pos1, setPos1] = useState<XYCoord>({x: 120, y: 0});
  useEffect(() => {
    if (typeof size !== "undefined") {
      setHeight(size.height);
      setWidth(size.width);
    }
  }, [size]);
  return (
    <DndProvider backend={HTML5Backend}>

      <div ref={ref} style={{
        display: 'flex',
        height: '100vh'
      }}>
        <div style={{
          width: 320,
          background: 'green'
        }}/>
        <DragDiv id={Direction.vertical} left={pos1.x} top={pos1.y}/>
        <div
          style={{
            flex: 1,
            background: 'brown'
          }}
        >
          <div></div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </DndProvider>

  );
};

export default App;
