import React, {useEffect, useMemo, useState} from 'react'
import classNames from 'classnames'
import { Props, TabPanelProps, TabValue, } from './types';

interface TabNavItemProps {
  label: React.ReactNode;
  isActive: boolean;
  onClick: ()=> void
}

export const TabNavItem: React.FC<TabNavItemProps> = (props)=> {
  const {label, isActive, onClick} = props
  return (
    <div className={classNames('tabs_nav-item', {'tabs_is-active': isActive})} onClick={()=> onClick()}>
      <div className={classNames('tabs_nav-item-wrapper')}>{label}</div>
    </div>
  )
}