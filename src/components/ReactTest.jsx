import { useState } from "react";

const ReactTest = (props) => {

    const date = new Date()
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${month}월 ${day}일`;

    const [todolist, setTodolist] = useState(
        [
            {idx: 0, date: `${month}월 ${day-1}일`, text: "첫번째 할일"},
            {idx: 1, date: `${month}월 ${day}일`, text: "두번째 할일"}
        ]
    )

    // 리스트를 받아올 공간
    const [inputList, setInputList] = useState("");

    const [buttonState, setButtonState] = useState("all");
    const showList = buttonState == "all" ? todolist : todolist.filter((t)=> t.date === today);

    const inputChange = (e)=> {setInputList(e.target.value)}

    // 리스트 추가
    const addList =()=>{
        const newList = todolist.concat(
            {
                idx: todolist.length,
                date: `${month}월 ${day}일`,
                text : inputList
            }
        );
        setTodolist(newList);
        setInputList("");
    }

    // 리스트 삭제
    const delList =(idx)=>{
        const newList = todolist.filter((t)=>t.idx !== idx);
        setTodolist(newList);
    }


    // 리스트 전체 출력
    const allList =()=> {
        setButtonState("all");
    };


    // 오늘할일만 출력
    const todayList =(date)=>{
        const todayList = todolist.filter((t)=>t.date === today);
        // setTodolist(todayList);
        setButtonState("today");
    };

    ////////////////////////////////////////////////////////////////


    return(
        <div className="wrap">

            <h1>TODO LIST</h1>

            <input
                type="text"
                onChange={inputChange}
                value={inputList}
            />

            <button className="addBtn"
                onClick={addList}
            >
                <span>+</span>
            </button>

            <div className="listwrap">

                <button className="todoBtn"
                    onClick={allList}
                >모든할일</button>
                
                <button className="todoBtn"
                    onClick={todayList}
                >
                오늘할일
                </button>
                
                <ul className="todolist">
                    {
                    // todolist.map((todoPrint)=>
                    showList.map((todoPrint)=>
                        
                        <li
                            key={todoPrint.idx}
                            className={todoPrint.checked ? "checked" : ""}
                        >
                            <div className="todoDate">{todoPrint.date}</div>
                            
                            <br/>
                    
                            
                            <input
                                type="checkbox"
                                checked={todoPrint.checked}
                                readOnly
                                onClick={()=>{
                                    const newList = todolist.map((t)=>{
                                        if(todoPrint.idx !== t.idx) {
                                            return t;
                                        } else {
                                            return {...t, checked: !t.checked}
                                        }
                                    })
                                    setTodolist(newList);
                                }}
                            />
                            <span className="todoText">{todoPrint.text}</span>
                            
                            <button
                                className="delBtn"
                                onClick={()=>{delList(todoPrint.idx)}}
                            >
                                X
                            </button>

                        </li>
                    )
                    }
                </ul>

            </div>

        </div>
    )
}

export default ReactTest;