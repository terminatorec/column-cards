import React, { useEffect, useRef, useState } from "react";
import AddNew from "./AddNew";
import closeSvgIcon from ".././img/close.svg";

const ColumnCards = () => {
  const [boards, setBoards] = useState(
    localStorage.getItem(`boards`) == null
    ? 
        [{
        id: 1,
        title: "What to do",
        items: [],
        },
        {
        id: 2,
        title: "Doing",
        items: [],
        },
        {
        id: 3,
        title: "Done",
        items: [],
        },]
    : 
        JSON.parse(localStorage.getItem(`boards`))
    
    );

    const inputArea = useRef()
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className == "item") {
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }

  const [indexTask, setIndexTask] = useState(0);
  const [textTask, setTextTask] = useState("");
  const [checker, setChecker] = useState(0);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const addNewTask = async () => {
    if(inputArea.current.value){
        // setText(task.title);
        setIndexTask(indexTask + 1);
        const boardsMassiv = boards[0].items;

        boardsMassiv.push({ id: random(0, 10000000), title: textTask });
        setChecker(checker + 1);
        setTextTask("");

        setHowMuchAll(
            boards[0].items.length + 
            boards[1].items.length +
            boards[2].items.length
        )
        setHowMuchComppleted(
            boards[2].items.length
        )
        setHowMuchDoing(
            boards[1].items.length
        )
        setHowMuchDo(
            boards[0].items.length
        )
    }
    else{
        inputArea.current.style.background = 'rgb(254, 45, 0)'
        await timeout(500);
        inputArea.current.style.background = 'rgb(255, 2555, 255)'
        console.log('ошибка')
    }
    
  };


  const deleteTask = (itemId, boardId) => {
    setIndexTask(indexTask - 1);

    let pos = boards
      .map(function (e) {
        return e.id;
      })
      .indexOf(boardId);

    let posItem = boards[pos].items
      .map(function (e) {
        return e.id;
      })
      .indexOf(itemId);

    setBoards((boards) => [
      ...boards.slice(0, pos),
      (boards[pos] = {
        id: boards[pos].id,
        title: boards[pos].title,
        items: boards[pos].items.filter((p) => p.id !== itemId),
      }),
      ,
      ...boards.slice(pos + 1),
    ]);
    setBoards(boards);


 
  };

  function dropCardHandler(e, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

 

  const [howMuchAll, setHowMuchAll] = useState(0)
  const [howMuchComppleted, setHowMuchComppleted] = useState(0)
  const [howMuchDoing, setHowMuchDoing] = useState(0)
  const [howMuchDo, setHowMuchDo] = useState(0)

  const filterGG = () =>{
      let del = howMuchComppleted/howMuchAll * 100
      console.log(del)
  }

  console.log("Сколько всего: "+howMuchAll+" Сколько выполнено: "+howMuchComppleted)


const onKeyDown = (e) => {
    if (e.keyCode == 13) {
        addNewTask();
    }
  };
  useEffect(() => {
    console.log("изменение");
  }, [checker]);


  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards))
    setHowMuchAll(
        boards[0].items.length + 
        boards[1].items.length +
        boards[2].items.length
    );
    setHowMuchComppleted(
        boards[2].items.length
    );
    setHowMuchDoing(
        boards[1].items.length
    )
    setHowMuchDo(
        boards[0].items.length
    )
    
    console.log("сохранение");
  }, [boards,indexTask]);

  return (
    <div>
      {/* <AddNew/> */}
      <div className="addNewWrap">
        <input
            ref={inputArea}
            onKeyDown={onKeyDown}
          value={textTask}
          onChange={(event) => setTextTask(event.target.value)}
          type="text"
          placeholder="input task"
        />
        <button
          onClick={addNewTask}
        >
          Add
        </button>
      </div>
      <div className="howMuchLeft">
          <div className="filterLeftWrap">
              <div className="filterLeft"
              style={{
                  width: `${(Math.floor(howMuchComppleted/howMuchAll * 100000))/1000}%`,
                  height: '100%'
              }}
              ></div>
              <div className="filterLeftOrange"
              style={{
                width: `${(Math.floor((howMuchComppleted+howMuchDoing)/howMuchAll * 100000))/1000}%`,
                  height: '100%'
              }}
              ></div>
          </div>
      </div>
      <div className="app">
        {boards.map((board) => (
          <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className="board"
          >
            <div className="board__title">{board.title}</div>
            {board.items.map((item) => (
              <div
                draggable="true"
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                // onDrop={(e) => dropHandler(e, board, item)}
                className="item"
              >
                <div>
                  {/* {item.id}  */}
                  {item.title}
                </div>
                <img
                  onClick={() => deleteTask(item.id, board.id)}
                  src={closeSvgIcon}
                  alt=""
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnCards;
