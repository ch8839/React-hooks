import { useEffect, useState, useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.less";

export const ReactTransitionGroup1 = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>toggle</button>
      <button onClick={() => setDialogOpen((prev) => !prev)}>openDialog</button>

      <CSSTransition
        in={open}
        classNames="myfade"
        timeout={300}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
      >
        <div ref={nodeRef} className="content">
          content
        </div>
      </CSSTransition>

      <CSSTransition
        in={dialogOpen}
        appear
        timeout={300}
        nodeRef={dialogRef}
        mountOnEnter
        unmountOnExit
      >
        <div ref={dialogRef} className="dialog">
          <CSSTransition
            in={dialogOpen}
            appear
            classNames="mask"
            timeout={300}
            nodeRef={maskRef}
            mountOnEnter
            unmountOnExit
          >
            <div className="dialog-mask" ref={maskRef}></div>
          </CSSTransition>

          <div className="dialog-content">
            {/* 
            这里得用appear，否则不会有动画效果，因为当dialogOpen置为true时，dialogRef先挂载，再开始挂载contentRef        
            此时contentRef的in已经为true了,所以需要用appear,在首次挂载时也执行过渡
            */}
            <CSSTransition
              in={dialogOpen}
              appear
              classNames="myfade"
              timeout={300}
              nodeRef={contentRef}
              mountOnEnter
              unmountOnExit
            >
              <div className="dialog-card" ref={contentRef}>
                <div>content</div>
                <button onClick={() => setDialogOpen(false)}>close</button>
              </div>
            </CSSTransition>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
