import React, {useEffect} from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import Icon from "@ant-design/icons";
import {getEmptyImage} from "react-dnd-html5-backend";

export const ShuIcon = () => <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
  <path
    d="M365.715571 438.863286a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.568857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.567857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m292.568858-877.704572a73.142214 73.142214 0 1 1 0-146.284428 73.142214 73.142214 0 0 1 0 146.284428z m0 292.567858a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.568857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429z m0 292.567857a73.142214 73.142214 0 1 1 0-146.284429 73.142214 73.142214 0 0 1 0 146.284429zM365.715571 146.295428a73.142214 73.142214 0 1 1 0-146.284428 73.142214 73.142214 0 0 1 0 146.284428z"/>
</svg>

export const HengIcon = () => <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
  <path
    d="M1024 634.311c0-34.133-25.6-59.734-59.733-59.733s-59.734 28.444-59.733 59.733c0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733zM722.489 634.311c0-34.133-25.6-59.734-59.733-59.733s-59.734 28.444-59.733 59.733c0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733zM420.978 634.311c0-34.133-25.6-59.734-59.733-59.733s-59.734 28.444-59.733 59.733c0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733 0-31.289 0 0 0 0zM119.467 634.311c0-34.133-25.6-59.734-59.733-59.733-34.133 0-59.734 28.444-59.733 59.733 0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733 0-31.289 0 0 0 0zM1024 372.622c0-31.289-25.6-59.734-59.733-59.733s-59.734 28.444-59.733 59.733c0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733zM722.489 372.622c0-34.133-25.6-59.734-59.733-59.733s-59.734 28.444-59.733 59.733c0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733zM420.978 372.622c0-34.133-25.6-59.734-59.733-59.733s-59.734 28.444-59.733 59.733c0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733zM119.467 372.622c0-34.133-25.6-59.734-59.733-59.733-34.133 0-59.734 28.444-59.733 59.733 0 34.133 25.6 59.734 59.733 59.733 34.133 2.844 59.734-25.6 59.733-59.733z"/>
</svg>

export const BoxTypes = {Box: 'box'};


export enum DragId {pos1, pos2, pos3}

export enum Direction {Vertical, Horizontal}

export interface DragDivProps {
  id: DragId;
  direction: Direction;
  size: { width: number, height: number };
  left: number;
  top: number;
}

export function DragDiv(props: DragDivProps) {
  const {id, direction, size, left, top} = props
  const [{isDragging}, drag, preview] = useDrag(
    () => ({
      type: BoxTypes.Box,
      item: {id, size, direction, left, top},
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, direction, size, left, top]
  )

  useEffect(() => {
    // 加了这个 拖拽的时候 不会显示 预览 ，这样我就可以 使用 自定义的预览了 (customDragLayer)
    preview(getEmptyImage(), {captureDraggingState: true})
  }, [])

  function getStyle() {
    const cursor = direction === Direction.Vertical ? 'col-resize' : 'row-resize'
    return {
      width: size.width,
      height: size.height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: 'white',
      cursor: cursor,
    };
  }

  return <div ref={drag} style={getStyle()}>
    <Icon component={direction === Direction.Vertical ? ShuIcon : HengIcon} style={{fontSize: 15}}/>
  </div>;
}
