import React, {useEffect, useMemo, useState} from 'react'
import classNames from 'classNames'

import { Tabs } from "../Tabs"
import { TabPanel } from "../TabPanel"

export const Base = (props: any)=> {
  return (
    <div>
      <Tabs defaultValue={1}>
        <TabPanel label="选项卡1" value={1}>hhhhhtab1</TabPanel>
        <TabPanel label="选项卡66666" value={2}>hhhhhtab2</TabPanel>
      </Tabs>
    </div>
  )
}