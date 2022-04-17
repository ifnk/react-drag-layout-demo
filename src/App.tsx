import React, {useEffect, useRef, useState} from 'react';
import {useSize} from "ahooks";
import {DndProvider, useDrop, XYCoord} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DragId, DragDiv, DragDivProps, BoxTypes} from "./DragDiv";
import DragLayout from "./DragLayout";


export const App = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <DragLayout/>
    </DndProvider>

  );
};

export default App;
