import React, {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
    useCallback,
} from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export type DropdownTrigger = "hover" | "click"
export type DropdownPlacement =
    | "top"
    | "topLeft"
    | "topRight"
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | "left"
    | "leftTop"
    | "leftBottom"
    | "right"
    | "rightTop"
    | "rightBottom"

export interface DropdownMenuItem {
    key: string | number
    label: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    className?: string
}

interface DropdownProps {
    /** 触发元素 */
    trigger: React.ReactNode
    /** 触发方式：hover 或 click */
    triggerType?: DropdownTrigger
    /** 弹框位置 */
    placement?: DropdownPlacement
    /** 偏移量（像素） */
    offset?: number
    /** 菜单项数组，如果提供则渲染为菜单，否则使用 children */
    menu?: DropdownMenuItem[]
    /** 自定义内容，当 menu 存在时会被忽略 */
    children?: React.ReactNode
    /** 是否打开（受控模式） */
    open?: boolean
    /** 打开状态变化回调 */
    onOpenChange?: (open: boolean) => void
    /** 容器类名 */
    className?: string
    /** 弹框内容类名 */
    contentClassName?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 用于计算位置的元素 ref，如果不提供则使用 trigger 元素 */
    positionRef?: React.RefObject<HTMLElement>
    /** 或者直接传入用于计算位置的元素 */
    positionElement?: HTMLElement | null
}

const DropdownContext = React.createContext<{
    close: () => void
}>({ close: () => {} })

/**
 * 根据 placement 计算 fixed 定位样式（不使用 transform，直接计算位置）
 */
const getFixedPositionStyle = (
    triggerRect: DOMRect,
    contentRect: DOMRect | null,
    placement: DropdownPlacement,
    offset: number
): React.CSSProperties => {
    const { top, left, right, bottom, width, height } = triggerRect
    const contentWidth = contentRect?.width || 0
    const contentHeight = contentRect?.height || 0

    switch (placement) {
        case "top":
            return {
                top: top - contentHeight - offset,
                left: left + width / 2 - contentWidth / 2,
            }
        case "topLeft":
            return {
                top: top - contentHeight - offset,
                left: left,
            }
        case "topRight":
            return {
                top: top - contentHeight - offset,
                left: right - contentWidth,
            }
        case "bottom":
            return {
                top: bottom + offset,
                left: left + width / 2 - contentWidth / 2,
            }
        case "bottomLeft":
            return {
                top: bottom + offset,
                left: left,
            }
        case "bottomRight":
            return {
                top: bottom + offset,
                left: right - contentWidth,
            }
        case "left":
            return {
                top: top + height / 2 - contentHeight / 2,
                left: left - contentWidth - offset,
            }
        case "leftTop":
            return {
                top: top,
                left: left - contentWidth - offset,
            }
        case "leftBottom":
            return {
                top: bottom - contentHeight,
                left: left - contentWidth - offset,
            }
        case "right":
            return {
                top: top + height / 2 - contentHeight / 2,
                left: right + offset,
            }
        case "rightTop":
            return {
                top: top,
                left: right + offset,
            }
        case "rightBottom":
            return {
                top: bottom - contentHeight,
                left: right + offset,
            }
        default:
            return {
                top: bottom + offset,
                left: left + width / 2 - contentWidth / 2,
            }
    }
}

/**
 * 获取动画初始状态（只返回动画相关的 transform，不包含定位 transform）
 */
const getAnimationInitial = (placement: DropdownPlacement) => {
    const direction = placement.startsWith("top")
        ? { y: 8 }
        : placement.startsWith("bottom")
          ? { y: -8 }
          : placement.startsWith("left")
            ? { x: 8 }
            : placement.startsWith("right")
              ? { x: -8 }
              : { y: -8 }

    return {
        opacity: 0,
        ...direction,
    }
}

