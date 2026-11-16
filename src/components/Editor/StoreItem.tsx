import React, { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'

export const StoreItem = ({ name, storeSelector, register, setValue, storedData }: any) => {
  const stateValue = useAppSelector(storeSelector)
  const isRelation = name.endsWith('Id')
  const storedDataName = isRelation ? name.substr(0, name.length - 2) : name

  useEffect(() => {
    if (storedData && storedData[storedDataName]) {
      let storedId: string

      if (isRelation) storedId = storedData?.[storedDataName]?.id
      else storedId = storedData[storedDataName]

      setValue(name, storedId)
    } else setValue(name, stateValue)
  }, [storedData, stateValue])

  return (
    <React.Fragment>
      <input type="hidden" {...register(name)} />
    </React.Fragment>
  )
}

export default StoreItem
