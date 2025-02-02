import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { receiveMessageAction, updateRoomAction } from '../state/rooms/actions'
import { selectMoviePayload, selectRoomId } from '../state/rooms/selectors'

const useWebSocket = () => {
  const [ws, setWs] = useState(null)
  const dispatch = useDispatch()
  const moviePayload = useSelector(selectMoviePayload)
  const roomId = useSelector(selectRoomId)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')
    setWs(socket)

    socket.onopen = () => {
      console.log('Connected to WebSocket server')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const { roomSize, userName, movieId, roomId, liked } = data
      console.log(data)
      if (movieId) {
        dispatch(receiveMessageAction({ roomSize, userName, movieId, liked }))
      }
    }

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server')
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      socket.close()
    }
  }, [])

  const joinRoom = (roomId, userName) => {
    if (ws && roomId) {
      ws.send(JSON.stringify({ type: 'join', roomId, userName }))
      dispatch(updateRoomAction(roomId, userName))
    }
  }

  const sendMessage = ({ movieId, userName, liked }) => {
    if (ws && roomId && movieId) {
      ws.send(
        JSON.stringify({ type: 'message', roomId, movieId, userName, liked })
      )
    }
  }

  const leaveRoom = (userName) => {
    if (ws && roomId) {
      ws.send(JSON.stringify({ type: 'leave', roomId, userName }))
    }
  }

  useEffect(() => {
    if (moviePayload.movieId) {
      sendMessage(moviePayload)
    }
  }, [moviePayload.movieId])

  return { joinRoom, sendMessage, leaveRoom }
}

export default useWebSocket
