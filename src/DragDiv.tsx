import React, {useEffect} from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import Icon from "@ant-design/icons";
import {getEmptyImage} from "react-dnd-html5-backend";

export const ShuIcon = () => <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
  <path
    d="M365.715571 438.863286a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.568857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.567857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m292.568858-877.704572a73.142214 73.142214 0 1 1 0-146.284428 73.142214 73.142214 0 0 1 0 146.284428z m0 292.567858a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.568857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.567857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429zM365.715571 146.295428a73.142214 73.142214 0 1 1 0-146.284428 73.142214 73.142214 0 0 1 0 146.284428z"/>
</svg>

export const ItemTypes = {BOX: 'box'}

export enum Direction {horizontal, vertical}

export interface DragDivProps {
  id: Direction;
  left: number;
  top: number;
}

export function DragDiv(props: DragDivProps) {
  const {id, left, top} = props
  const [{isDragging}, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: {id, left, top},
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  )

  useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true})
  }, [preview])
  return <div ref={drag} style={{
    width: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: 'col-resize'
  }}>
    <Icon component={ShuIcon} style={{fontSize: 20}}/>
  </div>;
}
