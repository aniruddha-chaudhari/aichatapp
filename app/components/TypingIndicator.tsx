import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

const TypingIndicator: React.FC = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <Text>
      {dots}
    </Text>
  )
}

export default TypingIndicator