export const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    triggerType = "click",
    placement = "bottom",
    offset = 8,
    menu,
    children,
    open: openProp,
    onOpenChange,
    className,
    contentClassName,
    disabled = false,
    positionRef,
    positionElement,
}) => {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState<React.CSSProperties>({})
    const triggerRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const isControlled = openProp !== undefined
    const isOpen = isControlled ? openProp : open

    const handleOpen = useCallback(() => {
        if (disabled) return
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = undefined
        }
        if (!isControlled) {
            setOpen(true)
        }
        onOpenChange?.(true)
    }, [disabled, isControlled, onOpenChange])

    const handleClose = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (!isControlled) {
            setOpen(false)
        }
        onOpenChange?.(false)
    }, [isControlled, onOpenChange])

    const handleCloseWithDelay = useCallback(() => {
        if (triggerType === "hover") {
            timeoutRef.current = setTimeout(() => {
                handleClose()
            }, 100)
        } else {
            handleClose()
        }
    }, [triggerType, handleClose])

    // 计算位置
    useLayoutEffect(() => {
        if (!isOpen) return

        // 确定用于计算位置的元素
        const getPositionElement = (): HTMLElement | null => {
            // 优先级：positionElement > positionRef > triggerRef
            if (positionElement) {
                return positionElement
            }
            if (positionRef?.current) {
                return positionRef.current
            }
            return triggerRef.current
        }

        const positionEl = getPositionElement()
        if (!positionEl) return

        // 需要等待内容渲染完成后再计算位置
        const calculatePosition = () => {
            const positionRect = positionEl.getBoundingClientRect()
            const contentRect = contentRef.current?.getBoundingClientRect()
            
            // 如果内容还没有渲染，使用默认值（会在下次渲染时重新计算）
            const newPosition = getFixedPositionStyle(
                positionRect,
                contentRect || null,
                placement,
                offset
            )
            setPosition(newPosition)
        }

        // 使用 requestAnimationFrame 确保 DOM 已更新
        requestAnimationFrame(() => {
            calculatePosition()
        })
    }, [isOpen, placement, offset, menu, children, positionRef, positionElement])

    // 点击外部关闭
    useEffect(() => {
        if (triggerType !== "click" || !isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (
                triggerRef.current &&
                !triggerRef.current.contains(target) &&
                !(event.target as Element)?.closest(".dropdown-content")
            ) {
                handleClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [triggerType, isOpen, handleClose])

    // 处理 hover 事件
    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => {
            if (triggerType === "hover") {
                handleOpen()
            }
            if (React.isValidElement(trigger)) {
                trigger.props.onMouseEnter?.(e)
            }
        },
        [triggerType, handleOpen, trigger]
    )

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent) => {
            if (triggerType === "hover") {
                handleCloseWithDelay()
            }
            if (React.isValidElement(trigger)) {
                trigger.props.onMouseLeave?.(e)
            }
        },
        [triggerType, handleCloseWithDelay, trigger]
    )

    // 处理点击事件
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (triggerType === "click") {
                e.stopPropagation()
                if (isOpen) {
                    handleClose()
                } else {
                    handleOpen()
                }
            }
            if (React.isValidElement(trigger)) {
                trigger.props.onClick?.(e)
            }
        },
        [triggerType, isOpen, handleOpen, handleClose, trigger]
    )

    // 弹框 hover 事件
    const handleContentMouseEnter = useCallback(() => {
        if (triggerType === "hover" && timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = undefined
        }
    }, [triggerType])

    const handleContentMouseLeave = useCallback(() => {
        if (triggerType === "hover") {
            handleCloseWithDelay()
        }
    }, [triggerType, handleCloseWithDelay])

    // 清理定时器
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    // 克隆 trigger 元素并添加事件
    const triggerElement = React.isValidElement(trigger)
        ? React.cloneElement(trigger, {
              ref: triggerRef,
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
              onClick: handleClick,
          } as React.HTMLAttributes<any>)
        : trigger

    // 渲染内容
    const renderContent = () => {
        if (menu && menu.length > 0) {
            return (
                <div className="min-w-[120px]">
                    {menu.map((item) => (
                        <DropdownItem
                            key={item.key}
                            disabled={item.disabled}
                            className={item.className}
                            onClick={item.onClick}
                        >
                            {item.label}
                        </DropdownItem>
                    ))}
                </div>
            )
        }
        return children
    }

    const animationInitial = getAnimationInitial(placement)

    const contentNode = isOpen ? (
        <AnimatePresence>
            <motion.div
                ref={contentRef}
                initial={animationInitial}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={animationInitial}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={twMerge(
                    clsx(
                        "dropdown-content fixed z-50",
                        "min-w-[120px] p-2",
                        "bg-[rgb(24,23,26)]/[0.9] backdrop-blur-[4px]",
                        "rounded-[8px] border-[0.5px] border-white/[0.1]",
                        "shadow-[0px_2px_8px_rgba(0,0,0,0.65)]",
                        contentClassName
                    )
                )}
                style={position}
                onMouseEnter={handleContentMouseEnter}
                onMouseLeave={handleContentMouseLeave}
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    ) : null

    return (
        <DropdownContext.Provider value={{ close: handleClose }}>
            <div className={twMerge(clsx("inline-block", className))}>
                {triggerElement}
            </div>
            {createPortal(contentNode, document.body)}
        </DropdownContext.Provider>
    )
}

/**
 * Dropdown 菜单项
 */
export const DropdownItem: React.FC<{
    children: React.ReactNode
    disabled?: boolean
    className?: string
    closeOnClick?: boolean
    onClick?: () => void
}> = ({ children, disabled, className, closeOnClick = true, onClick }) => {
    const { close } = React.useContext(DropdownContext)

    const handleClick = () => {
        if (disabled) return
        onClick?.()
        if (closeOnClick) {
            close()
        }
    }

    return (
        <div
            className={twMerge(
                clsx(
                    "text-white text-[14px] font-sans leading-[18px]",
                    "rounded-[4px] px-2 py-3",
                    "transition-colors duration-200",
                    disabled
                        ? "text-white/35 cursor-not-allowed"
                        : "cursor-pointer hover:bg-white/15",
                    className
                )
            )}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}

/**
 * Dropdown 分隔线
 */
export const DropdownSeparator: React.FC = () => {
    return <div className="h-[1px] bg-white/10 -mx-2 my-2" />
}
