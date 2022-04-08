import React, { useState } from "react";
import { useRouter } from "next/router";

import { List, ListItem, Card, CardHeader, Box, Button, Grid, Typography } from "@mui/material";
import { teal, red } from "@mui/material/colors";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const FormatElementTile = ({
  sheets,
  currentSheet,
  setCurrentSheet,
  sheetsDetails,
  setPageType,
  ...props
}) => {
  console.log(currentSheet);
  console.log(sheetsDetails);
  const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `table-${k + offset}-${new Date().getTime()}`,
      content: `Sample Table`,
    }));

  const pushToGenerator = (e) => {
    setCurrentSheet(currentSheet + 1);
    if (currentSheet == sheets) {
      setPageType("generate");
    } else {
      setTableState([getItems(1, 1)]);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const [tableState, setTableState] = useState([getItems(1, 1)]);

  function handleOnDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(tableState[sInd], source.index, destination.index);
      const newState = [...tableState];
      newState[sInd] = items;
      setTableState(newState);
    } else {
      const result = move(tableState[sInd], tableState[dInd], source, destination);
      const newState = [...tableState];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setTableState(newState.filter((group) => group.length));
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <Box
          sx={{
            px: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            my: 1,
          }}
        >
          <Box>
            <div>
              <Button
                variant="contained"
                sx={{
                  mb: 2,
                  maxWidth: "150px",
                  maxHeight: "40px",
                  minWidth: "150px",
                  minHeight: "40px",
                }}
                onClick={() => {
                  setTableState([...tableState, []]);
                }}
              >
                Add Row
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                sx={{
                  mb: 2,
                  maxWidth: "150px",
                  maxHeight: "40px",
                  minWidth: "150px",
                  minHeight: "40px",
                }}
                onClick={() => {
                  setTableState([...tableState, getItems(1, 2)]);
                }}
              >
                Add Table
              </Button>
            </div>
          </Box>
          <div>
            <Button
              variant="contained"
              sx={{
                mb: 2,
                maxWidth: "150px",
                maxHeight: "40px",
                minWidth: "150px",
                minHeight: "40px",
                backgroundColor: teal[500],
              }}
              onClick={pushToGenerator}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box
          sx={{
            px: 2,
            alignItems: "left",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h3">
            Sheet {currentSheet + 1}: {sheetsDetails[currentSheet]}
          </Typography>
        </Box>
        <Box>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {tableState.map((el, ind) => (
              <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      my: 1,
                      backgroundColor: "neutral.300",
                      minHeight: "170px",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <List sx={{ display: "flex" }}>
                      {el.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card sx={{ minWidth: "200px" }}>
                                  <CardHeader subheader="Drag to reorder" title={item.content} />
                                  <Button
                                    variant="outlined"
                                    sx={{
                                      borderColor: red[500],
                                      color: red[500],
                                      mx: 3,
                                      mb: 2,
                                    }}
                                    onClick={() => {
                                      const newState = [...state];
                                      newState[ind].splice(index, 1);
                                      setTableState(newState.filter((group) => group.length));
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Card>
                              </ListItem>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </List>
                  </Box>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </Box>
      </Grid>
    </Grid>
  );
};
