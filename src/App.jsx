import './App.css'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useState } from 'react';

function App() {

  const [lists, setLists] = useState(
    [
      {
        id: 1,
        title: "Liste 1",
        cards: [
          {
            id: 10,
            bg: "red"
          },
          {
            id: 15,
            bg: "blue"
          }
        ]
      },
      {
        id: 2,
        title: "Liste 2",
        cards: [
          {
            id: 25,
            bg: "green"
          },
        ]
      },
      {
        id: 3,
        title: "Liste 3",
        cards: []
      }
    ]
  );


  function handleOnDragEnd(result) {
    if(!result.destination) return;

    console.log(result);
    const destinationId = parseInt(result.destination.droppableId);
    const destination = lists.find(x => x.id === destinationId);
    const sourceId = parseInt(result.source.droppableId);
    const source = lists.find(x => x.id === sourceId);

    const currentState = lists;

    const card = currentState.flatMap(x => x.cards).find(x => x.id === parseInt(result.draggableId));
    console.log(card);
    currentState.find(x => x.id === sourceId).cards.splice(result.source.index, 1);
    currentState.find(x => x.id === destinationId).cards.splice(result.destination.index, 0, card);
    setLists(currentState);



    console.log(source);
    console.log(destination);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="container">
      <Droppable droppableId="1">
        {(provided, snapshot) => {
          const { innerRef, droppableProps } = provided;
          return (
            <ul ref={innerRef} {...droppableProps}>
              {lists.find(x => x.id === 1).cards.map(({ id, bg }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => {
                    const { innerRef, draggableProps, dragHandleProps } = provided;
                    return (
                      <li ref={innerRef} {...draggableProps} {...dragHandleProps}>
                        <div className={`box ${bg}`}></div>
                      </li>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          );
        }}
      </Droppable>
      <Droppable droppableId="2">
      {(provided, snapshot) => {
          const { innerRef, droppableProps } = provided;
          return (
            <ul ref={innerRef} {...droppableProps}>
              {lists.find(x=> x.id === 2).cards.map(({ id, bg }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => {
                    const { innerRef, draggableProps, dragHandleProps } = provided;
                    return (
                      <li ref={innerRef} {...draggableProps} {...dragHandleProps}>
                        <div className={`box ${bg}`}></div>
                      </li>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          );
        }}
      </Droppable>
      <Droppable droppableId="3">
      {(provided, snapshot) => {
          const { innerRef, droppableProps } = provided;
          return (
            <ul ref={innerRef} {...droppableProps}>
              {lists.find(x=> x.id === 3).cards.map(({ id, bg }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => {
                    const { innerRef, draggableProps, dragHandleProps } = provided;
                    return (
                      <li ref={innerRef} {...draggableProps} {...dragHandleProps}>
                        <div className={`box ${bg}`}></div>
                      </li>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          );
        }}
      </Droppable>
      </div>
    </DragDropContext>
  );
}


export default App
