import type {CSSProperties, FC} from 'react'
import type {XYCoord} from 'react-dnd'
import {useDragLayer} from 'react-dnd'
import {Direction, DragDivProps, DragId} from "./DragDiv";


const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}


export interface CustomDragLayerProps {
  pos1: XYCoord,
  pos2: XYCoord,
  pos3: XYCoord,
}

// 拖拽预览影子
export const CustomDragLayer: FC<CustomDragLayerProps> = (props) => {
  const {pos1, pos2, pos3} = props
  const {itemType, isDragging, item, initialOffset, currentOffset} =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  const renderItem = () => {
    const dragItemProps = item as DragDivProps
    const div = <div
      style={{
        width: dragItemProps.size.width,
        height: dragItemProps.size.height,
        background: '#b7b7b7',
        opacity: '0.8'
      }}>
    </div>
    // 这里加上你自己的个性化 预览 preview 样式
    switch (dragItemProps.id) {
      case DragId.pos2:
        return div
      case DragId.pos3:
        return div
      case  DragId.pos1:
        return div
      default:
        return null
    }
  };


  if (!isDragging) {
    return null
  }
  const getItemStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null,) => {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      }
    }
    const dragItemProps = item as DragDivProps
    let {x, y} = currentOffset
    let transform: string;
    if (dragItemProps.direction === Direction.Vertical) {
      // 竖的
      transform = `translate(${x}px, ${0}px)`;
      if (dragItemProps.id === DragId.pos3) {
        transform = `translate(${x}px, ${pos2.y}px)`;
      }
    } else {
      // 横的
      transform = `translate(${pos1.x}px, ${y}px)`;
    }
    return {
      transform,
      WebkitTransform: transform,
    }
  };

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  )
}
