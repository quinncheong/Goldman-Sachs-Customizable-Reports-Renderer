import React, { useState } from 'react';
import {
    List,
    ListItem,
    Card,
    CardHeader,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { StayPrimaryLandscape } from '@mui/icons-material';

const reportElements = [
    {
        id: 'sheet',
        title: 'Add Sheet',
        label: 'Drag to insert a new sheet',
    },
    {
        id: 'table',
        title: 'Add Table',
        label: 'Drag to insert a new table',
    },
    {
        id: 'row',
        title: 'Add Row',
        label: 'Drag to insert a new row',
    }
]

export const FormatElementTile = (props) => {
    const [elements, updateElements] = useState(reportElements);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(elements);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateElements(items);
    }

    return <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="elements">
                {(provided) => (
                    <List className="elements" {...provided.droppableProps} ref={provided.innerRef}>
                        {elements.map(({id, title, label}, index) => {
                            return (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Card sx={{width: '100%'}}>
                                                <CardHeader
                                                subheader = {label}
                                                title = {title}
                                                />
                                            </Card>
                                        </ListItem>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
};