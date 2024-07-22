import React, { useState, useEffect, useMemo, useCallback } from 'react'

const Exp5 = () => {
  const [animal, setAnimal] = useState('')
  const [foot, setFoot] = useState('')

  const isDog = useMemo(() => {
    console.log('>>>isDog', animal) //1 //5
    return animal == 'dog'
  }, [animal])

  useEffect(() => {
    console.log('>>>set Start') //2
    setAnimal('dog')
    console.log('>>>set End') //3
    getFavFoot()
  }, [])

  // useEffect(() => {
  //   console.log('>>>set Start') //2
  //   setAnimal((val) => {
  //     let newVal = 'dog'
  //     getFavFoot()
  //     return newVal
  //   })
  //   console.log('>>>set End') //3
  //   getFavFoot()
  // }, [])

  const getFavFoot = useCallback(() => {
    console.log('>>>animal2', animal, isDog)  //4
    setTimeout(() => {
      console.log('>>>animal4', animal, isDog) //6
      if(isDog) {
        const foot = 'bone'
        setFoot(foot)
      }else {
        const foot = 'default'
        setFoot(foot)
      }
    }, 1000)
  }, [animal, isDog])
  return (
    <div>
     {foot}
     
    </div>
  )
}



export default Exp5
