import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardList } from '../../cmps/BoardList/BoardList'
import { useParams } from 'react-router-dom'
import { setActiveBoard, saveToStorage ,disableStorageReset} from '../../store/actions/boardActions'
import { createBoard } from '../../store/actions/boardActions';
import { ActionForm } from '../../cmps/ActionForm/ActionForm';

export function HomePage() {
    const state = useSelector(state => state.mainStore)
    const { id } = useParams();
    const currBoard = state.boards[id]
    const dispatch = useDispatch()
    const [isAddBoardVis, setAddBoardVis] = useState(false)
    const boardRef = useRef(null);


    const onCreateBoard = (data) => {
        const title = data.boardTitle
        if (!title) return
        dispatch(createBoard(title))
        onToggleAddBoard()
    }
    const onToggleAddBoard = () => {
        setAddBoardVis(!isAddBoardVis)
    }


    useEffect(() => { dispatch(saveToStorage(state)) }, [state, dispatch, currBoard])


    useEffect(() => {
        dispatch(setActiveBoard(''))
        dispatch(disableStorageReset())
    }, [dispatch])



    return (
        <div className="home-page margin-center">
            <div className="center-container margin-center">
                <div className="top-part flex align-center space-between">
                    <h1>CHOOSE YOUR BOARD</h1>
                    <div className="add-board-section flex">
                        {!isAddBoardVis &&
                            <button onClick={onToggleAddBoard} className="create-board">Create Board</button>
                        }
                        {isAddBoardVis &&
                            <div className="add-board">
                                <ActionForm currRef={boardRef} name="boardTitle" placeholder={'Add Board Title'} toggleAdd={onToggleAddBoard} onSubmitFunc={onCreateBoard} />
                            </div>
                        }
                    </div>
                </div>

                <div className="borad-list-container flex justify-center">
                    <section className="board-list-section">
                        <BoardList />
                    </section>
                </div>
            </div>
        </div>
    )
}

