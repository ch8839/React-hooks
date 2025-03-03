import style from "./index.module.scss"

export const ScrollBehavior = () => {
  return (
    <div className={style.container}>
      <nav>
        <a href="#page-1">1</a>
        <a href="#page-2">2</a>
        <a href="#page-3">3</a>
      </nav>
      <div style={{overflow: "auto",  height: "300px", }}>
        <div id="page-1" style={{height:"200px"}}>1</div>
        <div id="page-2" style={{height:"200px"}}>2</div>
        <div id="page-3" style={{height:"200px"}}>3</div>
      </div>
    </div>
  );
};
